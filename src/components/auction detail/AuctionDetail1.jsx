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
import React, { useContext, useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useid, useNavigate, useParams } from "react-router-dom";
import { styled, width } from "@mui/system";
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
import axios from "axios";

import { AuthContext } from "../../context/auth.context";
import { createBid } from "../../service/bidService";
import { addAuctionToFavList } from "../../service/memberService";
import { getAuctionById } from "../../service/auctionService";
import { toast } from "react-toastify";
import { UserContext } from "../../context/user.context";
import { BidContext } from "../../context/bid.context";
import { setDetail, setProperties } from "../../redux/reducers/auctionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AuctionContext } from "../../context/auction.context";

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
  const dispatch = useDispatch();

  const property = useSelector((state) => state.auction.detail);

  const [isFavorite, setIsFavorite] = useState(false);
  const [joinList, setJoinList] = useState([]);
  const [info, setInfo] = useState({});
  const { currentPrice } = property;
  const [open, setOpen] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [bidPrice, setBidPrice] = useState(property?.currentPrice);
  const [paymentMethod, setPaymentMethod] = useState({
    value: "",
    img: "",
    balance: 0,
  });

  const { removeFromFavList } = useContext(UserContext);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleOpenPay = () => {
    setOpenPay(true);
  };

  const handleClosePay = () => {
    setOpenPay(false);
  };

  const handleDecrement = () => {
    setBidPrice(bidPrice - property.priceStep);
  };

  const handleIncrement = () => {
    setBidPrice(bidPrice + property.priceStep);
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

  let { id } = useParams();

  // let receiveData;

  // if (id.state) {
  //   if (id.state.prop) {
  //     // Data received as receiveData.prop
  //     receiveData = id.state.prop;
  //     console.log("normal", receiveData);
  //   } else if (id.state.prop.response) {
  //     // Data received as receiveData.prop.response
  //     receiveData = id.state.prop.response;
  //     console.log("aonther", receiveData);
  //   }
  // }

  const { user, accessToken, setUser, setIsOpenLogin } =
    useContext(AuthContext);

  const { setWinner, addToJoinList } = useContext(AuctionContext);

  const [checkAlreadyBid, setAlreadyBid] = useState(false);

  const [payNowBill, setPayNowBil] = useState({
    userID: user?._id,
    total: 100,
    auctionID: id,
  });

  const [bill, setBill] = useState({
    userID: user?._id,
    total: bidPrice,
    auctionID: id,
  });

  const { bidList, updateNewBid, setBidList, createBill } =
    useContext(BidContext);

  const propertyList = useSelector((state) => state.auction.properties);

  const userID = user ? user._id : null;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const bidData = {
    price: bidPrice,
    auctionID: id,
    userID: userID,
  };

  const addToFavListData = {
    _id: id,
  };

  // const addToFavListData = receiveData.prop._id;

  const checkFavorite = async () => {
    try {
      setIsFavorite(user.favoriteList.some((item) => item._id === id));
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(bidList)) {
      const check = bidList.find((item) => item?.auctionID?._id === id);
      setAlreadyBid(!!check); // Convert check result to a boolean value
    }
  }, [bidList, id]);

  const getAuctionInfoById = async () => {
    try {
      let res = null;
      res = await getAuctionById(id);
      dispatch(setDetail(res.data.response));
      setBidPrice(res.data.response.currentPrice);
      setJoinList(res.data.response.joinList);
    } catch (error) {
      console.error("Error fetching auction detail:", error);
    }
  };

  const handleAddAuctionToFavList = async () => {
    try {
      const res = await addAuctionToFavList(userID, addToFavListData, headers);

      console.log(res);
      if (res.data.success) {
        console.log("Add to list completed", res.data.response);
        toast.success("Add To Favorite List Successfully !!!");
        setUser(res.data.response);
        // handleClose();
        // navigate("/auctions");
      } else {
        toast.error("Add To Favorite List Failed !!!");
      }
    } catch (error) {
      console.error("Error placing Add to list:", error);
      toast.error("Add To Favorite List Failed !!!");
    }
  };

  const handleRemoveFromFavList = async () => {
    try {
      const res = await removeFromFavList(id);

      console.log(res);
      if (res.success) {
        setUser(res.response);
      }
    } catch (error) {
      console.error("Error Remove from list:", error);
    }
  };

  const handlePlaceBid = async () => {
    try {
      if (checkAlreadyBid) {
        const res = await updateNewBid(bidData);
        if (res.success) {
          dispatch(setDetail(res.response.auctionID));
          setBidList(res.response);
          toast.success("Bid completed successfully !!!");
          handleClose();

          const indexToUpdate = propertyList.findIndex(
            (item) => item._id === res.response.auctionID._id
          );

          // If the index is found, update the auctionList
          if (indexToUpdate !== -1) {
            console.log(res);
            const updatedAuctionList = [...propertyList];
            updatedAuctionList[indexToUpdate] = res.response.auctionID;
            dispatch(setProperties(updatedAuctionList));
          }
        } else {
          console.log("Bid failed");
          toast.error("Bid failed !!!");
        }
      } else {
        const res = await createBid(bidData, headers);
        console.log(res);
        if (res && res.data && res.data.success) {
          dispatch(setDetail(res.data.response.auctionID));
          setBidList([...bidList, res.data.response]);
          setAlreadyBid(true);
          toast.success("Bid completed successfully !!!");
          handleClose();

          const indexToUpdate = propertyList.findIndex(
            (item) => item._id === res.data.response.auctionID._id
          );

          // If the index is found, update the auctionList
          if (indexToUpdate !== -1) {
            console.log(res);
            const updatedAuctionList = [...propertyList];
            updatedAuctionList[indexToUpdate] = res.data.response.auctionID;
            dispatch(setProperties(updatedAuctionList));
          }
        } else {
          console.log("Bid failed");
          toast.error("Bid failed !!!");
        }
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error("Error placing bid. Please try again later.");
    }
  };

  const handleAddToJoinList = async () => {
    try {
      const dataPost = {
        auctionID: id,
        total: payNowBill.total * 24000,
        bankCode: "",
        language: "vn",
        payment: "VNPay",
      };

      const response = await createBill(dataPost);

      window.location.href = response.url;

      // const res = await addToJoinList(id);
      // console.log(res);
      // if (res.success) {
      //   dispatch(setDetail(res.response));
      //   setJoinList(res.response.joinList);
      //   toast.success("Join List successfully !!!");
      //   handleClosePay();

      //   const indexToUpdate = propertyList.findIndex(
      //     (item) => item._id === res.response._id
      //   );

      //   // If the index is found, update the auctionList
      //   if (indexToUpdate !== -1) {
      //     console.log(res);
      //     const updatedAuctionList = [...propertyList];
      //     updatedAuctionList[indexToUpdate] = res.response;
      //     dispatch(setProperties(updatedAuctionList));
      //   }
      // } else {
      //   toast.error("Join List Fail failed !!!");
      // }
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error("Error placing bid. Please try again later.");
    }
  };

  const handleSetWinner = async (type) => {
    try {
      await setWinner(id, user._id);
      if (type === "Buy Now") {
        toast.success("Buy Auction Successfully");
        handleCloseBuy();
      }
    } catch (error) {
      console.error("Set Winner Fail:", error);
    }
  };

  useEffect(() => {
    getAuctionInfoById();
    checkFavorite();
  }, [id]);

  console.log(user);

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
                  src={property?.realEstateID?.image[0]}
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
                  View {property?.realEstateID?.image.length} photo(s)
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
                {property?.realEstateID?.street}, {property?.realEstateID?.ward}
                , {property?.realEstateID?.district},{" "}
                {property?.realEstateID?.city}
              </Typography>
              <div className="property-specs">
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant="body1" color="initial" sx={specStyle}>
                      {property &&
                        property.realEstateID &&
                        property.realEstateID.bedRoom}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Beds
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="initial" sx={specStyle}>
                      {property &&
                        property.realEstateID &&
                        property.realEstateID.bathRoom}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Baths
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="initial" sx={specStyle}>
                      {property &&
                        property.realEstateID &&
                        property.realEstateID.size}
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
                {property?.realEstateID?.description}
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
                {property?.realEstateID?.street}, {property?.realEstateID?.ward}
                , {property?.realEstateID?.district},{" "}
                {property?.realEstateID?.city}{" "}
              </Typography>
              <div className="document-dsiplay" style={contentMarginStyle}>
                <Grid container spacing={4} rowSpacing={3}>
                  {property?.pdf?.map((doc) => (
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
                    {property &&
                      property.realEstateID &&
                      property.realEstateID.bedRoom}{" "}
                    Beds
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Baths
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {property &&
                      property.realEstateID &&
                      property.realEstateID.bathRoom}{" "}
                    Baths
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Size
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {property &&
                      property.realEstateID &&
                      property.realEstateID.size}{" "}
                    Sq. Meter
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Property ID
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {property.propID}
                  </Typography>
                </Grid> */}
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
                Agent:{" "}
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ marginLeft: "15px" }}
                >
                  {property?.realEstateID?.ownerID?.firstName?.toUpperCase()}{" "}
                  {property?.realEstateID?.ownerID?.lastName?.toUpperCase()}
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
                  (+84){property?.realEstateID?.ownerID?.phoneNumber}
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
                  {property?.realEstateID?.ownerID?.email}
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
                  maxHeight: "791px",
                  border: "1px solid #D1DEEA",
                  borderRadius: "16px",
                  px: "20px",
                  py: "40px",
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
                        {property.day < 10 ? "0" + property.day : property.day}
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
                        {property.hour < 10
                          ? "0" + property.hour
                          : property.hour}
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
                        {property.minute < 10
                          ? "0" + property.minute
                          : property.minute}
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
                        {property.second < 10
                          ? "0" + property.second
                          : property.second}
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
                        {property.startPrice > property.currentPrice
                          ? formattedValue(property.startPrice)
                          : formattedValue(property.currentPrice)}
                      </Typography>
                      <Typography variant="body1" color="initial" fontSize={20}>
                        {property.startPrice > property.currentPrice
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
                        {property && property.numberOfBidder}
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
                      {formattedValue(property.startPrice)}
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
                    {!user && (
                      <Grid item>
                        <Button
                          sx={{
                            background: "#F25D49",
                            textTransform: "none",
                            color: "white",
                            fontWeight: 600,
                            py: "19px",
                            px: "110px",
                            borderRadius: "8px",
                            fontSize: "15px",
                            "&:hover": {
                              background: "#F25D49",
                              textTransform: "none",
                              color: "white",
                            },
                          }}
                          disabled={true}
                          onClick={() => setIsOpenLogin(true)}
                        >
                          Login To Start Bidding
                        </Button>
                      </Grid>
                    )}

                    {user && (
                      <>
                        <Grid item>
                          {joinList.includes(user?._id) ? (
                            <Button
                              sx={{
                                background: "#F25D49",
                                textTransform: "none",
                                color: "white",
                                fontWeight: 600,
                                py: "19px",
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
                          ) : (
                            <Button
                              sx={{
                                background: "#F25D49",
                                textTransform: "none",
                                color: "white",
                                fontWeight: 600,
                                py: "19px",
                                px: "50px",
                                borderRadius: "8px",
                                fontSize: "15px",
                                "&:hover": {
                                  background: "#F25D49",
                                  textTransform: "none",
                                  color: "white",
                                },
                              }}
                              onClick={() => handleOpenPay()}
                            >
                              Pay {formattedValue(100)} To Start Bidding
                            </Button>
                          )}
                        </Grid>

                        <Grid item>
                          <Checkbox
                            sx={{
                              borderRadius: "8px",
                              border: "1px solid #F25D49",
                              py: "17px",
                              px: "20px",
                              width: "100%",
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
                            checked={
                              user &&
                              user.favoriteList.find((item) => item._id === id)
                            }
                            onClick={() => {
                              if (
                                user.favoriteList.find(
                                  (item) => item._id === id
                                )
                              ) {
                                handleRemoveFromFavList();
                              } else {
                                handleAddAuctionToFavList();
                              }
                            }}
                          />
                        </Grid>
                      </>
                    )}
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
                      width: "100%",
                      "&:hover": {
                        background: "#F25D49",
                        textTransform: "none",
                        color: "white",
                      },
                    }}
                    onClick={() => handleOpenBuy()}
                  >
                    Buy this property with{" "}
                    {formattedValue(property.buyNowPrice)}
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
                      width: "100%",
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
                      {property.day < 10 ? "0" + property.day : property.day}
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
                      {property.hour < 10 ? "0" + property.hour : property.hour}
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
                      {property.minute < 10
                        ? "0" + property.minute
                        : property.minute}
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
                      {property.second < 10
                        ? "0" + property.second
                        : property.second}
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
                              disabled={bidPrice === currentPrice}
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
                      value={formattedValue(property.priceStep)}
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
                onClick={() => handlePlaceBid()}
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
                Buy this Property?
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
                      {property.day < 10 ? "0" + property.day : property.day}
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
                      {property.hour < 10 ? "0" + property.hour : property.hour}
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
                      {property.minute < 10
                        ? "0" + property.minute
                        : property.minute}
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
                      {property.second < 10
                        ? "0" + property.second
                        : property.second}
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
                      label="Buy Price"
                      value={formattedValue(property.buyNowPrice)}
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
                        disabled={method.balance < property.buyPrice}
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
                onClick={() => {
                  handleSetWinner("Buy Now");
                }}
              >
                Buy now
              </Button>
            </div>
          </Box>
        </Modal>
      </div>

      <div className="buy-modal">
        <Modal
          open={openPay}
          onClose={handleClosePay}
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
              <IconButton onClick={() => handleClosePay()}>
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
                Pay To Join Auction
              </Typography>
              <Typography
                variant="body1"
                color="#85929E"
                fontSize={14}
                sx={{ mt: "8px" }}
              >
                Once you pay, you're committed to start bidding in this auction
              </Typography>
              <div
                className="duration-input"
                style={{
                  marginTop: "30px",
                }}
              ></div>
              <div className="price-input" style={{ marginTop: "30px" }}>
                <Grid container>
                  <Grid item>
                    <TextField
                      label="Price"
                      value={payNowBill.total}
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
                    >
                      {formattedValue(payNowBill.total)}
                    </TextField>
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
                        disabled={method.balance < property.buyPrice}
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
                onClick={() => {
                  handleAddToJoinList();
                }}
              >
                Pay now
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default AuctionDetail1;
