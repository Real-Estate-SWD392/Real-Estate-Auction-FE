import React, { useEffect, useMemo, useState } from "react";
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
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import PropTypes from "prop-types";
import { reports } from "./reportList";

const tableHeader = {
  fontWeight: 600,
};

const count = 1;

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

const ReportManagement = () => {
  // const [reportsInfo, setReportsInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedFilter, setSelectedFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const countStatus = useMemo(() => {
    return (listReports, status) => {
      if (listReports.length > 0) {
        const count = listReports.reduce((acc, auction) => {
          if (auction.status.toLowerCase() === status.toLowerCase()) {
            return acc + 1;
          }
          return acc;
        }, 0);
        return count;
      }
    };
  }, []);

  const [statusCount, setStatusCount] = useState({
    all: reports.length,
    approved: countStatus(reports, "Approved"),
    rejected: countStatus(reports, "Rejected"),
    pending: countStatus(reports, "Pending"),
  });

  useEffect(() => {
    setStatusCount((prevCount) => ({
      ...prevCount,
      all: reports.length,
      approved: countStatus(reports, "Approved"),
      rejected: countStatus(reports, "Rejected"),
      pending: countStatus(reports, "Pending"),
    }));
  }, []);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const filteredReportData = reports.filter(
    (row) =>
      selectedFilter === "All" ||
      (selectedFilter !== "All" && row.status === selectedFilter)
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredReportData.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const actions = [
    {
      name: "Close Auction",
      onClick: (id) => {
        // handleCloseAuction(id);
      },
      icon: <DeleteIcon />,
    },
    {
      name: "Reject Request",
      onClick: () => {},
      icon: <CloseIcon />,
    },
  ];

  const filterType = [
    {
      name: "All",
      amount: statusCount.all,
      background: "#222B36",
      color: "white",
    },
    {
      name: "Approved",
      amount: statusCount.approved,
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
      name: "Rejected",
      amount: statusCount.rejected,
      background: "rgb(182, 43, 41, 0.1)",
      color: "rgb(182, 43, 41)",
    },
  ];

  const reasonType = [
    {
      name: "Fraudulent Activity",
      background: "rgb(137, 22, 82, 0.1)",
      color: "rgb(137, 22, 82)",
    },
    {
      name: "Inappropriate Content",
      background: "rgb(29, 36, 202,0.1)",
      color: "rgb(29, 36, 202)",
    },
    {
      name: "Scam/Missing Information",
      background: "rgb(27, 60, 115,0.1)",
      color: "rgb(27, 60, 115)",
    },
    {
      name: "Price Manipulation",
      background: "rgb(255, 64, 125,0.1)",
      color: "rgb(255, 64, 125)",
    },
    {
      name: "Counterfeit Items",
      background: "rgb(105, 98, 173,0.1)",
      color: "rgb(105, 98, 173)",
    },
    {
      name: "Unfair Bidding Practices",
      background: "rgb(131, 192, 193,0.1)",
      color: "rgb(131, 192, 193)",
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
        Report List
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
            <Grid container spacing={6} alignItems="center">
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
              <Grid item>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "100px",
                  }}
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
                    {filteredReportData.length}
                  </span>{" "}
                  result(s)
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Box>

        <TableContainer component={Paper} sx={{ mb: "20px" }}>
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead sx={{ background: "#F4F6F8" }}>
              <TableRow>
                <TableCell align="center" style={tableHeader}>
                  No.
                </TableCell>
                <TableCell style={tableHeader}>Property Overview</TableCell>
                <TableCell align="center" style={tableHeader}>
                  Reporter
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Date
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Reason
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Description
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Status
                </TableCell>
                <TableCell align="center" style={tableHeader}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredReportData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredReportData
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{count + index}</TableCell>
                  <TableCell>
                    <div className="">
                      <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        flexDirection="row"
                      >
                        <Grid item>
                          <img
                            src={row?.img}
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
                            {row?.address}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={600}
                            fontSize={14}
                            sx={{ marginTop: "5px" }}
                          >
                            {row.type}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={500}
                            fontSize={14}
                            sx={{ marginTop: "5px" }}
                          >
                            Hosted by {row.ownerFullName}
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
                    {row.reporterName}
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.date).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    <Chip
                      label={row.reason}
                      style={{
                        background: reasonType.find(
                          (item) => item.name === row.reason
                        )?.background,

                        fontWeight: 600,
                        color: reasonType.find(
                          (item) => item.name === row.reason
                        )?.color,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={14}
                      sx={{
                        width: "150px",
                        // display: "-webkit-box",
                        // WebkitBoxOrient: "vertical",
                        // overflow: "hidden",
                        // WebkitLineClamp: 2,
                      }}
                    >
                      {row.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ p: 0 }}>
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
                    {row.status === "Pending" ? (
                      <IconButton
                        onClick={(event) => handleOpenPopover(event, index)}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    ) : (
                      ""
                    )}
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
                        {actions.map((action) => (
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
                  count={filteredReportData.length}
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
    </div>
  );
};

export default ReportManagement;
