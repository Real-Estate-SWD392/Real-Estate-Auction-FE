import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { detailProp } from "./detailProp";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import money_icon from "../../assets/img/detail_money_icon.png";
import nomoney_icon from "../../assets/img/detail_nomoney_icon.png";
import warning_icon from "../../assets/img/detail_warning_icon.png";
import AppsIcon from "@mui/icons-material/Apps";
import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import vnpay from "../../assets/img/Logo_VNPAY.jpg";
import momo from "../../assets/img/Vi-MoMo-new.jpg";

const specStyle = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: 600,
};

const titleSpecStyle = {
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: "20px",
};

const sectionMarginStyle = {
  marginTop: "50px",
};

const contentMarginStyle = {
  marginTop: "10px",
};

const durationStyle = {
  textAlign: "center",
  fontWeight: 600,
  fontSize: "30px",
};

const dotsStyle = {
  fontSize: "25px",
  fontWeight: 600,
};

const CustomDivider = styled("div")({
  height: "80px",
  width: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

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

export const methodList = [
  {
    value: "VNPay Wallet",
    img: vnpay,
    balance: 60000,
  },
  {
    value: "Momo Wallet",
    img: momo,
    balance: 40000,
  },
  {
    value: "Choose another wallet",
    img: "",
    balance: 100000000000000,
  },
];

const AuctionDetail1 = () => {
  const { currentBid } = detailProp;
  const [open, setOpen] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [bidPrice, setBidPrice] = useState(currentBid);
  const [paymentMethod, setPaymentMethod] = useState({
    value: "",
    img: "",
    balance: 0,
  });

  const handleSelectedChange = (event) => {
    const selectedMethodValue = event.target.value;
    const selectedMethod = methodList.find(
      (method) => method.value === selectedMethodValue
    );

    setPaymentMethod({
      value: selectedMethod.value,
      img: selectedMethod.img,
      balance: selectedMethod.balance,
    });

    console.log(paymentMethod);
  };

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenBuy = () => {
    setOpenBuy(true);
  };

  const handleCloseBuy = () => {
    setOpenBuy(false);
  };

  const handleDecrement = () => {
    setBidPrice(bidPrice - detailProp.priceStep);
  };

  const handleIncrement = () => {
    setBidPrice(bidPrice + detailProp.priceStep);
  };

  const formattedValue = (value) => {
    // Ensure the input is a valid number
    if (typeof value !== "number" || isNaN(value)) {
      return "Invalid input";
    }

    // Use Intl.NumberFormat to format the number as US currency
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return formattedAmount;
  };
  return (
    <Box sx={{ background: "white" }}>
      <div
        className="action-btn"
        style={{
          width: "750px",
          marginLeft: "150px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => navigate("/auctions")}
          startIcon={
            <ArrowBackIosNewIcon sx={{ width: "15px", height: "15px" }} />
          }
          sx={{ textTransform: "none", marginTop: "30px" }}
        >
          Back to Search
        </Button>
        <Button
          sx={{
            textTransform: "none",
            marginTop: "30px",
            textDecoration: "underline",
            "&:hover": {
              background: "white",
              textDecoration: "underline",
            },
          }}
        >
          Not legitimate? Report this Auction
        </Button>
      </div>
      <div className="detail-component" style={{ marginTop: "15px" }}>
        <Grid container justifyContent="center" spacing={6}>
          <Grid item sx={{ width: "820px" }}>
            <div className="property-image">
              <Card
                sx={{
                  width: "100%",
                  height: "450px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#DDDDDD",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  src={detailProp.propImg}
                  sx={{
                    height: "100%",
                    width: "calc(100% - 70px)",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  startIcon={<AppsIcon />}
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    background: "rgb(0,0,0,0.6)",
                    textTransform: "none",
                    color: "white",
                    px: "15px",
                    py: "10px",
                    fontSize: "15px",
                    "&:hover": {
                      background: "rgb(0,0,0,0.6)",
                      color: "white",
                    },
                  }}
                >
                  View {detailProp.imgList} photo(s)
                </Button>
              </Card>
            </div>
            <div
              className="property-address"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontSize={22}
                fontWeight={600}
                sx={{ width: "450px" }}
              >
                {detailProp.propAddress}
              </Typography>
              <div className="property-specs">
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant="body1" color="initial" sx={specStyle}>
                      {detailProp.beds}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Beds
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="initial" sx={specStyle}>
                      {detailProp.baths}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Baths
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="initial" sx={specStyle}>
                      {detailProp.area}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Square meter
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="property-desc" style={sectionMarginStyle}>
              <Typography variant="body1" color="initial" sx={titleSpecStyle}>
                Description
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ width: "100%" }}
              >
                {detailProp.desc}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={contentMarginStyle}
              >
                Occupied auction, Sold As Is, Trustee deed will be recorded
                prior to sale deed.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "#F4F7FA",
                  borderRadius: "8px",
                  py: "20px",
                  pl: "20px",
                  pr: "100px",
                }}
                style={contentMarginStyle}
              >
                <RemoveCircleOutlineIcon
                  sx={{ width: "40px", height: "40px", color: "#F25D49" }}
                />
                <div className="" style={{ marginLeft: "25px" }}>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Occupied - Do Not Disturb
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    sx={{ marginTop: "5px" }}
                  >
                    Attempting to inspect or visit an occupied property may be
                    considered trespassing.
                  </Typography>
                </div>
              </Box>
            </div>
            <div className="property-documents" style={sectionMarginStyle}>
              <Typography variant="body1" color="initial" sx={titleSpecStyle}>
                Documents
              </Typography>
              <Typography variant="body1" color="initial" sx={{}}>
                The following documents are available for{" "}
                {detailProp.propAddress}
              </Typography>
              <div className="document-dsiplay" style={contentMarginStyle}>
                <Grid container spacing={4} rowSpacing={3}>
                  {detailProp.docs.map((doc) => (
                    <Grid item sx={{ display: "flex" }}>
                      <PictureAsPdfIcon sx={{ color: "#F25D49" }} />
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ marginLeft: "10px" }}
                      >
                        {doc}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <div className="property-details" style={sectionMarginStyle}>
              <Typography variant="body1" color="initial" sx={titleSpecStyle}>
                Property Details
              </Typography>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Beds
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {detailProp.beds} Beds
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Baths
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {detailProp.baths} Baths
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Size
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {detailProp.area} Sq. Meter
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Property ID
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {detailProp.propID}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="list-by" style={sectionMarginStyle}>
              <Typography variant="body1" color="initial" sx={titleSpecStyle}>
                Listed By
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ display: "flex" }}
              >
                Agent{" "}
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ marginLeft: "15px" }}
                >
                  {detailProp.name.toUpperCase()}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ display: "flex" }}
              >
                Phone Number:{" "}
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ marginLeft: "5px" }}
                >
                  (+84){detailProp.phoneNumber}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ display: "flex" }}
              >
                Contact Email:{" "}
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ marginLeft: "5px" }}
                >
                  {detailProp.email}
                </Typography>
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div className="auction-specs">
              <Card
                elevation={0}
                sx={{
                  width: "432px",
                  height: "791px",
                  border: "1px solid #D1DEEA",
                  borderRadius: "16px",
                  px: "20px",
                  pt: "50px",
                }}
              >
                <div className="countdown-timer">
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        fontWeight={600}
                        fontSize={30}
                        textAlign="center"
                      >
                        {detailProp.days < 10
                          ? "0" + detailProp.days
                          : detailProp.days}
                      </Typography>
                      <Typography variant="body1" color="#48525B" fontSize={18}>
                        Days
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={25}
                        fontWeight={600}
                      >
                        :
                      </Typography>
                    </Grid>
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        fontWeight={600}
                        fontSize={30}
                        textAlign="center"
                      >
                        {detailProp.hours < 10
                          ? "0" + detailProp.hours
                          : detailProp.hours}
                      </Typography>
                      <Typography variant="body1" color="#48525B" fontSize={18}>
                        Hours
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={25}
                        fontWeight={600}
                      >
                        :
                      </Typography>
                    </Grid>
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        fontWeight={600}
                        fontSize={30}
                        textAlign="center"
                      >
                        {detailProp.mins < 10
                          ? "0" + detailProp.mins
                          : detailProp.mins}
                      </Typography>
                      <Typography variant="body1" color="#48525B" fontSize={18}>
                        Mins
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={25}
                        fontWeight={600}
                      >
                        :
                      </Typography>
                    </Grid>
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        fontWeight={600}
                        fontSize={30}
                        textAlign="center"
                      >
                        {detailProp.secs < 10
                          ? "0" + detailProp.secs
                          : detailProp.secs}
                      </Typography>
                      <Typography variant="body1" color="#48525B" fontSize={18}>
                        Secs
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <div className="auction-stats" style={{ marginTop: "24px" }}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}
                  >
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={45}
                        fontWeight={600}
                      >
                        {detailProp.startingBid > detailProp.currentBid
                          ? formattedValue(detailProp.startingBid)
                          : formattedValue(detailProp.currentBid)}
                      </Typography>
                      <Typography variant="body1" color="initial" fontSize={20}>
                        {detailProp.startingBid > detailProp.currentBid
                          ? "Starting Bid"
                          : "Current Bid"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <CustomDivider />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={30}
                        fontWeight={600}
                      >
                        {detailProp.bidders}
                      </Typography>
                      <Typography variant="body1" color="initial" fontSize={12}>
                        Bidders
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <div
                  className="auction-price"
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      background: "#FAFAFA",
                      py: "16px",
                      px: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "370px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Starting Price
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontWeight={600}
                    >
                      {formattedValue(detailProp.startingBid)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      py: "16px",
                      px: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "370px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Bid Deposit
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontWeight={600}
                    >
                      Required
                    </Typography>
                  </Box>
                </div>
                <div className="note" style={{ marginTop: "40px" }}>
                  <Typography variant="body1" color="#607178">
                    Note: The seller may choose to negotiate with bidders even
                    if the reserve price isn't met.
                  </Typography>
                </div>
                <div className="button-action" style={{ marginTop: "30px" }}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={2}
                    justifyContent="center"
                  >
                    <Grid item>
                      <Button
                        sx={{
                          background: "#F25D49",
                          textTransform: "none",
                          color: "white",
                          fontWeight: 600,
                          py: "17px",
                          px: "110px",
                          borderRadius: "8px",
                          fontSize: "15px",
                          "&:hover": {
                            background: "#F25D49",
                            textTransform: "none",
                            color: "white",
                          },
                        }}
                        onClick={() => handleOpen()}
                      >
                        Place Bid
                      </Button>
                    </Grid>
                    <Grid item>
                      <Checkbox
                        sx={{
                          borderRadius: "8px",
                          border: "1px solid #F25D49",
                          py: "17px",
                          px: "20px",
                        }}
                        icon={
                          <FavoriteBorderIcon
                            sx={{
                              color: "#EF272C",
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        }
                        checkedIcon={
                          <FavoriteIcon
                            sx={{
                              color: "#EF272C",
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                  <div
                    className="divider"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <Divider>
                      <Typography variant="body1" color="#607178" fontSize={13}>
                        or
                      </Typography>
                    </Divider>
                  </div>
                  <Button
                    sx={{
                      background: "#F25D49",
                      textTransform: "none",
                      color: "white",
                      fontWeight: 600,
                      py: "17px",
                      px: "75px",
                      borderRadius: "8px",
                      fontSize: "15px",
                      "&:hover": {
                        background: "#F25D49",
                        textTransform: "none",
                        color: "white",
                      },
                    }}
                    onClick={() => handleOpenBuy()}
                  >
                    Buy this property with {formattedValue(detailProp.buyPrice)}
                  </Button>
                  <Button
                    sx={{
                      background: "#44A9FF",
                      textTransform: "none",
                      color: "white",
                      fontWeight: 600,
                      py: "17px",
                      px: "96px",
                      borderRadius: "8px",
                      fontSize: "15px",
                      "&:hover": {
                        background: "#44A9FF",
                        textTransform: "none",
                        color: "white",
                      },
                      marginTop: "15px",
                    }}
                  >
                    Chat with Property Owner
                  </Button>
                </div>
              </Card>
              <Card
                elevation={0}
                sx={{
                  width: "432px",
                  border: "1px solid #D1DEEA",
                  borderRadius: "16px",
                  px: "10px",
                  marginTop: "40px",
                  py: "23px",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  justifyContent="center"
                >
                  <Grid item>
                    <CardMedia
                      component="img"
                      src={money_icon}
                      sx={{ width: "45px", height: "54px" }}
                    />
                  </Grid>
                  <Grid item sx={{ width: "320px" }}>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={14}
                      fontWeight={600}
                    >
                      Cash Only Sale
                    </Typography>
                    <Typography variant="body1" color="initial" fontSize={14}>
                      Cash Purchase Only. Conventional financing is not
                      available; financing contingency not offered.
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
              <Card
                elevation={0}
                sx={{
                  width: "432px",
                  border: "1px solid #D1DEEA",
                  borderRadius: "16px",
                  px: "10px",
                  marginTop: "20px",
                  py: "23px",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  justifyContent="center"
                >
                  <Grid item>
                    <CardMedia
                      component="img"
                      src={nomoney_icon}
                      sx={{ width: "45px", height: "46px" }}
                    />
                  </Grid>
                  <Grid item sx={{ width: "320px" }}>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={14}
                      fontWeight={600}
                    >
                      No Buyers Premium
                    </Typography>
                    <Typography variant="body1" color="initial" fontSize={14}>
                      This property is not subject to a buyer's premium.
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
              <Card
                elevation={0}
                sx={{
                  width: "432px",
                  border: "1px solid #D1DEEA",
                  borderRadius: "16px",
                  px: "10px",
                  marginTop: "20px",
                  py: "23px",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  justifyContent="center"
                >
                  <Grid item>
                    <CardMedia
                      component="img"
                      src={warning_icon}
                      sx={{ width: "45px", height: "54px" }}
                    />
                  </Grid>
                  <Grid item sx={{ width: "320px" }}>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={14}
                      fontWeight={600}
                    >
                      Special Servicing Conditions Apply
                    </Typography>
                    <Typography variant="body1" color="initial" fontSize={14}>
                      Bid review required. Sold subject to seller approval.
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="bid-modal">
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
                Bid this Property?
              </Typography>
              <Typography
                variant="body1"
                color="#85929E"
                fontSize={14}
                sx={{ mt: "8px" }}
              >
                Once you bid, you're committed to buy this property without
                waiting
              </Typography>
              <div
                className="duration-input"
                style={{
                  marginTop: "30px",
                }}
              >
                <Grid container flexDirection="row" spacing={4}>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.days < 10
                        ? "0" + detailProp.days
                        : detailProp.days}
                    </Typography>
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
                    <Typography
                      variant="body1"
                      color="initial"
                      style={dotsStyle}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.hours < 10
                        ? "0" + detailProp.hours
                        : detailProp.hours}
                    </Typography>
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
                    <Typography
                      variant="body1"
                      color="initial"
                      style={dotsStyle}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.mins < 10
                        ? "0" + detailProp.mins
                        : detailProp.mins}
                    </Typography>
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
                    <Typography
                      variant="body1"
                      color="initial"
                      style={dotsStyle}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.secs < 10
                        ? "0" + detailProp.secs
                        : detailProp.secs}
                    </Typography>
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
                      label="Place your bid"
                      value={formattedValue(bidPrice)}
                      sx={{ width: "318px" }}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment>
                            <IconButton
                              onClick={() => handleDecrement()}
                              disabled={bidPrice === currentBid}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment>
                            <IconButton onClick={() => handleIncrement()}>
                              <AddIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: {
                          borderRadius: "8px",
                        },
                      }}
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Price step"
                      value={formattedValue(detailProp.priceStep)}
                      sx={{ width: "165px" }}
                      InputProps={{
                        readOnly: "true",
                        style: {
                          borderRadius: "8px",
                        },
                      }}
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <FormControl sx={{ width: "498px", mt: "20px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Select payment method
                  </InputLabel>
                  <Select
                    value={paymentMethod.value}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select payment method"
                    sx={{ borderRadius: "8px" }}
                    onChange={handleSelectedChange}
                  >
                    {methodList.map((method, index) => (
                      <MenuItem
                        key={index}
                        disabled={method.balance < bidPrice}
                        value={method.value}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: "10px 10px",
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              {method.value === "Choose another wallet" ? (
                                ""
                              ) : (
                                <CardMedia
                                  component="img"
                                  src={method.img}
                                  sx={{ width: "60px", height: "40px" }}
                                />
                              )}
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body1"
                                color="initial"
                                fontWeight={500}
                              >
                                {method.value}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item>
                              {method.value === "Choose another wallet" ? (
                                ""
                              ) : (
                                <Typography
                                  variant="body1"
                                  color="initial"
                                  fontWeight={600}
                                >
                                  Available balance
                                </Typography>
                              )}
                            </Grid>
                            <Grid item>
                              {method.value === "Choose another wallet" ? (
                                ""
                              ) : (
                                <Typography variant="body1" color="initial">
                                  {formattedValue(method.balance)}
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button
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
                onClick={() => handleClose()}
              >
                Place bid
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="buy-modal">
        <Modal
          open={openBuy}
          onClose={handleCloseBuy}
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
              <IconButton onClick={() => handleCloseBuy()}>
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
                Bid this Property?
              </Typography>
              <Typography
                variant="body1"
                color="#85929E"
                fontSize={14}
                sx={{ mt: "8px" }}
              >
                Once you buy, you're committed to buy this property without
                waiting
              </Typography>
              <div
                className="duration-input"
                style={{
                  marginTop: "30px",
                }}
              >
                <Grid container flexDirection="row" spacing={4}>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.days < 10
                        ? "0" + detailProp.days
                        : detailProp.days}
                    </Typography>
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
                    <Typography
                      variant="body1"
                      color="initial"
                      style={dotsStyle}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.hours < 10
                        ? "0" + detailProp.hours
                        : detailProp.hours}
                    </Typography>
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
                    <Typography
                      variant="body1"
                      color="initial"
                      style={dotsStyle}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.mins < 10
                        ? "0" + detailProp.mins
                        : detailProp.mins}
                    </Typography>
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
                    <Typography
                      variant="body1"
                      color="initial"
                      style={dotsStyle}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={durationStyle}
                    >
                      {detailProp.secs < 10
                        ? "0" + detailProp.secs
                        : detailProp.secs}
                    </Typography>
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
                <Grid container>
                  <Grid item>
                    <TextField
                      label="Buy price"
                      value={formattedValue(detailProp.buyPrice)}
                      sx={{ width: "495px" }}
                      InputProps={{
                        readOnly: "true",
                        style: {
                          borderRadius: "8px",
                        },
                      }}
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <FormControl sx={{ width: "498px", mt: "20px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Select payment method
                  </InputLabel>
                  <Select
                    value={paymentMethod.value}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select payment method"
                    sx={{ borderRadius: "8px" }}
                    onChange={handleSelectedChange}
                  >
                    {methodList.map((method, index) => (
                      <MenuItem
                        key={index}
                        disabled={method.balance < detailProp.buyPrice}
                        value={method.value}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: "10px 10px",
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              {method.value === "Choose another wallet" ? (
                                ""
                              ) : (
                                <CardMedia
                                  component="img"
                                  src={method.img}
                                  sx={{ width: "60px", height: "40px" }}
                                />
                              )}
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body1"
                                color="initial"
                                fontWeight={500}
                              >
                                {method.value}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item>
                              {method.value === "Choose another wallet" ? (
                                ""
                              ) : (
                                <Typography
                                  variant="body1"
                                  color="initial"
                                  fontWeight={600}
                                >
                                  Available balance
                                </Typography>
                              )}
                            </Grid>
                            <Grid item>
                              {method.value === "Choose another wallet" ? (
                                ""
                              ) : (
                                <Typography variant="body1" color="initial">
                                  {formattedValue(method.balance)}
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button
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
                onClick={() => handleCloseBuy()}
              >
                Buy now
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default AuctionDetail1;
