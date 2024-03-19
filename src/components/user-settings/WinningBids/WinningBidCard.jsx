import { CheckBox, Close } from "@mui/icons-material";
import {
  Alert,
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
  Snackbar,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuctionContext } from "../../../context/auction.context";
import { toast } from "react-toastify";
import { BidContext } from "../../../context/bid.context";
import { UserContext } from "../../../context/user.context";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../../../redux/reducers/auctionSlice";
import { setSearchResults } from "../../../redux/reducers/searchAuctionSlice";
import { RealEstateContext } from "../../../context/real-estate.context";
import { methodList } from "../../auction detail/AuctionDetail1";

const colorBall = {
  width: "12px",
  height: "12px",
  borderRadius: "10px",
  backgroundColor: "#F2A23B",
};

const imgCard = {
  width: "320px",
  height: "180px",
};

const address = {
  width: "300px",
  height: "50px",
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

const descSpacing = {
  marginTop: "5px",
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

const CurrencyFormatter = ({ amount }) => {
  // Ensure amount is a number
  const formattedAmount = Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Typography variant="body1" color="initial" fontWeight={600} fontSize={18}>
      {formattedAmount}
    </Typography>
  );
};

const WinningBidCard = ({
  propImg,
  imgList,
  propType,
  name,
  propAddress,
  days,
  hours,
  mins,
  secs,
  startingBid,
  currentBid,
  isFav,
  beds,
  baths,
  area,
  propID,
  realEstateID,
}) => {
  const nav = useNavigate();

  const [checkPay, setCheckPay] = useState(false);

  const { checkAlreadyPay } = useContext(AuctionContext);

  const { payMoney, userWallet, setUserWallet } = useContext(UserContext);

  const { closeRealEstate } = useContext(RealEstateContext);

  const { createBill, createNewBill } = useContext(BidContext);

  const [openModal, setOpenModel] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState({
    value: "",
    img: "",
    balance: 0,
  });

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

  console.log(realEstateID);

  const handleSelectedChange = (event) => {
    const selectedMethodValue = event.target.value;
    const selectedMethod = methodList.find(
      (method) => method.value === selectedMethodValue
    );

    setPaymentMethod({
      value: selectedMethod?.value,
      img: selectedMethod?.img,
      balance: selectedMethod?.balance,
    });
  };

  const handlePayWinningAuction = async () => {
    try {
      const res = await payMoney(currentBid);
      if (res.success) {
        setUserWallet(res.response);
        const close = await closeRealEstate(realEstateID);

        console.log(close);

        if (close.success) {
          const dataPost = {
            auctionID: propID,
            total: currentBid,
            payment: "VNPay",
            type: "Pay Winning Auction",
          };
          setCheckPay(true);
          setOpenModel(false);
          toast.success("Pay Winning Auction Successfully!!");
          const createBill = await createNewBill(dataPost);

          console.log(createBill);
        }

        // if (close.success) {
        //   const indexToUpdate = auctionList.findIndex(
        //     (item) => item._id === res.response._id
        //   );

        //   // If the index is found, update the auctionList
        //   if (indexToUpdate !== -1) {
        //     console.log(close);
        //     const updatedAuctionList = [...auctionList];
        //     updatedAuctionList[indexToUpdate] = close.response;
        //     dispatch(setProperties(updatedAuctionList));
        //     dispatch(setSearchResults(updatedAuctionList));
        //   }
        // }
      }
    } catch (error) {
      console.error("Error Pay Winning:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const check = await checkAlreadyPay(propID);

      console.log(check);

      setCheckPay(check.response);
    };

    fetchData();
  }, []);

  console.log(currentBid);

  return (
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
        <Checkbox
          icon={
            <FavoriteIcon
              sx={{ color: "#EF272C", width: "30px", height: "30px" }}
            />
          }
          checkedIcon={
            <FavoriteBorderIcon
              sx={{ color: "white", width: "30px", height: "30px" }}
            />
          }
          sx={{ position: "absolute", zIndex: 3, top: 0, right: 0 }}
        />
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
          <div className="yellow-ball" style={colorBall}></div>
          <Typography
            variant="body1"
            color="white"
            fontWeight={500}
            fontSize={15}
            textTransform="uppercase"
            sx={{ marginLeft: "8px" }}
          >
            {propType}
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
            fontSize={12}
            textTransform="uppercase"
            sx={{}}
          >
            1/{imgList}
          </Typography>
        </Box>
      </Box>
      <div className="prop-desc" style={{ paddingLeft: "15px" }}>
        <Typography
          variant="body1"
          color="#48525B"
          fontSize={14}
          style={descSpacing}
        >
          Listed by {name}
        </Typography>
        <Typography
          variant="body1"
          color="initial"
          style={combinedStyles}
          fontSize={17}
          marginBottom={"15px"}
        >
          {propAddress}
        </Typography>
        <Grid container className="specs" spacing={2} sx={{ marginTop: "1px" }}>
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
        <div
          className="timer-box"
          style={{ display: "flex", marginTop: "10px" }}
        >
          <TimelapseIcon style={{ color: "#F25D49" }} />
          <Grid container spacing={1} sx={{ marginLeft: "1px" }}>
            <Grid item flexDirection="column">
              <Typography
                variant="body1"
                color="initial"
                fontWeight={600}
                fontSize={20}
                textAlign="center"
              >
                {days < 10 ? "0" + days : days}
              </Typography>
              <Typography variant="body1" color="#48525B">
                Days
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="initial">
                :
              </Typography>
            </Grid>
            <Grid item flexDirection="column">
              <Typography
                variant="body1"
                color="initial"
                fontWeight={600}
                fontSize={20}
                textAlign="center"
              >
                {hours < 10 ? "0" + hours : hours}
              </Typography>
              <Typography variant="body1" color="#48525B">
                Hours
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="initial">
                :
              </Typography>
            </Grid>
            <Grid item flexDirection="column">
              <Typography
                variant="body1"
                color="initial"
                fontWeight={600}
                fontSize={20}
                textAlign="center"
              >
                {mins < 10 ? "0" + mins : mins}
              </Typography>
              <Typography variant="body1" color="#48525B">
                Mins
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="initial">
                :
              </Typography>
            </Grid>
            <Grid item flexDirection="column">
              <Typography
                variant="body1"
                color="initial"
                fontWeight={600}
                fontSize={20}
                textAlign="center"
              >
                {secs < 10 ? "0" + secs : secs}
              </Typography>
              <Typography variant="body1" color="#48525B">
                Secs
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="prop-price" style={{ marginTop: "25px" }}>
        <Box sx={{ p: "10px 15px", borderTop: "1px solid #E2EAF2" }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  background: "#118BF4",
                  padding: "12px 20px",
                  fontWeight: "600",
                }}
                onClick={() => nav(`/auction_detail/${propID}`)}
              >
                View Details
              </Button>
            </Grid>
            <Grid item>
              {checkPay ? (
                <Typography
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    fontWeight: "600",
                  }}
                >
                  Already Paid
                </Typography>
              ) : (
                <Button
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    padding: "12px 0",
                    fontWeight: "600",
                  }}
                  onClick={() => setOpenModel(true)}
                >
                  Pay Winning Auction
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>

      {openModal ? (
        <div className="buy-modal">
          <Modal
            open={openModal}
            onClose={() => setOpenModel(false)}
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
                <IconButton onClick={() => setOpenModel(false)}>
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
                  Once you pay, you're committed to start bidding in this
                  auction
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
                        value={currentBid}
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
                        {formattedValue(currentBid)}
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
                          disabled={userWallet?.balance < currentBid}
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
                                <CardMedia
                                  component="img"
                                  src={method.img}
                                  sx={{ width: "60px", height: "40px" }}
                                />
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
                                    {formattedValue(userWallet?.balance)}
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
                    handlePayWinningAuction();
                  }}
                  disabled={paymentMethod?.value === ""}
                >
                  Pay now
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WinningBidCard;
