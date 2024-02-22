import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { propertyTypes } from "../propTypes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { provinceURL } from "../../../apiConfig";
import { AuthContext } from "../../../context/auth.context";
import { RealEstateContext } from "../../../context/real-estate.context";
import { useParams } from "react-router-dom";

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

const inputSmall = {
  width: "199px",
};

const selectStyle = {
  borderRadius: "20px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  display: "flex",
};

const pdftyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UpdateProperty = () => {
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState({
    propID: "",
    ownerID: user._id,
    street: "",
    district: "",
    ward: "",
    city: "",
    image: [],
    type: "",
    size: "",
    bedRoom: 0,
    bathRoom: 0,
    description: "",
    pdf: [],
  });

  const [image, setImage] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [letterCount, setLetterCount] = useState(0);
  const [openImage, setOpenImageList] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);

  const [pdfName, setPdfName] = useState([]);

  const { uploadImages, uploadPDFs, createNewRealEstate, getRealEstateByID } =
    useContext(RealEstateContext);

  const { id } = useParams();

  //   useEffect(() => {
  //     const fetchData = async () => {

  //     };

  //     fetchData();
  //   }, [id]);

  console.log(pdfName);

  const [location, setLocation] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  //   useEffect(() => {

  //       .catch((err) => console.error("Error fetching data: ", err));
  //   }, []);

  const handleSelectLocation = async (fieldName, selectedValue) => {
    setProperty((prevProp) => ({
      ...prevProp,
      [fieldName]: selectedValue,
    }));

    if (fieldName === "city") {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRealEstateByID(id);
        console.log(res);
        setProperty(res);

        const getProvince = `${provinceURL}/api/province`;
        const response = await fetch(getProvince);

        const data = await response.json();
        const provincesData = data.results.map((result) => ({
          province_id: result.province_id,
          province_name: result.province_name,
        }));

        setLocation((prevLocation) => ({
          ...prevLocation,
          provinces: provincesData,
        }));

        console.log(property.city);

        const selectedProvince = provincesData.find(
          (province) => province.province_name === res.city
        );

        // Fetch districts based on the selected province_id
        const getDistricts = `${provinceURL}/api/province/district/${selectedProvince.province_id}`;
        let districtName = [];

        const responseDistrict = await fetch(getDistricts);
        const dataDistrict = await responseDistrict.json();

        if (dataDistrict.results) {
          districtName = dataDistrict.results.map((result) => ({
            district_id: result.district_id,
            district_name: result.district_name,
          }));
          console.log("Fetched districts:", districtName);
          setLocation((prevLocation) => ({
            ...prevLocation,
            districts: districtName,
          }));
        }

        console.log(districtName);

        if (districtName.length > 0) {
          const selectedDistrict = districtName.find(
            (district) => district.district_name === res.district
          );

          // Fetch wards based on the selected district_id
          const getWards = `${provinceURL}/api/province/ward/${selectedDistrict.district_id}`;
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
        }
      } catch (err) {
        console.error("Error fetching wards: ", err);
      }
    };

    fetchData();
  }, []);

  console.log(location);

  const handleOpenImg = () => {
    setOpenImageList(true);
  };

  const handleCloseImg = () => {
    setOpenImageList(false);
  };

  const handleOpenDoc = () => {
    setOpenDocument(true);
  };

  const handleCloseDoc = () => {
    setOpenDocument(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "size") {
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
    const files = event.target.files;

    setProperty((prevProp) => ({
      ...prevProp,
      image: files,
    }));

    if (files && files.length > 0) {
      // Map the new files to their respective data URLs
      const newImages = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      setImage((prev) => [...image, ...newImages]);
    }
  };

  const handleDeleteImg = (index) => {
    if (property.image.length > 0) {
      setProperty((prev) => {
        const updatedList = [...prev.image];
        updatedList.splice(index, 1);
        return { ...prev, image: updatedList };
      });
    } else {
      setImage((prev) => {
        const updatedList = [...prev];
        updatedList.splice(index, 1);
        return updatedList;
      });
    }
  };

  const handleDocumentChange = (event) => {
    const files = event.target.files;

    setProperty((prevProp) => ({
      ...prevProp,
      pdf: files,
    }));

    if (files && files.length > 0) {
      // Map the files to their respective data URLs
      const documentArray = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      setPdf((prev) => [...prev, ...documentArray]);
    }
  };

  const handleDeleteDocument = (index) => {
    setPdf((prev) => {
      const updatedDocs = [...prev];
      updatedDocs.splice(index, 1);
      return updatedDocs;
    });
  };

  const handleSelectChange = (event) => {
    setProperty((prevProp) => ({
      ...prevProp,
      type: event.target.value,
    }));
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

  const uploadImagesFile = async () => {
    try {
      console.log("abcd");
      const formData = new FormData();
      for (const single_file of property.image) {
        formData.append("image", single_file);
      }

      const res = await uploadImages(formData);
      console.log("img", res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPDFsFile = async () => {
    try {
      const formData = new FormData();
      for (const single_file of property.pdf) {
        formData.append("pdf", single_file);
      }

      const res = await uploadPDFs(formData);
      console.log("pdf", res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateProperty = async () => {
    try {
      let imgUrl = "";
      let pdfUrl = "";
      if (property.image) imgUrl = await uploadImagesFile();

      if (property.pdf) pdfUrl = await uploadPDFsFile();

      await createNewRealEstate({ property, image: imgUrl, pdf: pdfUrl });
    } catch (error) {
      console.log(error);
    }
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
            Update Property
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
          <Grid
            container
            flexDirection="column"
            sx={{ mt: "15px" }}
            spacing={4}
          >
            <Grid item>
              <TextField
                id=""
                name="street"
                label="Street Address *"
                onChange={handleInputChange}
                value={property.street}
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
                    value={property.city}
                    label="Province"
                    onChange={(event) =>
                      handleSelectLocation("city", event.target.value)
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
                    value={property.district}
                    label="Province"
                    onChange={(event) =>
                      handleSelectLocation("district", event.target.value)
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
                    value={property.ward}
                    label="Province"
                    onChange={(event) =>
                      handleSelectLocation("ward", event.target.value)
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
                id=""
                label="Property Image"
                name="image"
                onChange={handleInputChange}
                value={
                  image.length > 0 || property.image.length > 0
                    ? "Image list"
                    : ""
                }
                sx={{ width: "630px" }}
                InputProps={{
                  readOnly: true,
                  style: inputStyle,
                  endAdornment: (
                    <InputAdornment>
                      {property.image.length > 0 ? (
                        <Chip
                          label={`View files (${property.image.length})`}
                          sx={{ "& .MuiChip-label": {}, marginRight: "20px" }}
                          onClick={() => handleOpenImg()}
                        />
                      ) : image.length > 0 ? (
                        <Chip
                          label={`View files (${image.length})`}
                          sx={{ "& .MuiChip-label": {}, marginRight: "20px" }}
                          onClick={() => handleOpenImg()}
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
                          disabled={image.length > 4}
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
                name="image"
                multiple
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
                    value={property.type}
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
                  name="size"
                  value={property.size}
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
                  value={property.bedRoom}
                  sx={inputWidth}
                  InputProps={{
                    style: {
                      ...inputStyle,
                    },
                    startAdornment: (
                      <InputAdornment>
                        <IconButton onClick={() => handleDecrement("bedRoom")}>
                          <RemoveIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={() => handleIncrement("bedRoom")}>
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
                  value={property.bathRoom}
                  sx={inputWidth}
                  InputProps={{
                    style: {
                      ...inputStyle,
                    },
                    startAdornment: (
                      <InputAdornment>
                        <IconButton onClick={() => handleDecrement("bathRoom")}>
                          <RemoveIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={() => handleIncrement("bathRoom")}>
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
                label="pdf"
                onChange={handleInputChange}
                value={pdf.length > 0 ? "Document list" : ""}
                sx={{ width: "630px" }}
                InputProps={{
                  readOnly: true,
                  style: inputStyle,
                  endAdornment: (
                    <InputAdornment>
                      {property.pdf.length > 0 ? (
                        <Chip
                          label={`View files (${property.pdf.length})`}
                          sx={{ "& .MuiChip-label": {}, marginRight: "20px" }}
                          onClick={() => handleOpenDoc()}
                        />
                      ) : pdf.length > 0 ? (
                        <Chip
                          label={`View files (${pdf.length})`}
                          sx={{ "& .MuiChip-label": {}, marginRight: "20px" }}
                          onClick={() => handleOpenDoc()}
                        />
                      ) : (
                        ""
                      )}
                      <label htmlFor="fileInputpdf">
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
                          Add pdf (.pdf)
                        </Button>
                      </label>
                    </InputAdornment>
                  ),
                }}
              />
              <input
                type="file"
                name="pdf"
                multiple
                accept=".pdf"
                style={{ display: "none" }}
                id="fileInputpdf"
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
            onClick={() => handleCreateProperty()}
          >
            Save
          </Button>
        </div>
      </Card>
      <div className="image-modal">
        <Modal
          open={openImage}
          onClose={handleCloseImg}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
              }}
            >
              {property.image.length > 0
                ? property.image.map((image, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img
                        src={image}
                        alt="img"
                        style={{
                          width: "300px",
                          height: "300px", // Maintain the aspect ratio
                        }}
                      />
                      <Button
                        onClick={() => handleDeleteImg(index)}
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          color: "black",
                          background: "white",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))
                : image.map((image, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img
                        src={image.url}
                        alt={image.name}
                        style={{
                          width: "300px",
                          height: "300px", // Maintain the aspect ratio
                        }}
                      />
                      <Button
                        onClick={() => handleDeleteImg(index)}
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          color: "black",
                          background: "white",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
            </div>
          </Box>
        </Modal>
      </div>
      <div className="document-modal">
        <Modal
          open={openDocument}
          onClose={handleCloseDoc}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={pdftyle}>
            {property.pdf.length > 0
              ? property.pdf.map((document, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      href={document}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "red" }}
                    >
                      abcd
                    </a>
                    <button onClick={() => handleDeleteDocument(index)}>
                      delete
                    </button>
                  </div>
                ))
              : pdf.map((document, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "red" }}
                    >
                      {document.name}
                    </a>
                    <button onClick={() => handleDeleteDocument(index)}>
                      delete
                    </button>
                  </div>
                ))}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default UpdateProperty;
