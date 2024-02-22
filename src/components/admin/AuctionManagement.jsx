import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
} from "@mui/material";
import { NearMe } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import { auctionData } from "./auctionData";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  handleAuctionRequestByAdmin,
  listAuctions,
} from "../../service/auctionService";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth.context";
const filterType = [
  {
    name: "All",
    amount: 20,
    background: "#222B36",
    color: "white",
  },
  {
    name: "Active",
    amount: 5,
    background: "rgb(57,143,95, 0.1)",
    color: "rgb(57,143,95)",
  },
  {
    name: "Pending",
    amount: 5,
    background: "rgb(249, 168, 29, 0.1)",
    color: "rgb(249, 168, 29)",
  },
  {
    name: "Rejected",
    amount: 5,
    background: "rgb(182, 43, 41, 0.1)",
    color: "rgb(182, 43, 41)",
  },
  {
    name: "Ended",
    amount: 5,
    background: "rgb(105, 120, 133, 0.1)",
    color: "rgb(105, 120, 133)",
  },
];

const count = 1;

const tableHeader = {
  fontWeight: 600,
};

const statusColor = {
  Active: {
    background: "rgb(57,143,95, 0.1)",
    color: "rgb(57,143,95)",
  },
  Pending: {
    background: "rgb(249, 168, 29, 0.1)",
    color: "rgb(249, 168, 29)",
  },
  Rejected: {
    background: "rgb(182, 43, 41, 0.1)",
    color: "rgb(182, 43, 41)",
  },
  Ended: {
    background: "rgb(105, 120, 133, 0.1)",
    color: "rgb(105, 120, 133)",
  },
};

const AuctionManagement = ({ all, active, pending, rejected, ended }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const navigate = useNavigate();

  const handleOpenPopover = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowIndex(index);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedRowIndex(null);
  };

  const handleClickAway = () => {
    handleClosePopover();
  };

  const open = Boolean(anchorEl);

  const handleToggleFilter = (name) => {
    setSelectedFilter(name);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      console.log(search);
    }
    //call api for search
    //update result amount
  };

  const CurrencyFormatter = ({ amount }) => {
    // Ensure amount is a number
    const formattedAmount = Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    return (
      <Typography variant="body1" color="initial" fontWeight={500}>
        {formattedAmount}
      </Typography>
    );
  };

  const [auctionsInfo, setAuctionsInfo] = useState({});
  const { user, accessToken } = useContext(AuthContext);
  const userID = user ? user._id : null;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const data = {
    "checkedStatus" : "Accepted"
}

  const handleAuctionRequest = async (id) => {
    console.log("relasls", id);
    console.log("toke", accessToken);
    try {
      const res = await handleAuctionRequestByAdmin(id,data, headers);
      console.log("AUction Man", res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const actions = (id) => [
    {
      name: "View Detail",
      onClick: () => {
        navigate("/");
      },
      icon: <GridViewIcon />,
    },
    {
      name: "Approve Auction",
      onClick: () => handleAuctionRequest(id),
      icon: <ChecklistRtlIcon />,
    },
    {
      name: "Deny Auction",
      onClick: () => {},
      icon: <DoDisturbIcon />,
    },
    {
      name: "Close Auction",
      onClick: () => {},
      icon: <CloseIcon />,
    },
    {
      name: "Delete Auction",
      onClick: () => {},
      icon: <DeleteIcon />,
    },
  ];

  const fetchAllAuction = async () => {
    try {
      const res = await listAuctions();
      console.log("ABC", res.data.response);
      setAuctionsInfo(res.data.response);
    } catch (error) {
      console.log("Problem", error);
    }
  };

  useEffect(() => {
    fetchAllAuction();
  }, []);
  return (
    <div style={{ marginLeft: "50px" }}>
      <Typography
        variant="body1"
        color="initial"
        fontSize={26}
        fontWeight={600}
      >
        Auction List
      </Typography>
      <div
        className="box"
        style={{ marginTop: "50px", width: "calc(100% - 50px)" }}
      >
        <Box
          sx={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            border: "1px solid #E3E3E3",
            width: "100%",
            py: "15px",
          }}
        >
          <div className="grid-container" style={{ marginLeft: "20px" }}>
            <Grid container spacing={6} sx={{}}>
              {filterType.map((filter, index) => (
                <Grid
                  item
                  className="filter"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={() => handleToggleFilter(filter.name)}
                  >
                    <Typography
                      variant="body1"
                      color={
                        filter.name === selectedFilter
                          ? filter.name === "All"
                            ? "initial"
                            : filter.color
                          : "initial"
                      }
                      fontWeight={600}
                    >
                      {filter.name}
                    </Typography>
                    <div
                      className="amount-box"
                      style={{
                        padding: "6px 10px",
                        fontSize: "15px",
                        color: filter.color,
                        background: filter.background,
                        fontWeight: 600,
                        borderRadius: "7px",
                        marginLeft: "13px",
                      }}
                    >
                      {filter.amount < 10 ? "0" + filter.amount : filter.amount}
                    </div>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
        <div
          className="search-box"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: "25px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            border: "1px solid #E3E3E3",
          }}
        >
          <TextField
            id=""
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleEnterKey}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: "10px",
              },
            }}
            sx={{ width: "calc(100% - 500px)" }}
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{ display: "flex", alignItems: "center", marginLeft: "100px" }}
          >
            Currently showing{" "}
            <span
              style={{
                fontWeight: 600,
                fontSize: "16px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              {amount}
            </span>{" "}
            result(s)
          </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead sx={{ background: "#F4F6F8" }}>
              <TableRow>
                <TableCell align="center" style={tableHeader}>
                  No.
                </TableCell>
                <TableCell style={tableHeader}>Property Overview</TableCell>
                <TableCell align="center" style={tableHeader}>
                  Owner
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Create at
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Starting price
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Buy price
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Status
                </TableCell>
                <TableCell style={tableHeader}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auctionsInfo &&
                Array.isArray(auctionsInfo) &&
                auctionsInfo?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{count + index}</TableCell>
                    <TableCell>
                      <div className="">
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <img
                              src={row.realEstateID.image}
                              alt=""
                              width="80px"
                              height="80px"
                              style={{ borderRadius: "10px" }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body1"
                              color="initial"
                              sx={{
                                width: "300px",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 2,
                              }}
                            >
                              {row.realEstateID.city}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="initial"
                              fontWeight={600}
                              sx={{ marginTop: "10px" }}
                            >
                              {row.realEstateID.type}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.owner}</TableCell>
                    <TableCell align="center">
                      {row.realEstateID.createdAt}
                    </TableCell>
                    <TableCell align="center">
                      <CurrencyFormatter amount={row.startPrice} />
                    </TableCell>
                    <TableCell align="center">
                      <CurrencyFormatter amount={row.buyNowPrice} />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        style={{
                          // background: statusColor[row.status].background,
                          fontWeight: 600,
                          // color: statusColor[row.status].color,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(event) => handleOpenPopover(event, index)}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                    <Popper
                      open={open && selectedRowIndex === index}
                      anchorEl={anchorEl}
                      onClose={handleClosePopover}
                    >
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <List sx={{ background: "white" }}>
                          {actions(row._id).map((action) => (
                            <ListItem
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Button
                                startIcon={action.icon}
                                onClick={action.onClick}
                                sx={{
                                  width: "100%",
                                  textTransform: "none",
                                  fontWeight: 600,
                                }}
                              >
                                {action.name}
                              </Button>
                            </ListItem>
                          ))}
                        </List>
                      </ClickAwayListener>
                    </Popper>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AuctionManagement;
