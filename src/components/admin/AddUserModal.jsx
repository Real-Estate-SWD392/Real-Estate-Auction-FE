import {
  Box,
  Grid,
  Modal,
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { UserContext } from "../../context/user.context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
};

const AddUserModal = ({ openModal, handleCloseModal }) => {
  const [newUser, setNewUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    role: "",
    phoneNumber: "",
    status: "Active",
  });

  const { createAccount } = useContext(UserContext);

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Add your validation logic here
    if (!newUser.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!newUser.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!newUser.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!newUser.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!newUser.role) {
      newErrors.role = "Role is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleOnFocus = () => {
    setErrors({});
  };

  const handleCreateUser = () => {
    // const res = await createAccount(body);

    if (validateForm()) {
      console.log(newUser);
      handleCloseModal();
      setNewUser({
        lastName: "",
        firstName: "",
        email: "",
        role: "",
        phoneNumber: "",
        status: "Active",
      });
    }
  };

  const handleClose = () => {
    handleCloseModal();
    setNewUser({
      lastName: "",
      firstName: "",
      email: "",
      role: "",
      phoneNumber: "",
      status: "Active",
    });
    setErrors({});
  };

  return (
    <Modal
      open={openModal}
      //   onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, borderRadius: "15px" }}>
        <div
          className="header"
          style={{
            width: "100%",
            background: "black",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            padding: "15px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            color="white"
            sx={{ ml: 27 }}
            fontWeight={600}
          >
            Add New User
          </Typography>
          <IconButton sx={{ ml: 19 }} onClick={() => handleClose()}>
            <HighlightOffIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="add-form" style={{ padding: "30px 40px" }}>
          <Grid container flexDirection="column" spacing={2}>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newUser.role}
                  label="Role"
                  name="role"
                  onChange={handleInputChange}
                  error={Boolean(errors.role)}
                >
                  <MenuItem value={"member"}>Member</MenuItem>
                  <MenuItem value={"staff"}>Staff</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <TextField
                  id=""
                  label="First name"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  onFocus={handleOnFocus}
                />
              </Grid>
              <Grid item>
                <TextField
                  id=""
                  label="Last name"
                  name="lastName"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                  onFocus={handleOnFocus}
                  onChange={handleInputChange}
                  value={newUser.lastName}
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="Email"
                fullWidth
                name="email"
                error={Boolean(errors.email)}
                helperText={errors.email}
                onFocus={handleOnFocus}
                onChange={handleInputChange}
                value={newUser.email}
              />
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="Phone number"
                fullWidth
                name="phoneNumber"
                value={newUser.phoneNumber}
                onChange={handleInputChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                onFocus={handleOnFocus}
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              width: "100%",
              marginTop: "20px",
              borderRadius: "8px",
              background: "rgb(17,139,244)",
              fontWeight: 600,
              color: "white",
              p: "8px 20px",
              textTransform: "none",
              fontSize: "16px",
              mr: "20px",
              "&:hover": {
                background: "rgb(17,139,244)",
                color: "white",
              },
            }}
            onClick={() => handleCreateUser()}
          >
            Add User
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
