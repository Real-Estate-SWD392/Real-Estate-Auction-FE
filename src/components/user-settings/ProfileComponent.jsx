import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { tabs } from "./UserTabs";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

const Divider = styled("div")({
  width: "100%",
  height: "0.2px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const ProfileComponent = ({ index, userName, userEmail }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;
  console.log(currentLocation);

  const currentName = tabs.find((tab) => tab.url === currentLocation);
  console.log(currentName.tabName);

  useEffect(() => {
    if (currentLocation === "/my-account") {
      setSelectedTabIndex("My Profile");
    } else setSelectedTabIndex(currentName.tabName);
  }, []);

  const handleTabChange = (newValue, url) => {
    setSelectedTabIndex(newValue);
    navigate(url);
  };

  return (
    <>
      <Grid container>
        <Grid item sx={{}}>
          <Card
            elevation={1}
            sx={{
              bgcolor: "white",
              width: "300px",
              p: "30px",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              fontSize={28}
              fontWeight={600}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {userName}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              fontSize={15}
              sx={{ mt: "10px", textDecoration: "underline" }}
            >
              {userEmail}
            </Typography>
            <List sx={{ mt: "40px" }}>
              {tabs.map((tab, index) => (
                <>
                  <ListItemButton
                    selected={selectedTabIndex === tab.tabName}
                    key={index}
                    onClick={() => handleTabChange(tab.tabName, tab.url)}
                    sx={{ py: "20px" }}
                  >
                    <Typography
                      variant="body1"
                      color={
                        selectedTabIndex === tab.tabName ? "#31A2FC" : "initial"
                      }
                      fontSize={17}
                      fontWeight={600}
                    >
                      {tab.tabName}
                    </Typography>
                  </ListItemButton>
                  <Divider />
                </>
              ))}
              <ListItemButton sx={{ py: "15px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontSize={17}
                  fontWeight={600}
                >
                  Log out
                </Typography>
              </ListItemButton>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileComponent;
