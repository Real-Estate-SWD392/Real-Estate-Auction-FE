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
import Wallet from "../../wallet/Wallet";
import AddBalance from "../../wallet/AddBalance";
import { useEffect } from "react";
import { UserContext } from "../../../context/user.context";

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
    name: "E-wallet",
    url: "",
  },
];

export const userSettings = [
  {
    name: "My Account",
    url: "/my-account",
    role: ["staff", "admin", "member"],
  },

  {
    name: "Seller Dashboard",
    url: "/sell/profile",
    role: ["member"],
  },

  {
    name: "For Staff",
    url: "/accommondation-staff/auction-management",
    role: ["staff"],
  },

  {
    name: "For Admin",
    url: "/accommondation-admin/user-management",
    role: ["admin"],
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
  const { logout, isOpenLogin, setIsOpenLogin } = useContext(AuthContext);
  const { userWallet, setUserWallet, getBalance } = useContext(UserContext);
  const [openWallet, setOpenWallet] = React.useState(false);
  const [openAddBalance, setOpenAddBalance] = React.useState(false);

  const currentLocation = location.pathname;

  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBalance();
      console.log(res);
      setUserWallet(res?.response);
    };

    fetchData();
  }, [user]);

  // console.log(anchorEl);

  // console.log(Boolean(anchorEl));

  return (
    <div className="navbar-container">
      {openWallet ? (
        <div className="wallet">
          <Wallet setOpenAddBalance={setOpenAddBalance} setOpenWallet={setOpenWallet} wallet={userWallet}/>
        </div>
      ) : (
        ""
      )}

      {openAddBalance ? (
        <div className="add-balance-nav">
          <AddBalance />
        </div>
      ) : (
        ""
      )}

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
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
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
              {user
                ? pageNames.map((page, index) =>
                    user && page.name === "E-wallet" ? (
                      <Button
                        key={index}
                        onClick={() => {setOpenWallet(!openWallet); setOpenAddBalance(false)}}
                        sx={{
                          my: 2,
                          color: "black",
                          display: "block",
                          textTransform: "none",
                          marginLeft: "10px",
                          fontSize: "18px",
                        }}
                      >
                        {
                          // Render the regular content for other pages
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={600}
                            fontSize={"18px"}
                          >
                            {page.name}
                          </Typography>
                        }
                      </Button>
                    ) : (
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
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={600}
                            fontSize={"18px"}
                          >
                            {page.name}
                          </Typography>
                        </Button>
                      </>
                    )
                  )
                : pageNames
                    .filter((item) => item.name !== "E-wallet")
                    .map((page, index) => (
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
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={600}
                            fontSize={"18px"}
                          >
                            {page.name}
                          </Typography>
                        </Button>
                      </>
                    ))}
            </Box>

            <Box>
              {user ? (
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
                        maxWidth: "150px", // Set max width to define the truncation point
                        display: "inline-block", // Ensure that the span behaves like a block element
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
                    {
                      userSettings
                        .filter((item) => item.role.includes(user.role))
                        .map((setting, index) => (
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
                        ))
                      // : userSettings
                      //     .filter((item) => item.name !== "Staff Dashboard")
                      //     .map((setting, index) => (
                      //       <div key={index}>
                      //         <MenuItem
                      //           sx={{
                      //             py: "16px",
                      //             fontSize: "17px",
                      //             pl: "20px",
                      //             pr: "80px",
                      //             fontWeight: 600,
                      //           }}
                      //           onClick={() => handleNavigate(setting.url)}
                      //         >
                      //           {setting.name}
                      //         </MenuItem>
                      //         <CustomDivider />
                      //       </div>
                      //     ))
                    }
                    <MenuItem
                      sx={{
                        py: "16px",
                        fontSize: "17px",
                        pl: "20px",
                        pr: "80px",
                        fontWeight: 600,
                      }}
                      onClick={() => {
                        navigate("/");
                        handleLogout();
                      }}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <display
                  className="button-login-container"
                  onClick={() => {
                    setAnchorEl(false);
                    setIsOpenLogin(true);
                  }}
                >
                  Register / Sign In
                </display>
              )}
            </Box>
            <Auth
              show={isOpenLogin}
              setAnchorEl={setAnchorEl}
              setModalShow={setIsOpenLogin}
              onHide={() => setIsOpenLogin(false)}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
