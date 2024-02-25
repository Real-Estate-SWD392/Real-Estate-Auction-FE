import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../../../context/auth.context";

const AdminHeader = ({ role, email }) => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <Box
      sx={{
        py: "30px",
        display: "flex",
        justifyContent: "flex-end",
        width: "calc(100vw - 300px)",
      }}
    >
      <div
        className="welcome-text"
        style={{ display: "flex", marginRight: "30px", alignItems: "center" }}
      >
        <Typography variant="body1" color="initial">
          Welcome,{" "}
        </Typography>
        <Typography
          variant="body1"
          color="initial"
          fontWeight={600}
          sx={{ marginLeft: "10px" }}
        >
          {user.email}
        </Typography>
        <Avatar
          src={user.image}
          sx={{ width: "50px", height: "50px", marginLeft: "50px" }}
        />
        <IconButton sx={{ marginLeft: "10px" }}>
          <Badge variant="dot" color="primary">
            <NotificationsIcon sx={{ width: "30px", height: "30px" }} />
          </Badge>
        </IconButton>
      </div>
    </Box>
  );
};

export default AdminHeader;
