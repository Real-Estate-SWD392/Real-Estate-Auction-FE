import React from "react";
import { useState } from "react";
import { Col, Modal } from "react-bootstrap";
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
import "./SignIn.scss";
import Button from "@mui/material/Button";

import google from "../../../assets/img/google_icon.webp";

const SignIn = (props) => {
  const [isTruePassword, setIsTruePassword] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
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

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Logged in successfully", data);
      } else {
        const errorData = await response.json();
        console.error("Login failed", errorData.message);
        console.log("Response: ", response);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div className="signIn-container">
      <p className="signin-description">
        Sign in to access all your notifications, bids, offers, saved searches,
        messages and more.
      </p>

      <form className="form-container" onSubmit={formik.handleSubmit}>
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

        <div>
          <Button
            className="form-button-signin"
            variant="contained"
            type="submit"
            // disabled={formik.isSubmitting}
            style={{ color: "white" }}
            onClick={() => handleLogin()}
          >
            Sign In
          </Button>
        </div>

        <span>
          <p>Don't remember your login details? </p>
          <Link to="/forgot-password" className="forgot-link">
            Forgot your password ?
          </Link>
        </span>

        <p style={{ paddingTop: "20px" }}>
          Or, sign in with your Google Account:
        </p>
      </form>
      <Button
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

export default SignIn;
