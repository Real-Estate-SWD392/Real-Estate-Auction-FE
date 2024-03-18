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
import React, { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

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
    name: "Requested",
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
  const [selectedImage, setSelectedImage] = useState(imageList[0]);

  const [openDocumentList, setOpenDocumentList] = useState(false);

  const handleOpenDocuments = () => {
    setOpenDocumentList(true);
  };

  const handleCloseDocuments = () => {
    setOpenDocumentList(false);
  };

  const handleImageChange = (img) => {
    setSelectedImage(img);
  };

  return (
    <div style={{ marginLeft: "50px" }}>
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
                image={selectedImage}
                sx={{ width: "100%", height: "520px", borderRadius: "15px" }}
              />
              <div
                className="img-slide"
                style={{ marginTop: "20px", width: "100%" }}
              >
                <Grid container justifyContent="space-between">
                  {imageList.map((img, key) => (
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
                          (item) => item.name === auctionStatus
                        )?.background,

                        fontWeight: 600,
                        color: filterType.find(
                          (item) => item.name === auctionStatus
                        )?.color,
                        fontSize: "20px",
                        borderRadius: "16px",
                        padding: "5px 18px",
                      }}
                    >
                      {auctionStatus}
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="#B2B1B1"
                      fontWeight={600}
                    >
                      Request was sent on 15-03-2024
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <Divider sx={{ margin: "15px 0" }}>Property Details</Divider>
              <div className="address" style={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontSize={22}
                  fontWeight={600}
                >
                  192/3 TTH34, Phường Tân Thới Hiệp, Quận 12, TP. Hồ Chí Minh
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
                      Villa
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
                      2
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
                      2
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
                      2000
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
                    label={"View documents(2)"}
                    sx={{ marginLeft: "20px", cursor: "pointer" }}
                    onClick={() => handleOpenDocuments()}
                  />
                </Typography>
              </div>
              <Divider sx={{ margin: "15px 0" }}>Auction Details</Divider>
              <div className="auction-duration" style={{ marginTop: "" }}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item flexDirection="column">
                    <Typography
                      variant="body1"
                      color="initial"
                      style={specStyle}
                    >
                      {/* {property.day < 10 ? "0" + property.day : property.day} */}{" "}
                      03
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
                      02
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
                      02
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
                      04
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
                      $2.000
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
                      $20.000
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
                      $1.000
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Price step
                    </Typography>
                  </Grid>
                  {auctionStatus === "In Auction" ? (
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="initial"
                        style={specStyle}
                      >
                        $20.000
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
              <Divider sx={{ margin: "15px 0" }}>Owner Details</Divider>
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
                      Do Dang Phuc Anh
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      textAlign="right"
                      fontWeight={600}
                      sx={{ mt: "10px" }}
                    >
                      phucanhdodang1211@gmail.com
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      textAlign="right"
                      fontWeight={600}
                      sx={{ mt: "10px" }}
                    >
                      1234567890
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div className="action-button" style={{ marginTop: "30px" }}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Button
                      sx={{
                        background: "#44A9FF",
                        textTransform: "none",
                        fontWeight: 600,
                        color: "white",
                        borderRadius: "8px",
                        p: "17px 90px",
                        fontSize: "16px",
                        "&:hover": {
                          background: "#44A9FF",
                          color: "white",
                        },
                      }}
                    >
                      Approve Auction
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{
                        background: "#F25D49",
                        textTransform: "none",
                        fontWeight: 600,
                        color: "white",
                        borderRadius: "8px",
                        p: "17px 50px",
                        fontSize: "16px",
                        "&:hover": {
                          background: "#F25D49",
                          color: "white",
                        },
                      }}
                    >
                      Deny Auction
                    </Button>
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
                {documentList.map((doc) => (
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
