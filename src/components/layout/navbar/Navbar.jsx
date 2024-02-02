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
import { Badge } from "@mui/material";
import Auth from "../../auth/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../search-auction-list/SearchBar";
import SearchComponent from "../../search-auction-list/SearchComponent";
import SellerComponent from "../../seller-dashboard/SellerComponent";

const pages = ["Buy", "Sell", "Blog", "Alert"];
const pageNames = [
  {
    name: "Buy",
    url: "/auctions",
  },
  {
    name: "Sell",
    url: "/sell",
  },
  {
    name: "Blog",
    url: "",
  },
  {
    name: "Alert",
    url: "",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const currentLocation = location.pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (url) => {
    navigate(url);
    handleCloseNavMenu();
  };

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="navbar-container">
      <AppBar className="header" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            {/* {Logo} */}

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                // fontFamily: "monospace",
                // fontWeight: 700,
                // letterSpacing: '.3rem',
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
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pageNames.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                // fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: ".3rem",
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
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {pageNames.map((page, index) => (
                <>
                  <Button
                    key={index}
                    onClick={() => handleNavigate(page.url)}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    {page.name === "Alert" ? (
                      // Render a different type of content for 'Alert'
                      <Badge badgeContent={1} color="primary">
                        {page.name}
                      </Badge>
                    ) : (
                      // Render the regular content for other pages
                      page.name
                    )}
                  </Button>
                </>
              ))}
              <display
                className="button-login-container"
                onClick={() => setModalShow(true)}
              >
                Register / Sign In
              </display>
            </Box>

            <Auth show={modalShow} onHide={() => setModalShow(false)} />

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
