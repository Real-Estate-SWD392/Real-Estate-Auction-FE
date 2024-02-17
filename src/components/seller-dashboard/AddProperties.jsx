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
import React, { useEffect, useState } from "react";
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

const inputSmall = {
  width: "199px",
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

const documentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddProperties = () => {
  const [property, setProperty] = useState({
    propID: "",
    sellerName: "",
    streetAddress: "",
    district: "",
    city: "",
    province: "",
    propImage: [],
    propType: "",
    propSize: "",
    beds: 0,
    baths: 0,
    description: "",
    documents: [],
  });

  const [letterCount, setLetterCount] = useState(0);
  const [openImage, setOpenImageList] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);

  useEffect(() => {
    console.log(property.propImage);
  }, [property.propImage]);

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
    const files = event.target.files;
    if (files && files.length > 0) {
      // Map the new files to their respective data URLs
      const newImages = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      setProperty((prevProp) => ({
        ...prevProp,
        propImage: [...prevProp.propImage, ...newImages],
      }));
    }
  };

  const handleDeleteImg = (index) => {
    setProperty((prevProp) => {
      const updatedList = [...prevProp.propImage];
      updatedList.splice(index, 1);
      return { ...prevProp, propImage: updatedList };
    });
  };

  const handleDocumentChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Map the files to their respective data URLs
      const documentArray = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      setProperty((prevProp) => ({
        ...prevProp,
        documents: [...prevProp.documents, ...documentArray],
      }));
    }
  };

  const handleDeleteDocument = (index) => {
    setProperty((prevProp) => {
      const updatedDocs = [...prevProp.documents];
      updatedDocs.splice(index, 1);
      return { ...prevProp, documents: updatedDocs };
    });
  };

  const handleSelectChange = (event) => {
    setProperty((prevProp) => ({
      ...prevProp,
      propType: event.target.value,
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
            <Grid container item spacing={2}>
              <Grid item>
                <TextField
                  id=""
                  label="City"
                  name="city"
                  onChange={handleInputChange}
                  value={property.city}
                  sx={inputSmall}
                  InputProps={{
                    style: inputStyle,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id=""
                  label="District"
                  name="district"
                  onChange={handleInputChange}
                  value={property.district}
                  sx={inputSmall}
                  InputProps={{
                    style: inputStyle,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id=""
                  label="Province"
                  name="province"
                  onChange={handleInputChange}
                  value={property.province}
                  sx={inputSmall}
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
                value={property.propImage.length > 0 ? "Image list" : ""}
                sx={{ width: "630px" }}
                InputProps={{
                  readOnly: true,
                  style: inputStyle,
                  endAdornment: (
                    <InputAdornment>
                      {property.propImage.length > 0 ? (
                        <Chip
                          label={`View files (${property.propImage.length})`}
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
                          disabled={property.propImage.length > 4}
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
                value={property.documents.length > 0 ? "Document list" : ""}
                sx={{ width: "630px" }}
                InputProps={{
                  readOnly: true,
                  style: inputStyle,
                  endAdornment: (
                    <InputAdornment>
                      {property.documents.length > 0 ? (
                        <Chip
                          label={`View files (${property.documents.length})`}
                          sx={{ "& .MuiChip-label": {}, marginRight: "20px" }}
                          onClick={() => handleOpenDoc()}
                        />
                      ) : (
                        ""
                      )}
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
              {property.propImage.map((image, index) => (
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
          <Box sx={documentStyle}>
            {property.documents.map((document, index) => (
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

export default AddProperties;
