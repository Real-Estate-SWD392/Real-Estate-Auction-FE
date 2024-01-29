// SellerSideBar.js
import React, { useState } from "react";
import { Card, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel, a11yProps } from "./TabPanel";

export const tabs = [
  {
    tabName: "My Profile",
    component: <Typography>My Profile Content</Typography>,
  },
  {
    tabName: "Add Properties",
    component: <Typography>Add Properties Content</Typography>,
  },
  {
    tabName: "Update Property Details",
    component: <Typography>Update Property Content</Typography>,
  },
  {
    tabName: "My Listings",
    component: <Typography>My Listings Content</Typography>,
  },
];

const SellerSideBar = ({
  userName,
  userEmail,
  selectedTabIndex,
  onTabChange,
}) => {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <Card
      elevation={1}
      sx={{
        mt: "95px",
        bgcolor: "white",
        width: "300px",
        p: "20px",
        ml: 20,
      }}
    >
      <Typography variant="body1" color="initial">
        {userName}
      </Typography>
      <Typography variant="body1" color="initial">
        {userEmail}
      </Typography>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTabIndex}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.tabName} {...a11yProps(index)} />
        ))}
      </Tabs>
    </Card>
  );
};

export default SellerSideBar;
