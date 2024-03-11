import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
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
  MenuItem,
  Modal,
  Paper,
  Popper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  useTheme,
  TableFooter,
  TablePagination,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  NearMe,
} from "@mui/icons-material";
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
import BlockIcon from "@mui/icons-material/Block";
import { users } from "./userData";
import { UserContext } from "../../context/user.context";
import moment from "moment";
import Loading from "../loading/Loading";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddUserModal from "./AddUserModal";
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

  Inactive: {
    background: "rgb(105, 120, 133, 0.1)",
    color: "rgb(105, 120, 133)",
  },
  Pending: {
    background: "rgb(249, 168, 29, 0.1)",
    color: "rgb(249, 168, 29)",
  },
  Banned: {
    background: "rgb(182, 43, 41, 0.1)",
    color: "rgb(182, 43, 41)",
  },
};

const userStatus = {
  admin: {
    background: "rgb(229, 86, 4, 0.1)",
    color: "rgb(229, 86, 4)",
  },
  staff: {
    background: "rgb(213,108,133, 0.1)",
    color: "rgb(213,108,133)",
  },
  member: {
    background: "rgb(17,139,244, 0.1)",
    color: "rgb(17,139,244)",
  },
};

const UserManagement = () => {
  const countStatus = useMemo(() => {
    return (listUser, status) => {
      const count = listUser.reduce((acc, user) => {
        if (user.status.toLowerCase() === status.toLowerCase()) {
          return acc + 1;
        }
        return acc;
      }, 0);

      return count;
    };
  }, []);

  const {
    getAllAccount,
    banAccount,
    unbanAccount,
    removeAccount,
    createAccount,
  } = useContext(UserContext);
  const [userList, setUserList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedFilter, setSelectedFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [amount, setAmount] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [statusCount, setStatusCount] = useState({
    all: userList.length,
    active: countStatus(userList, "Active"),
    inactive: countStatus(userList, "Inactive"),
    pending: countStatus(userList, "Pending"),
    banned: countStatus(userList, "Banned"),
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const filterUserData = userList.filter(
    (row) =>
      selectedFilter === "All" ||
      (selectedFilter !== "All" && row.status === selectedFilter)
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filterUserData.length)
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
      all: userList.length,
      active: countStatus(userList, "Active"),
      inactive: countStatus(userList, "Inactive"),
      pending: countStatus(userList, "Pending"),
      banned: countStatus(userList, "Banned"),
    }));
  }, [userList]);

  useLayoutEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await getAllAccount();

        if (res.success) {
          setUserList(res.response);
        } else {
          console.log("Fetch User List fail");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserList();
  }, []);

  // console.log(userList);

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

  // useEffect(() => {
  //   setAmount(filterUserData.length);
  // }, [selectedFilter]);

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

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const actions = [
    {
      name: "View User",
      onClick: () => {},
      icon: <GridViewIcon />,
      disabled: (status) => false,
    },
    {
      name: "Ban User",
      onClick: (id) => {
        handleChangeAccountStatus(id, "Ban");
        handleClosePopover();
      },
      icon: <BlockIcon />,
      disabled: (status) => (status === "Banned" ? true : false),
    },

    {
      name: "Unban User",
      onClick: (id) => {
        handleChangeAccountStatus(id, "Unban");
        handleClosePopover();
      },
      icon: <BlockIcon />,
      disabled: (status) => (status === "Banned" ? false : true),
    },

    {
      name: "Delete User",
      onClick: (id) => {
        handleChangeAccountStatus(id, "Remove");
        handleClosePopover();
      },
      icon: <CloseIcon />,
      disabled: (status) => (status === "Banned" ? false : true),
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
      name: "Active",
      amount: statusCount.active,
      background: "rgb(57,143,95, 0.1)",
      color: "rgb(57,143,95)",
    },

    {
      name: "Inactive",
      amount: statusCount.inactive,
      background: "rgb(105, 120, 133, 0.1)",
      color: "rgb(105, 120, 133)",
    },
    {
      name: "Banned",
      amount: statusCount.banned,
      background: "rgb(182, 43, 41, 0.1)",
      color: "rgb(182, 43, 41)",
    },
    {
      name: "Pending",
      amount: statusCount.pending,
      background: "rgb(249, 168, 29, 0.1)",
      color: "rgb(249, 168, 29)",
    },
  ];

  const handleChangeAccountStatus = async (id, status) => {
    try {
      let res = null;

      switch (status) {
        case "Ban": {
          res = await banAccount(id);

          if (res.success) {
            const indexToUpdate = userList.findIndex(
              (item) => item._id === res.response._id
            );

            if (indexToUpdate !== -1) {
              const updatedAuctionList = [...userList];
              updatedAuctionList[indexToUpdate] = res.response;

              // console.log("updatedAuctionList", updatedAuctionList);
              setUserList(updatedAuctionList);
            }
          }
          break;
        }

        case "Unban": {
          res = await unbanAccount(id);

          if (res.success) {
            const indexToUpdate = userList.findIndex(
              (item) => item._id === res.response._id
            );

            if (indexToUpdate !== -1) {
              const updatedAuctionList = [...userList];
              updatedAuctionList[indexToUpdate] = res.response;

              // console.log("updatedAuctionList", updatedAuctionList);
              setUserList(updatedAuctionList);
            }
          }
          break;
        }

        case "Remove": {
          res = await removeAccount(id);

          if (res.success) {
            const indexToUpdate = userList.findIndex(
              (item) => item._id === res.response._id
            );

            if (indexToUpdate !== -1) {
              const updatedAuctionList = [...userList];
              updatedAuctionList[indexToUpdate] = res.response;

              setUserList(updatedAuctionList);
            }
          }
          break;
        }

        default: {
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading setIsLoading={setIsLoading} />;
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    borderRadius: "20px",
  };

  return (
    <div style={{ marginLeft: "50px" }}>
      <div className="header">
        <Grid container justifyContent="space-between" alignContent="center">
          <Grid item>
            <Typography
              variant="body1"
              color="initial"
              fontSize={26}
              fontWeight={600}
            >
              User List
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{
                borderRadius: "8px",
                background: "#00D284",
                fontWeight: 600,
                color: "white",
                p: "8px 20px",
                textTransform: "none",
                fontSize: "16px",
                mr: "20px",
                "&:hover": {
                  background: "#00D284",
                  color: "white",
                },
              }}
              onClick={() => handleOpenAddModal()}
            >
              Add New User
            </Button>
            <AddUserModal
              openModal={openAddModal}
              handleCloseModal={handleCloseAddModal}
            />
          </Grid>
        </Grid>
      </div>
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
                <TableCell style={tableHeader}>Name</TableCell>
                <TableCell align="center" style={tableHeader}>
                  Phone Number
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Address
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Create at
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Role
                </TableCell>
                <TableCell align="center" style={tableHeader}>
                  Status
                </TableCell>
                <TableCell align="center" style={tableHeader}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filterUserData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filterUserData
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{count + index}</TableCell>
                  <TableCell>
                    <div className="">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Typography
                            variant="body1"
                            color="initial"
                            sx={{
                              width: "250px",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              WebkitLineClamp: 1,
                            }}
                          >
                            {`${row.firstName} ${row.lastName}`}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={600}
                            sx={{}}
                          >
                            {row.email ? row.email : "Empty"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {row.phoneNumber ? row.phoneNumber : "Empty"}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "200px" }}>
                    {row.street !== undefined &&
                    row.ward &&
                    row.district &&
                    row.city
                      ? `${row?.street}, ${row?.ward}, ${row?.district}, ${row?.city}`
                      : "Empty"}
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  {/* <TableCell align="center">{row.sales}</TableCell> */}
                  <TableCell align="center">
                    {" "}
                    <Chip
                      label={row.role}
                      style={{
                        background: userStatus[row.role].background,
                        fontWeight: 600,
                        color: userStatus[row.role].color,
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      label={row.status}
                      style={{
                        background: statusColor[row?.status]?.background,
                        fontWeight: 600,
                        color: statusColor[row?.status]?.color,
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
                              onClick={() => action.onClick(row._id)}
                              sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                color: "black",
                              }}
                              disabled={action.disabled(row.status)}
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
                  count={filterUserData.length}
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

export default UserManagement;
