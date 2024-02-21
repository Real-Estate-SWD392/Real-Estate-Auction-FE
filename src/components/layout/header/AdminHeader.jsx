import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminHeader = ({ role, email }) => {
  const avatarChar = email.charAt(0);
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
          {email}
        </Typography>
        <Avatar
          src="https://i.pinimg.com/236x/ce/20/74/ce2074787ff250b4065dfc00c75b5c85.jpg"
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
