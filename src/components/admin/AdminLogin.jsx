import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  outline: "none",
  borderRadius: "20px",
  width: 850,
};

const AdminLogin = () => {
  const [open, setOpen] = useState(true);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };
  const handleCloseSnackbar = () => {
    setShowError(false);
  };

  const handleSubmit = () => {
    if (
      login.email === "phucanhdodang1211@gmail.com" &&
      login.password === "1"
    ) {
      navigate("/accommondation-admin");
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <img
        src="https://i.pinimg.com/564x/a1/e3/c0/a1e3c00d397db208e6c657125cd53180.jpg"
        alt=""
        style={{ width: "100vw", height: "100vh" }}
      />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={5} sx={{}}>
              <img
                src="https://i.pinimg.com/564x/08/0c/fa/080cfa36c6aa700c22381644ba5515c3.jpg"
                alt=""
                style={{
                  filter: "brightness(0.8)",
                  borderTopLeftRadius: "18px",
                  borderBottomLeftRadius: "18px",
                  width: "350px",
                  height: "458px",
                  marginLeft: "-3px",
                  marginBottom: "-2px",
                }}
              />
            </Grid>
            <Grid item xs={7}>
              <div
                className=""
                style={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  color="initial"
                  fontWeight={600}
                  fontSize={22}
                >
                  Accommondation Resource Management
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  fontWeight={600}
                  sx={{ marginTop: "10px" }}
                >
                  Welcome back! Please sign in to continue
                </Typography>
                <TextField
                  id=""
                  label="Email"
                  value={login.email}
                  name="email"
                  sx={{ width: "440px", mt: "50px" }}
                  onChange={handleOnChange}
                />
                <TextField
                  id=""
                  label="Password"
                  value={login.password}
                  name="password"
                  sx={{ width: "440px", mt: "20px" }}
                  onChange={handleOnChange}
                />
                <Button
                  sx={{
                    mt: "30px",
                    borderRadius: "8px",
                    background: "#0089ED",
                    color: "white",
                    textTransform: "none",
                    width: "440px",
                    py: "10px",
                    "&:hover": {
                      background: "#0089ED",
                    },
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                  onClick={() => handleSubmit()}
                >
                  Login
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={showError}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        style={{ top: "51%", left: "49%" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          style={{ width: "calc(100% + 100px)" }}
        >
          Invalid email or password. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminLogin;
