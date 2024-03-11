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
import Logo from "../../../assets/img/logo_auction.png";

export const drawerWidth = 300;
const selectedColor = "rgb(17,139,244)";
const selectedBackground = "rgb(17,139,244, 0.1)";

const sideBar = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    url: "/accommondation-admin/dashboard",
    role: ["admin"],
  },

  {
    name: "User Management",
    icon: <GroupIcon />,
    url: "/accommondation-admin/user-management",
    role: ["admin"],
  },
];

const AdminSideBar = () => {
  const { user, logout } = useContext(AuthContext);

  const [selectedIndex, setSelectedIndex] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname;

  const currentTab = sideBar.find((tab) => tab.url === currentLocation);

  useEffect(() => {
    if (currentLocation === "/accommondation-admin") {
      setSelectedIndex("Dashboard");
      navigate("dashboard");
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
        <div
          className="logo-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "40px 30px",
          }}
        >
          <img
            className="image-logo"
            src={Logo}
            alt=""
            style={{ width: "45px" }}
          />
          <div class="logo-content" style={{ lineHeight: 1 }}>
            <div
              className="logo-content-a"
              style={{ fontSize: "22px", fontWeight: 700 }}
            >
              Accommondation
            </div>
            <div
              className="logo-content-b"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              A Real Estate Auction
            </div>
          </div>
        </div>

        <Divider />
        <List>
          {sideBar
            .filter((item) => item.role.includes("admin"))
            .map((content, index) => (
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
                      color:
                        selectedIndex === content.name ? selectedColor : "",
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

export default AdminSideBar;
