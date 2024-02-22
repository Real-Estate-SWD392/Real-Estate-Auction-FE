// SellerComponent.js
import React, { useContext, useEffect, useState } from "react";
import ResponsiveAppBar from "../layout/navbar/Navbar";
import {
  Box,
  Card,
  Grid,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { tabs } from "./SellerTabs";
import { styled } from "@mui/system";
import { AuthContext } from "../../context/auth.context";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateProperty from "./UpdateProperty/UpdateProperty";

const Divider = styled("div")({
  width: "100%",
  height: "0.2px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const SellerComponent = () => {
  const { user } = useContext(AuthContext);

  const nav = useNavigate();

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const url = useLocation().pathname.split("sell/")[1];

  console.log(url);

  useEffect(() => {
    for (let i = 0; i < tabs.length; i++) {
      console.log(tabs[i].link === url);
      if (tabs[i].link === url) {
        setSelectedTabIndex(i);
      }
    }
  }, [url]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTabIndex]);

  const handleTabChange = (newValue) => {
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
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              fontSize={15}
              sx={{ mt: "10px", textDecoration: "underline" }}
            >
              {user.email}
            </Typography>
            <List sx={{ mt: "40px" }}>
              {tabs
                .filter((tab) => tab.link !== "update")
                .map((tab, index) => (
                  <>
                    <ListItemButton
                      key={index}
                      // onClick={() => handleTabChange(index)}
                      onClick={() => {
                        setIsOpenUpdate(false);
                        nav(tab.link);
                      }}
                      sx={{ py: "20px" }}
                    >
                      <Typography
                        variant="body1"
                        color={
                          selectedTabIndex === index ? "#31A2FC" : "initial"
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
        <Grid item sx={{ mt: "30px", ml: "50px" }}>
          <div className="tab-panel">
            {isOpenUpdate ? (
              <UpdateProperty />
            ) : tabs[selectedTabIndex]?.link === "property-list" ? (
              React.cloneElement(tabs[selectedTabIndex]?.component, {
                setIsOpenUpdate: setIsOpenUpdate,
                setSelectedTabIndex: setSelectedTabIndex,
              })
            ) : (
              tabs[selectedTabIndex]?.component
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerComponent;
