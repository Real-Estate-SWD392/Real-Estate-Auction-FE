import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { useFormik } from "formik";
import Divider from "@mui/joy/Divider";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import "./AddProperties.scss";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
} from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddProperties = () => {
  const [type, setType] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const [bathRoom, setBathRoom] = useState("");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeBedRoom = (event) => {
    setBedRoom(event.target.value);
  };

  const handleChangeBathRooms = (event) => {
    setBathRoom(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
  });

  return (
    <div className="add-properties-container">
      <h1>Add Properties</h1>
      <Divider />

      <h3 className="title-property">Property Details</h3>
      <Divider className="divider-line" />

      <Grid2 container spacing={5}>
        <Grid2 item xs={6}>
          <FormControl required>
            <FormLabel className="required-field">Property ID</FormLabel>
            <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="text"
              name="Property ID"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            />
          </FormControl>
        </Grid2>

        <Grid2 item xs={6}>
          <FormControl required>
            <FormLabel className="required-field">Seller</FormLabel>
            <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="text"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            />
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={5}>
        <Grid2 item xs={12}>
          <FormControl required>
            <FormLabel className="required-field">Street Address</FormLabel>
            <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="text"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            />
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container columns={13} spacing={5}>
        <Grid2 item xs={3}>
          <FormControl required>
            <FormLabel className="required-field">District</FormLabel>
            <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="text"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            />
          </FormControl>
        </Grid2>

        <Grid2 item xs={5}>
          <FormControl required>
            <FormLabel className="required-field">City</FormLabel>
            <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="text"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            />
          </FormControl>
        </Grid2>

        <Grid2 item xs={5}>
          <FormControl>
            <FormLabel>Zip</FormLabel>
            <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="text"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            />
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={5}>
        <Grid2 item xs={3}>
          <FormControl>
            <FormLabel>Property image</FormLabel>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              className="btn-upload-btn"
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </FormControl>
        </Grid2>
      </Grid2>

      <h3 className="title-property">Property Features</h3>
      <Divider className="divider-line" />

      <Grid2 container spacing={5}>
        <Grid2 item xs={6}>
          <FormControl required>
            <FormLabel className="required-field">Property Type</FormLabel>
            {/* <InputLabel id="demo-simple-select-required-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={type}
              // label="Age *"
              onChange={handleChangeType}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 item xs={6}>
          <FormControl>
            <FormLabel>Property Size (sqft) *</FormLabel>
            <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="text"
              name="Property ID"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            />
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={5}>
        <Grid2 item xs={6}>
          <FormControl required>
            <FormLabel className="required-field">Bedrooms</FormLabel>
            {/* <InputLabel id="demo-simple-select-required-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={bedRoom}
              // label="Age *"
              onChange={handleChangeBedRoom}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 item xs={6}>
          <FormControl required>
            <FormLabel className="required-field">Full Bathrooms</FormLabel>
            {/* <InputLabel id="demo-simple-select-required-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={bathRoom}
              // label="Age *"
              onChange={handleChangeBathRooms}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
          <FormControl required>
            <FormLabel className="required-field">
              Marketing Description
            </FormLabel>
            {/* <OutlinedInput
              color="primary"
              className="input-field"
              margin="dense"
              type="textarea"
              name="Property ID"
              onChange={formik.handleChange}
              // error={
              //   formik.touched.password && Boolean(formik.errors.password)
              // }
            /> */}

            <TextareaAutosize minRows={5} />
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={5}>
        <Grid2 item xs={3}>
          <FormControl>
            <FormLabel>Related Documents</FormLabel>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              className="btn-upload-btn"
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </FormControl>
        </Grid2>

      </Grid2>

      <Grid2 container spacing={5}>
      <Button className="btn-submit-save" xs={12} type="submit">Save this Property</Button>
      </Grid2>
    </div>
  );
};

export default AddProperties;
