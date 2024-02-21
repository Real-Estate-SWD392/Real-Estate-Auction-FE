import {
  Card,
  Divider,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  InputLabel,
  IconButton,
  Modal,
  Box,
  Chip,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
  Menu,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { provinceURL } from "../../apiConfig";
import { VisibilityOff } from "@mui/icons-material";

const CustomDivider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const inputStyle = {
  borderRadius: "20px",
};

const inputWidth = {
  width: "300px",
};

const inputSmall = {
  width: "199px",
};

const lableStyle = {
  width: "100px",
};

const selectStyle = {
  borderRadius: "20px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const MyProfile = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  streetAddress,
  idNumbe,
  newPassword,
}) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "phucanhdodang1211@gmail.com",
    streetAddress: "",
    province: "",
    district: "",
    ward: "",
    image: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const getProvince = `${provinceURL}/api/province`;
    fetch(getProvince)
      .then((response) => response.json())
      .then((data) => {
        const provincesData = data.results.map((result) => ({
          province_id: result.province_id,
          province_name: result.province_name,
        }));

        setLocation((prevLocation) => ({
          ...prevLocation,
          provinces: provincesData,
        }));
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  console.log(location.provinces);

  const handleSelectChange = async (fieldName, selectedValue) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [fieldName]: selectedValue,
    }));

    if (fieldName === "province") {
      const selectedProvince = location.provinces.find(
        (province) => province.province_name === selectedValue
      );
      // Fetch districts based on the selected province_id
      const getDistricts = `${provinceURL}/api/province/district/${selectedProvince.province_id}`;
      try {
        const response = await fetch(getDistricts);
        const data = await response.json();

        if (data.results) {
          const districtNames = data.results.map((result) => ({
            district_id: result.district_id,
            district_name: result.district_name,
          }));

          setLocation((prevLocation) => ({
            ...prevLocation,
            districts: districtNames,
          }));
        }
      } catch (err) {
        console.error("Error fetching districts: ", err);
      }
    } else if (fieldName === "district") {
      const selectedDistrict = location.districts.find(
        (district) => district.district_name === selectedValue
      );
      // Fetch wards based on the selected district_id
      const getWards = `${provinceURL}/api/province/ward/${selectedDistrict.district_id}`;
      try {
        const response = await fetch(getWards);
        const data = await response.json();

        if (data.results) {
          const wardNames = data.results.map((result) => ({
            ward_id: result.ward_id,
            ward_name: result.ward_name,
          }));

          setLocation((prevLocation) => ({
            ...prevLocation,
            wards: wardNames,
          }));
        }
      } catch (err) {
        console.error("Error fetching wards: ", err);
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirm = () => {
    setShowPassword(!showConfirm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "phoneNumber") {
      if (/[^0-9]/.test(value)) {
        // If alphabet characters are found, don't update the state
        return;
      }
      if (value.length > 10) {
        return;
      }
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: file,
      }));
    }
    console.log(profile.idNumber);
  };

  const handleSaveProfile = () => {
    console.log(profile);
  };

  return (
    <>
      <Card
        sx={{
          width: "1100px",
          pb: "100px",
          mb: "50px",
          paddingX: "35px",
          pt: "30px",
        }}
      >
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: "30px",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            fontSize={25}
            fontWeight={600}
            sx={{ mr: "40px" }}
          >
            My Profile
          </Typography>
        </div>
        <CustomDivider />
        <div
          className="contact-inf"
          style={{ marginTop: "45px", padding: "0px 40px" }}
        >
          <Typography
            variant="body1"
            color="initial"
            fontSize={20}
            fontWeight={600}
          >
            Contact Information
          </Typography>
          <Divider sx={{ mt: "10px", background: "#F0F0F0", height: "3px" }} />
          <Grid
            container
            flexDirection="column"
            sx={{ mt: "15px" }}
            spacing={4}
          >
            <Grid container item spacing={4}>
              <Grid item>
                <TextField
                  id=""
                  name="firstName"
                  label="First Name *"
                  onChange={handleInputChange}
                  value={profile.firstName}
                  sx={inputWidth}
                  InputProps={{
                    style: inputStyle,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id=""
                  label="Last Name *"
                  name="lastName"
                  onChange={handleInputChange}
                  value={profile.lastName}
                  sx={inputWidth}
                  InputProps={{
                    style: inputStyle,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={4}>
              <Grid item>
                <TextField
                  id=""
                  name="phoneNumber"
                  label="Phone Number *"
                  onChange={handleInputChange}
                  sx={inputWidth}
                  value={profile.phoneNumber}
                  InputProps={{
                    style: inputStyle,
                    inputProps: {
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  id=""
                  name="email"
                  label="Email"
                  sx={inputWidth}
                  onChange={handleInputChange}
                  value={profile.email}
                  InputProps={{
                    style: inputStyle,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id=""
                name="streetAddress"
                label="Street Address *"
                onChange={handleInputChange}
                value={profile.streetAddress}
                sx={{ width: "630px" }}
                InputProps={{
                  style: inputStyle,
                }}
              />
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <FormControl sx={inputSmall}>
                  <InputLabel id="demo-simple-select-label">
                    Province
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profile.province}
                    label="Province"
                    onChange={(event) =>
                      handleSelectChange("province", event.target.value)
                    }
                    sx={selectStyle}
                  >
                    {location.provinces.map((province) => (
                      <MenuItem
                        key={province.province_id}
                        value={province.province_name}
                      >
                        {province.province_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={inputSmall}>
                  <InputLabel id="demo-simple-select-label">
                    District
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profile.district}
                    label="Province"
                    onChange={(event) =>
                      handleSelectChange("district", event.target.value)
                    }
                    sx={selectStyle}
                  >
                    {location.districts.map((district) => (
                      <MenuItem
                        key={district.district_id}
                        value={district.district_name}
                      >
                        {district.district_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={inputSmall}>
                  <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profile.ward}
                    label="Province"
                    onChange={(event) =>
                      handleSelectChange("ward", event.target.value)
                    }
                    sx={selectStyle}
                  >
                    {location.wards.map((ward) => (
                      <MenuItem key={ward.ward_id} value={ward.ward_name}>
                        {ward.ward_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id="idNumber"
                label="ID Image *"
                name="profileImg"
                value={profile.image ? "An image of ID Number" : ""}
                onChange={handleInputChange}
                sx={{ width: "630px" }}
                InputProps={{
                  readOnly: true,
                  style: inputStyle,
                  endAdornment: (
                    <InputAdornment>
                      {profile.image ? (
                        <Chip
                          label="View Image"
                          onClick={() => handleOpen()}
                          sx={{
                            "& .MuiChip-label": {},
                            marginRight: "20px",
                          }}
                        />
                      ) : (
                        ""
                      )}
                      <label htmlFor="fileInput">
                        <Button
                          variant="contained"
                          component="span"
                          sx={{
                            borderRadius: "0 20px 20px 0",
                            background: "#000000",
                            textTransform: "none",
                            px: "30px",
                            py: "16px",
                            fontSize: "13px",
                            fontWeight: 600,
                            "&:hover": {
                              background: "#000000",
                            },
                            mr: "-13px",
                          }}
                        >
                          Add Image (.png, .jpg)
                        </Button>
                      </label>
                    </InputAdornment>
                  ),
                }}
              />
              <input
                type="file"
                accept=".png, .jpg"
                style={{ display: "none" }}
                id="fileInput"
                onChange={handleImageChange}
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              background: "#118BF4",
              color: "white",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                background: "#118BF4",
              },
              fontWeight: "600",
              p: "12px 40px",
              mt: "30px",
              fontSize: "16px",
            }}
            onClick={() => handleSaveProfile()}
          >
            Save
          </Button>
          <Typography
            variant="body1"
            color="initial"
            fontSize={20}
            fontWeight={600}
            sx={{ mt: "45px" }}
          >
            Set Password
          </Typography>
          <Divider sx={{ mt: "10px", background: "#F0F0F0", height: "3px" }} />
          <Grid container sx={{ mt: "15px" }} spacing={4}>
            <Grid item>
              <TextField
                id=""
                label="New Password"
                value={profile.newPassword}
                name="newPassword"
                type={showPassword ? "text" : "password"}
                sx={inputWidth}
                InputProps={{
                  style: inputStyle,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="Confirm Password"
                value={profile.confirmPassword}
                sx={inputWidth}
                InputProps={{
                  style: inputStyle,
                }}
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              background: "#118BF4",
              color: "white",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                background: "#118BF4",
              },
              fontWeight: "600",
              p: "12px 40px",
              mt: "30px",
              fontSize: "16px",
            }}
          >
            Save
          </Button>
        </div>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {profile.image && profile.image.type.startsWith("image/") && (
            <div>
              <img
                src={URL.createObjectURL(profile.image)}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MyProfile;
