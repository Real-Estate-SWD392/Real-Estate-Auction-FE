import { CheckBox } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  Checkbox,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import React, { useEffect, useState } from "react";

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
  });

  return (
    <Typography variant="body1" color="initial" fontWeight={600} fontSize={20}>
      {formattedAmount}
    </Typography>
  );
};

const SavedAuctionCard = ({
  propImg,
  imgList,
  propType,
  name,
  propStreet,
  propDistrict,
  propCity,
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
}) => {
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
        >
          {propStreet} {propDistrict} {propCity}
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item flexDirection="column">
              <Typography variant="body1" color="initial" fontSize={15}>
                {startingBid > currentBid ? "Starting Bid" : "Current Bid"}
              </Typography>
              <Typography variant="body1" color="initial">
                {startingBid > currentBid ? (
                  <CurrencyFormatter amount={startingBid} />
                ) : (
                  <CurrencyFormatter amount={currentBid} />
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  background: "#118BF4",
                  padding: "12px 25px",
                  fontWeight: "600",
                }}
              >
                View Details
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Card>
  );
};

export default SavedAuctionCard;
