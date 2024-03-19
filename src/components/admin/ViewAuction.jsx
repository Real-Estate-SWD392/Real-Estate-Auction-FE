import {
  Grid,
  CardMedia,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Modal,
} from "@mui/material";
import { styled, width } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { AuctionContext } from "../../context/auction.context";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDetail } from "../../redux/reducers/auctionSlice";
import { getAuctionById } from "../../service/auctionService";
import moment from "moment";
import Loading from "../loading/Loading";

export const imageList = [
  "https://i.pinimg.com/236x/fd/61/a6/fd61a615014a6321bfc01b3211238ddf.jpg",
  "https://i.pinimg.com/236x/b6/34/50/b63450fc49b107561f290b2a5e1fc591.jpg",
  "https://i.pinimg.com/236x/6a/0c/e1/6a0ce129c802a1a25d77b230116a015e.jpg",
  "https://i.pinimg.com/236x/d0/96/7f/d0967ffd8eefeadb839541f60e53a804.jpg",
  "https://i.pinimg.com/236x/3f/8e/0b/3f8e0b673221f847532a38f168224aa6.jpg",
];

const specStyle = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: 600,
};

const filterType = [
  {
    name: "All",
    // amount: statusCount.all,
    background: "#222B36",
    color: "white",
  },
  {
    name: "In Auction",
    // amount: statusCount.active,
    background: "rgb(57,143,95, 0.1)",
    color: "rgb(57,143,95)",
  },
  {
    name: "Requesting",
    // amount: statusCount.pending,
    background: "rgb(249, 168, 29, 0.1)",
    color: "rgb(249, 168, 29)",
  },

  {
    name: "Appointed",
    // amount: statusCount.notstart,
    background: "rgb(255, 190, 152,0.1)",
    color: "rgb(255, 190, 152)",
  },

  {
    name: "Cancel",
    // amount: statusCount.rejected,
    background: "rgb(182, 43, 41, 0.1)",
    color: "rgb(182, 43, 41)",
  },
  {
    name: "End",
    // amount: statusCount.ended,
    background: "rgb(105, 120, 133, 0.1)",
    color: "rgb(105, 120, 133)",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
};

const auctionStatus = "In Auction";

const documentList = [
  "SWD Documents.pdf",
  "CoolBackgrounds.pdf",
  "Introduction into Auction Property.pdf",
  "HTML,CSS,JS guide book.pdf",
];

const ViewAuction = () => {
  const auction = useSelector((state) => state.auction.detail);

  const [selectedImage, setSelectedImage] = useState(null);

  const [auctionNoCount, setAuctionNoCount] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [openDocumentList, setOpenDocumentList] = useState(false);

  // const { getAuctionById } = useContext(AuctionContext);

  const { id } = useParams();

  const dispatch = useDispatch();

  const handleOpenDocuments = () => {
    setOpenDocumentList(true);
  };

  const handleCloseDocuments = () => {
    setOpenDocumentList(false);
  };

  const handleImageChange = (img) => {
    setSelectedImage(img);
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

  const getAuctionInfoById = async () => {
    try {
      const res = await getAuctionById(id);

      console.log(res.data.response);

      if (res.data.success) {
        if (res.data.response.status === "In Auction") {
          dispatch(setDetail(res.data.response));
        } else {
          setAuctionNoCount(res.data.response);
        }
      }
    } catch (error) {
      console.error("Error fetching auction detail:", error);
    }
  };

  useEffect(() => {
    getAuctionInfoById();
  }, []);

  if (isLoading) {
    return <Loading setIsLoading={setIsLoading} />;
  }

  if (!isLoading && auctionNoCount) {
    return (
      <div style={{ marginLeft: "50px", marginBottom: "20px" }}>
        <div className="auction-content">
          <Typography
            variant="body1"
            color="initial"
            fontSize={26}
            fontWeight={600}
          >
            Auction Detail
          </Typography>
          <div className="auction-info" style={{ marginTop: "50px" }}>
            <Grid container spacing={1}>
              <Grid item sx={{ width: "550px" }}>
                <CardMedia
                  title=""
                  image={
                    selectedImage
                      ? selectedImage
                      : auction?.realEstateID?.image[0]
                  }
                  sx={{ width: "100%", height: "520px", borderRadius: "15px" }}
                />
                <div
                  className="img-slide"
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  <Grid container justifyContent="space-between">
                    {auction?.realEstateID?.image?.map((img, key) => (
                      <Grid item>
                        <img
                          src={img}
                          alt=""
                          onClick={() => handleImageChange(img)}
                          style={{
                            width: "80px",
                            height: "73px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Grid>
              <Grid item sx={{ width: "570px", marginLeft: "30px" }}>
                <div className="auction-stats" style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={6}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      {/* <Chip
                    label={auctionStatus}
                    style={{
                      background: filterType.find(
                        (item) => item.name === auctionStatus
                      )?.background,

                      fontWeight: 600,
                      color: filterType.find(
                        (item) => item.name === auctionStatus
                      )?.color,
                      // fontSize: "26px",
                    }}
                  /> */}
                      <div
                        className="chip"
                        style={{
                          background: filterType.find(
                            (item) => item.name === auction?.status
                          )?.background,

                          fontWeight: 600,
                          color: filterType.find(
                            (item) => item.name === auction?.status
                          )?.color,
                          fontSize: "20px",
                          borderRadius: "16px",
                          padding: "5px 18px",
                        }}
                      >
                        {auction?.status}
                      </div>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="#B2B1B1"
                        fontWeight={600}
                      >
                        Request was sent on{" "}
                        {moment(auction?.createdAt).format("DD-MM-YYYY")}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <Divider sx={{ margin: "15px 0" }}>
                  <span style={{ fontSize: "16px" }}>Property Details</span>
                </Divider>
                <div className="address" style={{ width: "100%" }}>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={22}
                    fontWeight={600}
                  >
                    {`${auction?.realEstateID?.street}, ${auction?.realEstateID?.ward}, ${auction?.realEstateID?.district}, ${auction?.realEstateID?.city} `}
                  </Typography>
                </div>
                <div
                  className="property-specs"
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  <Grid
                    container
                    // spacing={6}
                    justifyContent="space-around"
                  >
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {auction?.realEstateID?.type}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Property type
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {auction?.realEstateID?.bathRoom}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Baths
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {auction?.realEstateID?.bedRoom}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Beds
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {auction?.realEstateID?.size}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Square ft.
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <div
                  className="property-docs"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body1" color="initial" fontWeight={600}>
                    Property Related Documents:{" "}
                    <Chip
                      label={`View documents (${auction?.realEstateID?.pdf?.length})`}
                      sx={{ marginLeft: "20px", cursor: "pointer" }}
                      onClick={() => handleOpenDocuments()}
                    />
                  </Typography>
                </div>
                <Divider sx={{ margin: "15px 0" }}>
                  {" "}
                  <span style={{ fontSize: "16px" }}>Auction Details</span>
                </Divider>
                <div className="auction-duration" style={{ marginTop: "" }}>
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {/* {property.day < 10 ? "0" + property.day : property.day} */}{" "}
                        {auctionNoCount?.day}
                      </Typography>
                      <Typography variant="body1" color="#48525B">
                        Days
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={20}
                        fontWeight={600}
                      >
                        :
                      </Typography>
                    </Grid>
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {/* {property.hour < 10 ? "0" + property.hour : property.hour}  */}
                        {auctionNoCount?.hour}
                      </Typography>
                      <Typography variant="body1" color="#48525B">
                        Hours
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={20}
                        fontWeight={600}
                      >
                        :
                      </Typography>
                    </Grid>
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {/* {property.minute < 10
                      ? "0" + property.minute
                      : property.minute} */}
                        {auctionNoCount?.minute}
                      </Typography>
                      <Typography variant="body1" color="#48525B">
                        Mins
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={20}
                        fontWeight={600}
                      >
                        :
                      </Typography>
                    </Grid>
                    <Grid item flexDirection="column">
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {/* {property.second < 10
                      ? "0" + property.second
                      : property.second} */}
                        {auctionNoCount?.second}
                      </Typography>
                      <Typography variant="body1" color="#48525B">
                        Secs
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <div
                  className="auction-pricing"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <Grid container justifyContent="space-around">
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {formattedValue(auctionNoCount?.startPrice)}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Starting price
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {formattedValue(auctionNoCount?.buyNowPrice)}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                        textAlign="center"
                      >
                        Buy price
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {formattedValue(auctionNoCount?.priceStep)}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Price step
                      </Typography>
                    </Grid>
                    {auctionNoCount?.status === "In Auction" ? (
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="initial"
                          style={specStyle}
                        >
                          {formattedValue(auctionNoCount?.currentPrice)}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          textAlign="center"
                        >
                          Current Bid
                        </Typography>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                </div>
                <Divider sx={{ margin: "15px 0" }}>
                  <span style={{ fontSize: "16px" }}>Owner Details</span>
                </Divider>
                <div className="owner-detail" style={{ width: "100%" }}>
                  <Grid container justifyContent="space-around">
                    <Grid item>
                      <Typography variant="body1" color="initial">
                        Full name:{" "}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ mt: "10px" }}
                      >
                        Email:
                      </Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ mt: "10px" }}
                      >
                        Phone:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        textAlign="right"
                        fontWeight={600}
                      >
                        {`${auctionNoCount?.realEstateID?.ownerID?.firstName} ${auctionNoCount?.realEstateID?.ownerID?.firstName}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                        textAlign="right"
                        fontWeight={600}
                        sx={{ mt: "10px" }}
                      >
                        {auctionNoCount?.realEstateID?.ownerID?.email}{" "}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                        textAlign="right"
                        fontWeight={600}
                        sx={{ mt: "10px" }}
                      >
                        {auctionNoCount?.realEstateID?.ownerID?.phoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Modal
          open={openDocumentList}
          onClose={handleCloseDocuments}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, borderRadius: "15px" }}>
            <div
              className="header"
              style={{
                width: "100%",
                background: "black",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                padding: "15px 0",
              }}
            >
              <Typography
                variant="body1"
                color="white"
                textAlign="center"
                fontWeight={600}
              >
                Document List
              </Typography>
            </div>
            <div
              className="document-cont"
              style={{ padding: "0 30px", paddingBottom: "30px" }}
            >
              <div className="doc-list" style={{ marginTop: "30px" }}>
                <Grid container flexDirection="column" gap={2}>
                  {auctionNoCount?.realEstateID?.pdf?.map((doc) => (
                    <Grid item display="flex" alignItems="center">
                      <PictureAsPdfIcon sx={{ color: "red" }} />
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ marginLeft: "8px" }}
                      >
                        {doc}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: "50px", marginBottom: "20px" }}>
      <div className="auction-content">
        <Typography
          variant="body1"
          color="initial"
          fontSize={26}
          fontWeight={600}
        >
          Auction Detail
        </Typography>
        <div className="auction-info" style={{ marginTop: "50px" }}>
          <Grid container spacing={1}>
            <Grid item sx={{ width: "550px" }}>
              <CardMedia
                title=""
                image={
                  selectedImage
                    ? selectedImage
                    : auction?.realEstateID?.image[0]
                }
                sx={{ width: "100%", height: "520px", borderRadius: "15px" }}
              />
              <div
                className="img-slide"
                style={{ marginTop: "20px", width: "100%" }}
              >
                <Grid container justifyContent="space-between">
                  {auction?.realEstateID?.image?.map((img, key) => (
                    <Grid item>
                      <img
                        src={img}
                        alt=""
                        onClick={() => handleImageChange(img)}
                        style={{
                          width: "80px",
                          height: "73px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
            <Grid item sx={{ width: "570px", marginLeft: "30px" }}>
              <div className="auction-stats" style={{ width: "100%" }}>
                <Grid
                  container
                  spacing={6}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    {/* <Chip
                      label={auctionStatus}
                      style={{
                        background: filterType.find(
                          (item) => item.name === auctionStatus
                        )?.background,

                        fontWeight: 600,
                        color: filterType.find(
                          (item) => item.name === auctionStatus
                        )?.color,
                        // fontSize: "26px",
                      }}
                    /> */}
                    <div
                      className="chip"
                      style={{
                        background: filterType.find(
                          (item) => item.name === auction?.status
                        )?.background,

                        fontWeight: 600,
                        color: filterType.find(
                          (item) => item.name === auction?.status
                        )?.color,
                        fontSize: "20px",
                        borderRadius: "16px",
                        padding: "5px 18px",
                      }}
                    >
                      {auction?.status}
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="#B2B1B1"
                      fontWeight={600}
                    >
                      Request was sent on{" "}
                      {moment(auction?.createdAt).format("DD-MM-YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <Divider sx={{ margin: "15px 0" }}>
                <span style={{ fontSize: "16px" }}>Property Details</span>
              </Divider>
              <div className="address" style={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontSize={22}
                  fontWeight={600}
                >
                  {`${auction?.realEstateID?.street}, ${auction?.realEstateID?.ward}, ${auction?.realEstateID?.district}, ${auction?.realEstateID?.city} `}
                </Typography>
              </div>
              <div
                className="property-specs"
                style={{ marginTop: "20px", width: "100%" }}
              >
                <Grid
                  container
                  // spacing={6}
                  justifyContent="space-around"
                >
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {auction?.realEstateID?.type}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Property type
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {auction?.realEstateID?.bathRoom}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Baths
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {auction?.realEstateID?.bedRoom}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Beds
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {auction?.realEstateID?.size}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Square ft.
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div
                className="property-docs"
                style={{
                  marginTop: "20px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1" color="initial" fontWeight={600}>
                  Property Related Documents:{" "}
                  <Chip
                    label={`View documents (${auction?.realEstateID?.pdf?.length})`}
                    sx={{ marginLeft: "20px", cursor: "pointer" }}
                    onClick={() => handleOpenDocuments()}
                  />
                </Typography>
              </div>
              <Divider sx={{ margin: "15px 0" }}>
                {" "}
                <span style={{ fontSize: "16px" }}>Auction Details</span>
              </Divider>
              <div className="auction-duration" style={{ marginTop: "" }}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item flexDirection="column">
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {/* {property.day < 10 ? "0" + property.day : property.day} */}{" "}
                      {auction?.day}
                    </Typography>
                    <Typography variant="body1" color="#48525B">
                      Days
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={20}
                      fontWeight={600}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item flexDirection="column">
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {/* {property.hour < 10 ? "0" + property.hour : property.hour}  */}
                      {auction?.hour}
                    </Typography>
                    <Typography variant="body1" color="#48525B">
                      Hours
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={20}
                      fontWeight={600}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item flexDirection="column">
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {/* {property.minute < 10
                        ? "0" + property.minute
                        : property.minute} */}
                      {auction?.minute}
                    </Typography>
                    <Typography variant="body1" color="#48525B">
                      Mins
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontSize={20}
                      fontWeight={600}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item flexDirection="column">
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {/* {property.second < 10
                        ? "0" + property.second
                        : property.second} */}
                      {auction?.second}
                    </Typography>
                    <Typography variant="body1" color="#48525B">
                      Secs
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div
                className="auction-pricing"
                style={{ width: "100%", marginTop: "20px" }}
              >
                <Grid container justifyContent="space-around">
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {formattedValue(auction?.startPrice)}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Starting price
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {formattedValue(auction?.buyNowPrice)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      textAlign="center"
                    >
                      Buy price
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {formattedValue(auction?.priceStep)}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Price step
                    </Typography>
                  </Grid>
                  {auction?.status === "In Auction" ? (
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        {formattedValue(auction?.currentPrice)}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                        textAlign="center"
                      >
                        Current Bid
                      </Typography>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </div>
              <Divider sx={{ margin: "15px 0" }}>
                <span style={{ fontSize: "16px" }}>Owner Details</span>
              </Divider>
              <div className="owner-detail" style={{ width: "100%" }}>
                <Grid container justifyContent="space-around">
                  <Grid item>
                    <Typography variant="body1" color="initial">
                      Full name:{" "}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ mt: "10px" }}
                    >
                      Email:
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ mt: "10px" }}
                    >
                      Phone:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="initial"
                      textAlign="right"
                      fontWeight={600}
                    >
                      {`${auction?.realEstateID?.ownerID?.firstName} ${auction?.realEstateID?.ownerID?.firstName}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      textAlign="right"
                      fontWeight={600}
                      sx={{ mt: "10px" }}
                    >
                      {auction?.realEstateID?.ownerID?.email}{" "}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      textAlign="right"
                      fontWeight={600}
                      sx={{ mt: "10px" }}
                    >
                      {auction?.realEstateID?.ownerID?.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Modal
        open={openDocumentList}
        onClose={handleCloseDocuments}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, borderRadius: "15px" }}>
          <div
            className="header"
            style={{
              width: "100%",
              background: "black",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              padding: "15px 0",
            }}
          >
            <Typography
              variant="body1"
              color="white"
              textAlign="center"
              fontWeight={600}
            >
              Document List
            </Typography>
          </div>
          <div
            className="document-cont"
            style={{ padding: "0 30px", paddingBottom: "30px" }}
          >
            <div className="doc-list" style={{ marginTop: "30px" }}>
              <Grid container flexDirection="column" gap={2}>
                {auction?.realEstateID?.pdf?.map((doc) => (
                  <Grid item display="flex" alignItems="center">
                    <PictureAsPdfIcon sx={{ color: "red" }} />
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ marginLeft: "8px" }}
                    >
                      {doc}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewAuction;
