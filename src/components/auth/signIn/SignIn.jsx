import React, { useContext } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import Button from "@mui/material/Button";

import google from "../../../assets/img/google_icon.webp";
import { AuthContext } from "../../../context/auth.context";

const SignIn = (props) => {
  const [isTruePassword, setIsTruePassword] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  // const [login, setLogin] = useState({
  //   email: "",
  //   password: "",
  // });

  const { login, loginGoogle } = useContext(AuthContext);

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: validationPassword,
  });

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

  const handleLoginGoogle = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formik.values.email,
        password: formik.values.password,
      });

      if (res.response.role === "staff") {
        nav("/accommondation-staff");
      } else if (res.response.role === "admin") {
        nav("/accommondation-admin");
      }
      props.setModalShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signIn-container">
      <p className="signin-description">
        Sign in to access all your notifications, bids, offers, saved searches,
        messages and more.
      </p>

      <form className="form-container">
        <FormControl variant="outlined">
          <InputLabel htmlFor="email" color="primary">
            Email Address
          </InputLabel>
          <OutlinedInput
            color="primary"
            label="email address"
            className="input-field"
            margin="dense"
            type="email"
            name="email"
            value={formik.values.email}
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
            onClick={(e) => handleLogin(e)}
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
      {/* <form action="http://localhost:8080/auth/google" method="GET"> */}
      <Button
        // type="submit"
        variant="outlined"
        sx={{
          textTransform: "none",
          height: "48px",
          borderColor: "#ADC4DA",
          color: "black",
        }}
        onClick={handleLoginGoogle}
      >
        <img className="google-icon" src={google} alt="" />
        Continue with Google
      </Button>
      {/* </form> */}
    </div>
  );
};

export default SignIn;
