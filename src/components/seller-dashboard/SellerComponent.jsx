// SellerComponent.js
import React, { useState } from "react";
import ResponsiveAppBar from "../layout/navbar/Navbar";
import SellerSideBar, { tabs } from "./SellerSideBar";
import { Box } from "@mui/material";
import { TabPanel } from "./TabPanel";

const SELLER_ROUTE = "Sell";

const SellerComponent = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabChange = (newValue) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA" }}>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SellerSideBar
          userName={"Anh Anh"}
          userEmail={"phucanhdodang1211@gmail.com"}
          selectedTabIndex={selectedTabIndex}
          onTabChange={handleTabChange}
        />
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={selectedTabIndex} index={index}>
            {tab.component}
          </TabPanel>
        ))}
      </div>
    </Box>
  );
};

export default SellerComponent;
