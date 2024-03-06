import React, { useContext, useEffect, useMemo, useState } from "react";
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
// import { auctionData } from "./auctionData";
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
import moment from "moment";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth.context";
import { AuctionContext } from "../../context/auction.context";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../../redux/reducers/auctionSlice";
// import { users } from "./userData";
import Loading from "../loading/Loading";
import { getAllBill } from "../../service/billService";

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
  End: {
    background: "rgb(105, 120, 133, 0.1)",
    color: "rgb(105, 120, 133)",
  },
};

const PaymentHistory = ({ all, active, pending, rejected, ended }) => {
  const [auctionsInfor, setAuctionsInfo] = useState([]);

  const [billsInfo, setBillsInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { user, accessToken } = useContext(AuthContext);

  const { closeAuction } = useContext(AuctionContext);

  const auctionList = useSelector((state) => state.auction.properties);

  const dispatch = useDispatch();

  const countStatus = useMemo(() => {
    return (listAuction, status) => {
      if (listAuction.length > 0) {
        const count = listAuction.reduce((acc, auction) => {
          if (auction.status.toLowerCase() === status.toLowerCase()) {
            return acc + 1;
          }
          return acc;
        }, 0);
        return count;
      }
    };
  }, [auctionsInfor]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [statusCount, setStatusCount] = useState({
    // all: auctionData.length,
    active: countStatus(auctionsInfor, "In Auction"),
    pending: countStatus(auctionsInfor, "Wait For Approval"),
    rejected: countStatus(auctionsInfor, "Cancel"),
    ended: countStatus(auctionsInfor, "End"),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setStatusCount((prevCount) => ({
      ...prevCount,
      all: auctionsInfor.length,
      active: countStatus(auctionsInfor, "In Auction"),
      pending: countStatus(auctionsInfor, "Wait For Approval"),
      rejected: countStatus(auctionsInfor, "Cancel"),
      ended: countStatus(auctionsInfor, "End"),
    }));
  }, [auctionsInfor]);

  useEffect(() => {
    const fetchAllAuction = async () => {
      try {
        const res = await listAuctions();
        console.log("ABC", res.data.response);
        setAuctionsInfo(res.data.response);
      } catch (error) {
        console.log("Problem", error);
      }
    };

    const fetchAllBill = async () => {
      try {
        const res = await getAllBill(user._id, headers);
        console.log("Bills", res.data.response);
        setBillsInfo(res.data.response);
      } catch (error) {
        console.log("Problem", error);
      }
    };

    fetchAllBill();
    fetchAllAuction();
  }, []);

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

  const filteredAuctionData = auctionsInfor.filter(
    (row) =>
      selectedFilter === "All" ||
      (selectedFilter !== "All" && row.status === selectedFilter)
  );

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const handleAuctionRequest = async (id, data) => {
    try {
      const res = await handleAuctionRequestByAdmin(id, data, headers);
      if (res.data.success) {
        if (data.checkedStatus === "Accepted") {
          let updatedList = [...auctionList];
          updatedList.push(res.data.response);
          dispatch(setProperties(updatedList));
        }

        setAnchorEl(null);
        setSelectedRowIndex(null);
        const indexToUpdate = auctionsInfor.findIndex(
          (item) => item._id === res.data.response._id
        );

        if (indexToUpdate !== -1) {
          const updatedAuctionList = [...auctionsInfor];
          updatedAuctionList[indexToUpdate] = res.data.response;

          console.log("updatedAuctionList", updatedAuctionList);
          setAuctionsInfo(updatedAuctionList);
        }

        toast.success(res.data.message);
      } else {
        setAnchorEl(null);
        setSelectedRowIndex(null);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseAuction = async (id) => {
    try {
      const res = await closeAuction(id);
      console.log(res);
      if (res.success) {
        setAnchorEl(null);
        setSelectedRowIndex(null);
        const indexToUpdate = auctionsInfor.findIndex(
          (item) => item._id === res.response._id
        );

        if (indexToUpdate !== -1) {
          const updatedAuctionList = [...auctionsInfor];
          updatedAuctionList[indexToUpdate] = res.response;

          console.log("updatedAuctionList", updatedAuctionList);
          setAuctionsInfo(updatedAuctionList);
        }
      } else {
        setAnchorEl(null);
        setSelectedRowIndex(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterType = [
    {
      name: "All",
      amount: statusCount.all,
      background: "#222B36",
      color: "white",
    },
    {
      name: "Success",
      amount: statusCount.active,
      background: "rgb(57,143,95, 0.1)",
      color: "rgb(57,143,95)",
    },
    {
      name: "Pending",
      amount: statusCount.pending,
      background: "rgb(249, 168, 29, 0.1)",
      color: "rgb(249, 168, 29)",
    },
    {
      name: "Cancel",
      amount: statusCount.rejected,
      background: "rgb(182, 43, 41, 0.1)",
      color: "rgb(182, 43, 41)",
    },
    {
      name: "End",
      amount: statusCount.ended,
      background: "rgb(105, 120, 133, 0.1)",
      color: "rgb(105, 120, 133)",
    },
  ];

  if (isLoading) {
    return <Loading setIsLoading={setIsLoading} />;
  }

  return (
    <div style={{ marginLeft: "50px" }}>
      <Typography
        variant="body1"
        color="initial"
        fontSize={26}
        fontWeight={600}
      >
        Payment History
      </Typography>
      <div
        className="box"
        style={{ marginTop: "50px", width: "120%" }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead sx={{ background: "#F4F6F8" }}>
              <TableRow>
                <TableCell align="center" style={tableHeader}>
                  No.
                </TableCell>
                {/* <TableCell style={tableHeader}>Property Overview</TableCell> */}
                <TableCell align="center" style={tableHeader}>
                  Auction ID
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Create At
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Total
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Payment
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Status
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Type
                </TableCell>
                <TableCell style={tableHeader}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billsInfo &&
                billsInfo?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{count + index}</TableCell>
                    {/* <TableCell> */}
                    {/* <div className=""> */}
                    {/* <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <img
                              src={row?.realEstateID?.image[0]}
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
                                width: "220px",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 2,
                              }}
                            >
                            </Typography>
                            <Typography
                              variant="body1"
                              color="initial"
                              fontWeight={600}
                              sx={{ marginTop: "10px" }}
                            >
                              {row.type}
                            </Typography>
                          </Grid>
                        </Grid> */}
                    {/* </div> */}
                    {/* // </TableCell> */}
                    <TableCell
                      align="center"
                      style={{
                        maxWidth: "500px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.auctionID}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {moment(row.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <CurrencyFormatter amount={row.total} />
                    </TableCell>
                    <TableCell align="center">{row.payment}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        style={{
                          background: filterType.find(
                            (item) => item.name === row.status
                          )?.background,

                          fontWeight: 600,
                          color: filterType.find(
                            (item) => item.name === row.status
                          )?.color,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        maxWidth: "500px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.type}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PaymentHistory;
