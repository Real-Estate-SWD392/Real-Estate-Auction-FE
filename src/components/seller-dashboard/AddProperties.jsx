import {
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { propertyTypes } from "./propTypes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const REQUIRED_COUNT = 180;

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

const AddProperties = () => {
  const [property, setProperty] = useState({
    propID: "",
    sellerName: "",
    streetAddress: "",
    district: "",
    city: "",
    propImage: [],
    propType: "",
    propSize: "",
    beds: 0,
    baths: 0,
    description: "",
    documents: [],
  });

  const [letterCount, setLetterCount] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "propSize") {
      if (/[^0-9]/.test(value)) {
        return;
      }
    }

    if (name === "description") {
      const updatedLetterCount = value.length;
      setLetterCount(updatedLetterCount);
    }

    setProperty((prevProp) => ({
      ...prevProp,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProperty((prevProp) => ({
        ...prevProp,
        propImage: file,
      }));
    }
  };

  const handleSelectChange = (event) => {
    setProperty((prevProp) => ({
      ...prevProp,
      propType: event.target.value,
    }));
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProperty({ ...property, documents: file.name });
    }
  };

  const handleIncrement = (name) => {
    setProperty((prevProp) => ({
      ...prevProp,
      [name]: prevProp[name] + 1,
    }));
  };

  const handleDecrement = (name) => {
    setProperty((prevProp) => ({
      ...prevProp,
      [name]: prevProp[name] - 1,
    }));
  };

  return (
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
          Add Property
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
          Property Details
        </Typography>
        <Divider sx={{ mt: "10px", background: "#F0F0F0", height: "3px" }} />
        <Grid container flexDirection="column" sx={{ mt: "15px" }} spacing={4}>
          <Grid container item spacing={4}>
            <Grid item>
              <TextField
                id=""
                name="propID"
                label="Property ID"
                onChange={handleInputChange}
                value={property.propID}
                sx={inputWidth}
                InputProps={{
                  style: inputStyle,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="Seller"
                name="sellerName"
                onChange={handleInputChange}
                value={property.sellerName}
                sx={inputWidth}
                InputProps={{
                  style: inputStyle,
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Street Address"
              name="streetAddress"
              onChange={handleInputChange}
              value={property.streetAddress}
              sx={{ width: "630px" }}
              InputProps={{
                style: inputStyle,
              }}
            />
          </Grid>
          <Grid container item spacing={4}>
            <Grid item>
              <TextField
                id=""
                label="District"
                name="district"
                onChange={handleInputChange}
                value={property.district}
                sx={inputWidth}
                InputProps={{
                  style: inputStyle,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="City"
                name="city"
                onChange={handleInputChange}
                value={property.city}
                sx={inputWidth}
                InputProps={{
                  style: inputStyle,
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Property Image"
              name="propImage"
              onChange={handleInputChange}
              value={property.propImage}
              sx={{ width: "630px" }}
              InputProps={{
                readOnly: true,
                style: inputStyle,
                endAdornment: (
                  <InputAdornment>
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
        <Typography
          variant="body1"
          color="initial"
          fontSize={20}
          fontWeight={600}
          sx={{ mt: "45px" }}
        >
          Property Features
        </Typography>
        <Divider sx={{ mt: "10px", background: "#F0F0F0", height: "3px" }} />
        <Grid container sx={{ mt: "15px" }} spacing={4}>
          <Grid container item spacing={4}>
            <Grid item>
              <FormControl sx={inputWidth}>
                <InputLabel id="demo-simple-select-label">
                  Property Type
                </InputLabel>
                <Select
                  sx={inputStyle}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={property.propType}
                  label="Property Type"
                  onChange={handleSelectChange}
                >
                  {propertyTypes.map((type) => (
                    <MenuItem value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="Property Size (m2)"
                name="propSize"
                value={property.propSize}
                sx={inputWidth}
                InputProps={{
                  style: inputStyle,
                }}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={4}>
            <Grid item>
              <TextField
                id=""
                label="Bedrooms"
                value={property.beds}
                sx={inputWidth}
                InputProps={{
                  style: {
                    ...inputStyle,
                  },
                  startAdornment: (
                    <InputAdornment>
                      <IconButton onClick={() => handleDecrement("beds")}>
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={() => handleIncrement("beds")}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  style: {
                    textAlign: "center",
                  },
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="Bathrooms"
                value={property.baths}
                sx={inputWidth}
                InputProps={{
                  style: {
                    ...inputStyle,
                  },
                  startAdornment: (
                    <InputAdornment>
                      <IconButton onClick={() => handleDecrement("baths")}>
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={() => handleIncrement("baths")}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  style: {
                    textAlign: "center",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Description"
              name="description"
              value={property.description}
              onChange={handleInputChange}
              sx={{ width: "630px" }}
              InputProps={{
                style: inputStyle,
                endAdornment: (
                  <InputAdornment>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={12}
                      sx={{ mr: "10px" }}
                    >
                      {letterCount}/{REQUIRED_COUNT}
                    </Typography>
                  </InputAdornment>
                ),
              }}
              multiline
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Documents"
              onChange={handleInputChange}
              value={property.documents}
              sx={{ width: "630px" }}
              InputProps={{
                readOnly: true,
                style: inputStyle,
                endAdornment: (
                  <InputAdornment>
                    <label htmlFor="fileInputDocuments">
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
                        Add Documents (.pdf)
                      </Button>
                    </label>
                  </InputAdornment>
                ),
              }}
            />
            <input
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              id="fileInputDocuments"
              onChange={handleDocumentChange}
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
            p: "12px 295px",
            mt: "50px",
            fontSize: "16px",
          }}
        >
          Save
        </Button>
      </div>
    </Card>
  );
};

export default AddProperties;
