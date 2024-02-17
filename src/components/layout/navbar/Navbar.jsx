import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../../assets/img/logo_auction.png";
import "./Navbar.scss";
import { Badge, Divider } from "@mui/material";
import Auth from "../../auth/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../search-auction-list/SearchBar";
import SearchComponent from "../../search-auction-list/SearchComponent";
import SellerComponent from "../../seller-dashboard/SellerComponent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/system";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";

const pageNames = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Buy",
    url: "/auctions",
  },
  {
    name: "Sell",
    url: "/sell",
  },
  {
    name: "Alert",
    url: "",
  },
];

export const userSettings = [
  {
    name: "My Account",
    url: "/my-account",
  },
  {
    name: "Seller Dashboard",
    url: "/sell",
  },
];

const CustomDivider = styled("div")({
  width: "100%",
  height: "2px",
  background: "#EDEDED",
});

function ResponsiveAppBar({ userName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useContext(AuthContext);

  const currentLocation = location.pathname;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (url) => {
    handleClose();
    navigate(url);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="navbar-container">
      <AppBar
        className="header"
        position="static"
        sx={{ borderBottom: "1px solid #E2EAF2", py: "5px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <div className="logo-container">
                <img className="image-logo" src={Logo} alt="" />
                <div className="logo-content">
                  <div className="logo-content-a">Accommondation</div>
                  <div className="logo-content-b">A Real Estate Auction</div>
                </div>
              </div>
            </Typography>
            {currentLocation === "/auctions" ? <SearchBar /> : null}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: "30px",
              }}
            >
              {pageNames.map((page, index) => (
                <>
                  <Button
                    key={index}
                    onClick={() => handleNavigate(page.url)}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      textTransform: "none",
                      marginLeft: "10px",
                    }}
                  >
                    {page.name === "Alert" ? (
                      // Render a different type of content for 'Alert'
                      <Badge badgeContent={1} color="primary">
                        <Typography
                          variant="body1"
                          color="initial"
                          fontWeight={600}
                        >
                          {page.name}
                        </Typography>
                      </Badge>
                    ) : (
                      // Render the regular content for other pages
                      <Typography
                        variant="body1"
                        color="initial"
                        fontWeight={600}
                      >
                        {page.name}
                      </Typography>
                    )}
                  </Button>
                </>
              ))}
            </Box>
            <Box>
              {userName ? (
                <>
                  <Button
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      textTransform: "none",
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    Welcome,
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "18px",
                        marginLeft: "10px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {userName}
                    </span>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{}}
                  >
                    {userSettings.map((setting, index) => (
                      <div key={index}>
                        <MenuItem
                          sx={{
                            py: "16px",
                            fontSize: "17px",
                            pl: "20px",
                            pr: "80px",
                            fontWeight: 600,
                          }}
                          onClick={() => handleNavigate(setting.url)}
                        >
                          {setting.name}
                        </MenuItem>
                        <CustomDivider />
                      </div>
                    ))}
                    <MenuItem
                      sx={{
                        py: "16px",
                        fontSize: "17px",
                        pl: "20px",
                        pr: "80px",
                        fontWeight: 600,
                      }}
                      onClick={handleLogout}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <display
                  className="button-login-container"
                  onClick={() => setModalShow(true)}
                >
                  Register / Sign In
                </display>
              )}
            </Box>
            <Auth
              show={modalShow}
              setModalShow={setModalShow}
              onHide={() => setModalShow(false)}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
