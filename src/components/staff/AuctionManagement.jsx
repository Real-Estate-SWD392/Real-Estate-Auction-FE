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
  Modal,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  NearMe,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
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
import {
  setNotStartAuction,
  setProperties,
} from "../../redux/reducers/auctionSlice";
import Loading from "../loading/Loading";
import dayjs, { Dayjs } from "dayjs";
import {
  DateCalendar,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import PropTypes from "prop-types";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

const AuctionManagement = ({ all, active, pending, rejected, ended }) => {
  const [auctionsInfor, setAuctionsInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [chooseID, setChooseID] = useState("");

  const { user, accessToken } = useContext(AuthContext);

  const { closeAuction } = useContext(AuctionContext);

  const [calenderValue, setCalenderValue] = useState(null);

  const [isOpenCalender, setIsOpenCalender] = useState(false);

  const auctionList = useSelector((state) => state.auction.properties);

  const notStartList = useSelector((state) => state.auction.notStartAuction);

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
    all: auctionsInfor.length,
    active: countStatus(auctionsInfor, "In Auction"),
    pending: countStatus(auctionsInfor, "Wait For Approval"),
    notstart: countStatus(auctionsInfor, "Not Start"),
    rejected: countStatus(auctionsInfor, "Cancel"),
    ended: countStatus(auctionsInfor, "End"),
  });

  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const filteredAuctionData = auctionsInfor.filter(
    (row) =>
      selectedFilter === "All" ||
      (selectedFilter !== "All" && row.status === selectedFilter)
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredAuctionData.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setStatusCount((prevCount) => ({
      ...prevCount,
      all: auctionsInfor.length,
      active: countStatus(auctionsInfor, "In Auction"),
      pending: countStatus(auctionsInfor, "Wait For Approval"),
      rejected: countStatus(auctionsInfor, "Cancel"),
      notstart: countStatus(auctionsInfor, "Not Start"),
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

    fetchAllAuction();
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [selectedFilter]);

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

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const handleAuctionRequest = async (id, data) => {
    try {
      const res = await handleAuctionRequestByAdmin(id, data, headers);

      console.log(res);
      if (res.data.success) {
        if (data.checkedStatus === "Accepted") {
          let updatedList = [...notStartList];
          updatedList.push(res.data.response);
          dispatch(setNotStartAuction(updatedList));
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
      const res = await closeAuction(id._id);
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

  const actions = [
    {
      name: "View Detail",
      forStatus: ["In Auction", "Wait For Approval", "End", "Not Start"],
      onClick: (id) => {
        // navigate(`/auction_detail/${id}`);
      },
      icon: <GridViewIcon />,
    },
    {
      name: "Approve Auction",
      forStatus: ["Wait For Approval"],
      onClick: (auction) => {
        setIsOpenCalender(true);
        setAnchorEl(null);
        setChooseID(auction);
      },
      icon: <ChecklistRtlIcon />,
    },
    {
      name: "Deny Auction",
      forStatus: ["Wait For Approval"],
      onClick: (id) => handleAuctionRequest(id, { checkedStatus: "Denied" }),
      icon: <DoDisturbIcon />,
    },
    {
      name: "Close Auction",
      forStatus: ["In Auction"],
      onClick: (id) => {
        handleCloseAuction(id);
      },
      icon: <CloseIcon />,
    },
    {
      name: "Delete Auction",
      forStatus: [
        "In Auction",
        "End",
        "Wait For Approval",
        "Cancel",
        "Not Start",
      ],
      onClick: () => {},
      icon: <DeleteIcon />,
    },
  ];

  console.log(calenderValue);

  const filterType = [
    {
      name: "All",
      amount: statusCount.all,
      background: "#222B36",
      color: "white",
    },
    {
      name: "In Auction",
      amount: statusCount.active,
      background: "rgb(57,143,95, 0.1)",
      color: "rgb(57,143,95)",
    },
    {
      name: "Wait For Approval",
      amount: statusCount.pending,
      background: "rgb(249, 168, 29, 0.1)",
      color: "rgb(249, 168, 29)",
    },

    {
      name: "Not Start",
      amount: statusCount.notstart,
      background: "#F6F193",
      color: "#ECB159",
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
        Auction List
      </Typography>
      <div
        className="box"
        style={{ marginTop: "50px", width: "calc(100% - 20px)" }}
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
              {filteredAuctionData.length}
            </span>{" "}
            result(s)
          </Typography>
        </div>
        <TableContainer component={Paper} sx={{ mb: "20px" }}>
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
              {(rowsPerPage > 0
                ? filteredAuctionData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredAuctionData
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{count + index}</TableCell>
                  <TableCell>
                    <div className="">
                      <Grid container alignItems="center" spacing={2}>
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
                            fontSize={14}
                            sx={{
                              width: "220px",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              WebkitLineClamp: 2,
                            }}
                          >
                            {row.realEstateID.street}, {row.realEstateID.ward},
                            {row.realEstateID.district},{row.realEstateID.city}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={600}
                            fontSize={14}
                            sx={{ marginTop: "10px" }}
                          >
                            {row.realEstateID.type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      maxWidth: "103.7px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.createdAt).format("DD-MM-YYYY")}
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
                      <List
                        sx={{
                          background: "white",
                        }}
                      >
                        {actions
                          ?.filter((item) =>
                            item.forStatus.includes(row.status)
                          )
                          .map((action) => (
                            <ListItem
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                              }}
                            >
                              <Button
                                startIcon={action.icon}
                                onClick={() => action.onClick(row)}
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 600,
                                  color: "black",
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter sx={{ width: "100%" }}>
              <TableRow sx={{ width: "100%" }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={filteredAuctionData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      {isOpenCalender ? (
        <Modal
          open={isOpenCalender}
          onClose={() => setIsOpenCalender(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            className="calender-component"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              className="calender-wrapper"
              style={{
                backgroundColor: "white",
                padding: "10px 20px",
                width: "450px",
              }}
            >
              <div
                className="wrapper-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h5>Choose Start Date: </h5>
                <IconButton onClick={() => setIsOpenCalender(false)}>
                  <Close />
                </IconButton>
              </div>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={calenderValue}
                  onChange={(newValue) => setCalenderValue(newValue)}
                />
              </LocalizationProvider> */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Basic date time picker"
                  value={calenderValue}
                  onChange={(newValue) => setCalenderValue(newValue)}
                />
              </LocalizationProvider>

              <div className="calender-button" style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    const date = new Date(calenderValue).toLocaleString(
                      "en-US",
                      {
                        timeZone: "Asia/Ho_Chi_Minh",
                      }
                    );

                    handleAuctionRequest(chooseID._id, {
                      checkedStatus: "Accepted",
                      startDate: date,
                    });

                    const newList = [...notStartList];

                    newList.push(chooseID);

                    dispatch(setNotStartAuction(newList));

                    setIsOpenCalender(false);

                    setCalenderValue("");
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default AuctionManagement;
