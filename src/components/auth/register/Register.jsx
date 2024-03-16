import React, { useContext } from "react";
import "./Register.scss";
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { validationPassword, validationRegister } from "../validate";
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
import { AuthContext } from "../../../context/auth.context";

const Register = (props) => {
  const [isTruePassword, setIsTruePassword] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { register } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      re_password: "",
    },
    validationSchema: validationRegister,
    onSubmit: (values) => {

      console.log("Data login ", values);
      handleRegister();
    }
  });

  const handleLoginGoogle = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  const tooglePassword = (input) => {
    switch (input) {
      case "current": {
        setShowPassword(!showPassword);
        break;
      }

      default: {
        break;
      }
    }
  };

  const handleRegister = async () => {
    try {
      await register({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
        password: formik.values.password,
        re_password: formik.values.re_password,
      });
      props.setModalShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <p className="register-description">
        Register with Hubzu to "favorite" properties, submit bids 24/7, and
        receive instant updates.
      </p>

      <form  onSubmit={formik.handleSubmit} className="form-container">
        <Row>
          <Col style={{ paddingRight: "5px" }}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="current-password" color="primary">
                First Name *
              </InputLabel>
              <OutlinedInput
                color="primary"
                label="first name"
                className="input-field"
                margin="dense"
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                // error={
                //   formik.touched.firstName && Boolean(formik.errors.firstName)
                // }
              />
              <FormHelperText error>
                {formik.touched.firstName && formik.errors.firstName}
              </FormHelperText>
            </FormControl>
          </Col>
          <Col style={{ paddingLeft: "5px" }}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="current-password" color="primary">
                Last Name *
              </InputLabel>
              <OutlinedInput
                color="primary"
                label="last name"
                className="input-field"
                margin="dense"
                name="lastName"
                onChange={formik.handleChange}
                // error={
                //   formik.touched.password && Boolean(formik.errors.password)
                // }
              />
              <FormHelperText error>
                {formik.touched.lastName && formik.errors.lastName}
              </FormHelperText>
            </FormControl>
          </Col>
        </Row>

        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Email Address *
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="email address"
            className="input-field"
            margin="dense"
            type="email"
            name="email"
            onChange={formik.handleChange}
            // error={
            //   formik.touched.password && Boolean(formik.errors.password)
            // }
          />
          <FormHelperText error>
            {formik.touched.email && formik.errors.email}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Phone *
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="phone"
            className="input-field"
            margin="dense"
            type="text"
            name="phoneNumber"
            onChange={formik.handleChange}
            // error={
            //   formik.touched.password && Boolean(formik.errors.password)
            // }
          />
          <FormHelperText error>
            {formik.touched.phoneNumber && formik.errors.phoneNumber}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="current-password" color="primary">
            Password *
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
            Confirm Password *
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
            name="re_password"
            value={formik.values.re_password}
            onChange={formik.handleChange}
            error={
              formik.touched.re_password && Boolean(formik.errors.re_password)
            }
          />
          <FormHelperText error>
            {formik.touched.re_password && formik.errors.re_password}
          </FormHelperText>
        </FormControl>

        <div>
          <Button
            className="form-button-signin"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            style={{ color: "white" }}
            // onClick={handleRegister}
          >
            Register
          </Button>
        </div>

        <span>
          <p>
            By clicking on Register, you accept the Hubzu{" "}
            <b>Terms & Conditions</b> and <b>Privacy Policy</b>.{" "}
          </p>
          {/* <Link to="/forgot-password" className="forgot-link">
            Forgot your password ?
          </Link> */}
        </span>

        <p style={{ paddingTop: "20px" }}>
          Or, sign in with your Google Account:
        </p>
      </form>

      <Button
        onClick={handleLoginGoogle}
        variant="outlined"
        sx={{
          textTransform: "none",
          height: "48px",
          borderColor: "#ADC4DA",
          color: "black",
        }}
      >
        <img className="google-icon" src={google} alt="" />
        Continue with Google
      </Button>
    </div>
  );
};

export default Register;
