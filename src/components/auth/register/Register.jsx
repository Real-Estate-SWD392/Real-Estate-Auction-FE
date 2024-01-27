import React from "react";
import "./Register.scss";
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { validationPassword } from "../validate";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "./Register.scss";

import Button from "@mui/material/Button";

import google from "../../../assets/img/google_icon.webp";

const Register = () => {

  const [isTruePassword, setIsTruePassword] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: validationPassword,
  });

  const tooglePassword = (input) => {
    switch (input) {
      case "current":
        setShowPassword(!showPassword);
        break;
    }
  };

  return (
    <div className="register-container">
      <p className="register-description">
        Register with Hubzu to "favorite" properties, submit bids 24/7, and
        receive instant updates.
      </p>

      <form className="form-container" onSubmit={formik.handle}>

      <Row>
        <Col style={{paddingRight: "5px"}}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            First Name
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="first name"
            className="input-field"
            margin="dense"
            type="text"
            name="first name"
            onChange={formik.handleChange}
            // error={
            //   formik.touched.password && Boolean(formik.errors.password)
            // }
          />
          <FormHelperText error>
            {formik.touched.username && formik.errors.username}
          </FormHelperText>
        </FormControl>
        </Col>
        <Col style={{paddingLeft: "5px"}}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Last Name
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="last name"
            className="input-field"
            margin="dense"
            type="email"
            name="last name"
            onChange={formik.handleChange}
            // error={
            //   formik.touched.password && Boolean(formik.errors.password)
            // }
          />
          <FormHelperText error>
            {formik.touched.username && formik.errors.username}
          </FormHelperText>
        </FormControl>
        </Col>
      </Row>

      <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Email Address
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="email address"
            className="input-field"
            margin="dense"
            type="email"
            name="username"
            onChange={formik.handleChange}
            // error={
            //   formik.touched.password && Boolean(formik.errors.password)
            // }
          />
          <FormHelperText error>
            {formik.touched.username && formik.errors.username}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Phone
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="phone"
            className="input-field"
            margin="dense"
            type="text"
            name="phone"
            onChange={formik.handleChange}
            // error={
            //   formik.touched.password && Boolean(formik.errors.password)
            // }
          />
          <FormHelperText error>
            {formik.touched.phone && formik.errors.phone}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Password
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="password"
            className="input-field"
            margin="dense"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => tooglePassword("current")}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <FormHelperText error>
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="confirm password"
            className="input-field"
            margin="dense"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => tooglePassword("current")}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            name="confirm password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <FormHelperText error>
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>

        <div>
          <Button
            className="form-button-signin"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            style={{ color: "white" }}
          >
            Register
          </Button>
        </div>

        <span>
          <p>By clicking on Register, you accept the Hubzu <b>Terms & Conditions</b> and <b>Privacy
Policy</b>. </p>
          {/* <Link to="/forgot-password" className="forgot-link">
            Forgot your password ?
          </Link> */}
        </span>

        <p style={{ paddingTop: "20px" }}>
          Or, sign in with your Google Account:
        </p>

      </form>

      <Button variant="outlined" sx={{ textTransform: "none", height: '48px', borderColor: '#ADC4DA', color:'black' }}>
        <img className="google-icon" src={google} alt="" />
        Continue with Google
      </Button>
    </div>
  );
};

export default Register;
