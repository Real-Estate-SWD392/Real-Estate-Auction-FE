import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import GroupIcon from "@mui/icons-material/Group";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../../context/auth.context";

export const drawerWidth = 300;
const selectedColor = "rgb(17,139,244)";
const selectedBackground = "rgb(17,139,244, 0.1)";

const sideBar = [
  {
    name: "Auction Management",
    icon: <MapsHomeWorkIcon />,
    url: "/accommondation-staff/auction-management",
    role: ["staff"],
  },
  {
    name: "Reports",
    icon: <ReportIcon />,
    url: "/accommondation-staff/reports",
    role: ["staff"],
  },
];

const StaffSideBar = () => {
  const { user, logout } = useContext(AuthContext);

  const [selectedIndex, setSelectedIndex] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname;

  const currentTab = sideBar.find((tab) => tab.url === currentLocation);

  useEffect(() => {
    if (currentLocation === "/accommondation-staff") {
      navigate("auction-management");
      setSelectedIndex("Auction Management");
    } else setSelectedIndex(currentTab?.name);
  }, []);

  const handleNavigate = (url) => {
    navigate(url);
  };

  const handleChangeIndex = (name) => {
    setSelectedIndex(name);
  };

  const handleClick = (url, name) => {
    handleNavigate(url);
    handleChangeIndex(name);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {sideBar.map((content, index) => (
            <ListItem key={index}>
              <ListItemButton
                selected={selectedIndex === content.name}
                onClick={() => handleClick(content.url, content.name)}
                sx={{
                  py: "16px",
                  borderRadius: "10px",
                  "&&.Mui-selected": {
                    bgcolor: selectedBackground,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedIndex === content.name ? selectedColor : "",
                  }}
                >
                  {content.icon}
                </ListItemIcon>
                <Typography
                  variant="body1"
                  color={
                    selectedIndex === content.name ? selectedColor : "initial"
                  }
                  fontWeight={600}
                  fontSize={16}
                >
                  {content.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemButton
              sx={{
                py: "16px",
                borderRadius: "10px",
              }}
              onClick={() => {
                navigate("/");
                handleLogout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Typography
                variant="body1"
                color="initial"
                fontWeight={600}
                fontSize={16}
              >
                Log out
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default StaffSideBar;