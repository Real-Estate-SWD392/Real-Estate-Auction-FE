import {
  Card,
  FormHelperText,
  Icon,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  duration,
} from "@mui/material";
import React, { useContext, useState } from "react";

import {
  CardMedia,
  Checkbox,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import { styled } from "@mui/system";
import { statusColor } from "./MyListings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";
import { AuctionContext } from "../../../context/auction.context";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { validationCreateAuction } from "./validateCreateAuction";
import moment from "moment";

const imgCard = {
  width: "320px",
  height: "180px",
};

const address = {
  width: "300px",
  height: "60px",
};

const descSpacing = {
  marginTop: "10px",
};

const combinedStyles = {
  ...address,
  ...descSpacing,
};

const iconSize = {
  width: "20px",
  height: "20px",
  color: "#2A69A3",
};

const StatusBall = styled("div")((props) => ({
  width: "12px",
  height: "12px",
  borderRadius: "10px",
  backgroundColor: props.color,
}));

const getStatusColor = (status) => {
  const statusObj = statusColor.find((item) => item.name === status);
  return statusObj ? statusObj.color : "white";
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

const fieldWidth = {
  width: "70px",
  height: "55px",
};

const durationText = {
  textAlign: "center",
  fontWeight: 600,
  fontSize: "20px",
};

const MyListingCard = ({
  propImg,
  imgList,
  propType,
  desc,
  propStreet,
  propWard,
  propDistrict,
  propCity,
  beds,
  baths,
  area,
  status,
  index,
  auctionLists,
  setAuctionLists,
  propID,
  property,
}) => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const [checkExist, setCheckExist] = useState(null);
  const [auction, setAuction] = useState({
    id: "",
    name: `${user.firstName} ${user.lastName}`,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    startPrice: 0,
    priceStep: 0,
    buyNowPrice: 0,
    realEstateID: propID,
  });

  const {
    createAuction,
    auctionList,
    setAuctionList,
    updateAuction,
    getAuctionByRealEstateID,
  } = useContext(AuctionContext);

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: `${user.firstName} ${user.lastName}`,
      day: 0,
      hour: 0,
      minute: 3,
      second: 0,
      startPrice: 1,
      priceStep: 1,
      buyNowPrice: 1,
      realEstateID: propID,
    },

    validationSchema: validationCreateAuction,
    onSubmit: (values) => {
      console.log("Auction create data", values);
      handleSubmitAuction();
    },
  });

  console.log(checkExist);
  console.log("Value of formik", formik.values);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOpenUpdate = async () => {
    const res = await getAuctionByRealEstateID(propID);
    console.log(res);

    if (res.success) {
      formik.setFieldValue("startPrice", res.response.startPrice);
      formik.setFieldValue("priceStep", res.response.priceStep);
      formik.setFieldValue("buyNowPrice", res.response.buyNowPrice);
      formik.setFieldValue("day", res.response.day);
      formik.setFieldValue("hour", res.response.hour);
      formik.setFieldValue("minute", res.response.minute);
      formik.setFieldValue("second", res.response.second);
    }

    setOpen(true);
  };

  const handlePriceChange = (field, value) => {
    // Allow only numeric input and handle empty value
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);

    // Set the state
    setAuction((prevAuction) => ({
      ...prevAuction,
      [field]: isNaN(numericValue) ? "" : numericValue,
    }));
  };

  const handleDurationChange = (field, value, maxValue) => {
    // Allow only numbers
    const inputVal = value.replace(/[^0-9]/g, "");

    // Validate against maxValue
    const numericValue = parseInt(inputVal, 10);
    let validatedValue = isNaN(numericValue)
      ? ""
      : Math.min(numericValue, maxValue).toString();

    // Add leading zero if less than 10
    if (numericValue >= 0 && numericValue < 10) {
      validatedValue = `0${numericValue}`;
    }

    setAuction((prevAuction) => ({
      ...prevAuction,
      [field]: validatedValue,
    }));
  };
  console.log(property);

  const handleSubmitAuction = async () => {
    try {
      const checkExistAuction = await getAuctionByRealEstateID(propID);

      console.log(propID);

      if (checkExistAuction?.response) {
        const res = await updateAuction(
          checkExistAuction.response._id,
          formik.values
        );
        console.log(res);
        if (res.response) {
          const indexToUpdate = auctionLists.findIndex(
            (item) => item._id === res.response.realEstateID
          );
          if (indexToUpdate !== -1) {
            const updatedAuctionList = [...auctionLists];
            updatedAuctionList[indexToUpdate].status = "Requesting";
            setAuctionLists(updatedAuctionList);
          }
        }

        handleClose();
      } else {
        const res = await createAuction(formik.values);
        console.log(res);

        if (res.result) {
          // Find the index of the item with the same _id in the auctionList array
          const indexToUpdate = auctionLists.findIndex(
            (item) => item._id === res.result.realEstateID
          );

          // If the index is found, update the auctionList
          if (indexToUpdate !== -1) {
            const updatedAuctionList = [...auctionLists]; // Create a copy of the auctionList array
            updatedAuctionList[indexToUpdate].status = "Requesting"; // Update the item at the found index with the new result
            setAuctionLists(updatedAuctionList); // Update the state with the updated auctionList
          }
        }
        handleClose();
      }
    } catch (error) {
      console.log("Cannot create", error);
    }
  };

  const handleNavigate = async () => {
    try {
      const res = await getAuctionByRealEstateID(propID);

      let auctionID = "";

      if (res.response) {
        auctionID = res.response._id;
        nav(`/auction_detail/${auctionID}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAuctionByRealEstateID(propID);
      console.log(res);
      if (res?.success) {
        setAuction(res.response);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card elevation={2} sx={{ borderRadius: "12px" }}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <CardMedia
            title=""
            image={propImg}
            style={imgCard}
            sx={{
              filter: "brightness(0.9)",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 3,
              top: 8,
              right: 8,
              backgroundColor: "#FF0854",
              "&:hover": {
                backgroundColor: "#FF0854",
              },
            }}
          >
            <DeleteForeverIcon
              sx={{ color: "white", width: "20px", height: "20px" }}
            />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              zIndex: 3,
              bottom: 5,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "8px",
              borderRadius: "4px",
              background: "rgba(0, 0, 0, 0.60)",
              paddingX: "8px",
            }}
          >
            <StatusBall color={getStatusColor(status)} />
            <Typography
              variant="body1"
              color="white"
              fontWeight={500}
              fontSize={15}
              textTransform="uppercase"
              sx={{ marginLeft: "8px" }}
            >
              {status}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              zIndex: 3,
              bottom: 5,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              marginRight: "8px",
              borderRadius: "4px",
              background: "rgba(0, 0, 0, 0.60)",
              paddingX: "8px",
            }}
          >
            <Typography
              variant="body1"
              color="white"
              fontWeight={500}
              fontSize={15}
              textTransform="uppercase"
              sx={{}}
            >
              {propType}
            </Typography>
          </Box>
        </Box>
        <div className="prop-desc" style={{ paddingLeft: "15px" }}>
          <Typography
            variant="body1"
            color="initial"
            style={combinedStyles}
            fontSize={17}
          >
            {propStreet}, {propWard}, {propDistrict}, {propCity}
          </Typography>
          <Grid
            container
            className="specs"
            spacing={2}
            sx={{ marginTop: "1px" }}
          >
            <Grid item className="bedNum" style={{ display: "flex" }}>
              <BedIcon sx={{ mr: "10px" }} style={iconSize} />
              <Typography variant="body1" color="#48525B">
                {beds} beds
              </Typography>
            </Grid>
            <Grid item className="bathNum" style={{ display: "flex" }}>
              <BathtubIcon sx={{ mr: "10px" }} style={iconSize} />
              <Typography variant="body1" color="#48525B">
                {baths} baths
              </Typography>
            </Grid>
            <Grid item className="area" style={{ display: "flex" }}>
              <StraightenIcon sx={{ mr: "10px" }} style={iconSize} />
              <Typography variant="body1" color="#48525B">
                {area} m2
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            color="initial"
            fontSize={13}
            sx={{
              mt: "15px",
              width: "300px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 4, // Adjust the number of lines to your preference
            }}
          >
            {desc
              ? `Description: ${desc}`
              : "No Description For This Real Estate"}
          </Typography>
        </div>
        <div className="prop-price" style={{ marginTop: "15px" }}>
          <Box
            sx={{
              p: "20px 5px",
              borderTop: "1px solid #E2EAF2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {status === "Sold" ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  background: "#118BF4",
                  padding: "12px",
                  width: "95%",

                  fontWeight: "600",
                  "&:hover": {
                    background: "#118BF4",
                  },
                }}
                disabled={true}
              >
                Auction Sold
              </Button>
            ) : status === "Pending" ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  background: "#118BF4",
                  padding: "12px",
                  fontWeight: "600",
                  width: "95%",
                  "&:hover": {
                    background: "#118BF4",
                  },
                }}
                disabled={true}
              >
                Wait For Payment
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  background: "#118BF4",
                  width: "95%",
                  padding: "12px",
                  fontWeight: "600",
                  "&:hover": {
                    background: "#118BF4",
                  },
                }}
                onClick={() => {
                  switch (status) {
                    case "Available":
                    case "Rejected": {
                      handleOpen();
                      break;
                    }

                    case "In Auction": {
                      handleNavigate();
                      break;
                    }

                    case "Requesting": {
                      handleOpenUpdate();
                      break;
                    }

                    case "Not Start": {
                      // console.log(auction);
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                }}
              >
                {status === "Requesting"
                  ? "Update Auction"
                  : status === "In Auction"
                  ? "View Auction"
                  : status === "Not Start"
                  ? `Start At: ${moment(auction.startDate).format(
                      "HH:mm, DD/MM/YYYY"
                    )}`
                  : "Open Auction"}
              </Button>
            )}
          </Box>
        </div>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="close-btn"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "-10px",
            }}
          >
            <IconButton onClick={() => handleClose()}>
              <Close />
            </IconButton>
          </div>
          <div
            className="modal-content"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "-20px",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              fontSize={24}
              fontWeight={600}
            >
              Open Auction for this Property?
            </Typography>
            <Typography
              variant="body1"
              color="#85929E"
              fontSize={14}
              sx={{ mt: "8px" }}
            >
              After set property live for auction, the request will be sent to
              staffs for process
            </Typography>
            <div
              className="duration-input"
              style={{
                marginTop: "30px",
              }}
            >
              <Grid container flexDirection="row" spacing={5}>
                <Grid item>
                  <TextField
                    sx={fieldWidth}
                    name="day"
                    // value={auction.day}
                    value={formik.values.day}
                    onChange={formik.handleChange}
                    // onChange={(e) =>
                    //   handleDurationChange("day", e.target.value, 999)
                    // }
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      style: durationText,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="initial"
                    textAlign="center"
                    fontSize={14}
                    sx={{ mt: "10px" }}
                  >
                    DAYS
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    sx={fieldWidth}
                    // value={auction.hour}
                    // onChange={(e) =>
                    //   handleDurationChange("hour", e.target.value, 24)
                    // }
                    name="hour"
                    value={formik.values.hour}
                    onChange={formik.handleChange}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      style: durationText,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="initial"
                    textAlign="center"
                    fontSize={14}
                    sx={{ mt: "10px" }}
                  >
                    HOURS
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    sx={fieldWidth}
                    // value={auction.minute}
                    // onChange={(e) =>
                    //   handleDurationChange("minute", e.target.value, 59)
                    // }
                    name="minute"
                    value={formik.values.minute}
                    onChange={formik.handleChange}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      style: durationText,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="initial"
                    textAlign="center"
                    fontSize={14}
                    sx={{ mt: "10px" }}
                  >
                    MINS
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    sx={fieldWidth}
                    // value={auction.second}
                    // onChange={(e) =>
                    //   handleDurationChange("second", e.target.value, 59)
                    // }
                    name="second"
                    value={formik.values.second}
                    onChange={formik.handleChange}
                    inputProps={{
                      style: durationText,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="initial"
                    textAlign="center"
                    fontSize={14}
                    sx={{ mt: "10px" }}
                  >
                    SECS
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="price-input" style={{ marginTop: "30px" }}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    label="Starting price"
                    // value={auction.startPrice}
                    sx={{ width: "318px" }}
                    // onChange={(e) => {
                    //   handlePriceChange("startPrice", e.target.value);
                    // }}
                    name="startPrice"
                    value={formik.values.startPrice}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Price step *"
                    // value={auction.priceStep}
                    sx={{ width: "165px" }}
                    // onChange={(e) => {
                    //   handlePriceChange("priceStep", e.target.value);
                    // }}
                    name="priceStep"
                    value={formik.values.priceStep}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Buy-now price"
                // value={auction.buyNowPrice}
                sx={{ width: "500px", mt: "30px" }}
                // onChange={(e) => {
                //   handlePriceChange("buyNowPrice", e.target.value);
                // }}
                name="buyNowPrice"
                value={formik.values.buyNowPrice}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="error-info" style={{ float: "left" }}>
              {formik.touched.day && formik.errors.day && (
                <FormHelperText error>{formik.errors.day}</FormHelperText>
              )}
              {formik.touched.hour && formik.errors.hour && (
                <FormHelperText error>{formik.errors.hour}</FormHelperText>
              )}
              {formik.touched.minute && formik.errors.minute && (
                <FormHelperText error>{formik.errors.minute}</FormHelperText>
              )}
              {formik.touched.second && formik.errors.second && (
                <FormHelperText error>{formik.errors.second}</FormHelperText>
              )}
              {formik.touched.startPrice && formik.errors.startPrice && (
                <FormHelperText error>
                  {formik.errors.startPrice}
                </FormHelperText>
              )}
              {formik.touched.priceStep && formik.errors.priceStep && (
                <FormHelperText error>{formik.errors.priceStep}</FormHelperText>
              )}
              {formik.touched.buyNowPrice && formik.errors.buyNowPrice && (
                <FormHelperText error>
                  {formik.errors.buyNowPrice}
                </FormHelperText>
              )}
            </div>
            <Button
              // onClick={formik.handleSubmit}
              variant="contained"
              sx={{
                mt: "40px",
                bgcolor: "#F25D49",
                p: "17px 205px",
                "&:hover": {
                  bgcolor: "#F25D49",
                },
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "8px",
              }}
              onClick={formik.handleSubmit}
            >
              Set Auction
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MyListingCard;
