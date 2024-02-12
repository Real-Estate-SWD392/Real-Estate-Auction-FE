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
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabChange = (newValue, url) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA" }}>
      <Grid container>
        <Grid item sx={{ mt: "30px", ml: "30px" }}>
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
                    key={index}
                    onClick={() => handleTabChange(index)}
                    sx={{ py: "20px" }}
                  >
                    <Typography
                      variant="body1"
                      color={selectedTabIndex === index ? "#31A2FC" : "initial"}
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
        <Grid item sx={{ mt: "30px", ml: "50px" }}>
          <div className="tab-panel">{tabs[selectedTabIndex].component}</div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileComponent;
