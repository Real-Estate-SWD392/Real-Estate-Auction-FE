import { CheckBox } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  Checkbox,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const warningBall = {
  width: "8px",
  height: "8px",
  backgroundColor: "#FF0000",
  borderRadius: "20px",
  marginLeft: "5px",
};

const safeBall = {
  width: "8px",
  height: "8px",
  backgroundColor: "#51C6AD",
  borderRadius: "20px",
  marginLeft: "5px",
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

const CustomDivider = styled("div")({
  width: "1px",
  height: "40px",
  background: "rgb(0,0,0,0.12)",
});

const MyBidCard = ({
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
  yourBid,
  propID,
}) => {
  const nav = useNavigate();
  return (
    <Card elevation={2} sx={{ borderRadius: "12px", pb: "10px" }}>
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
            <FavoriteBorderIcon
              sx={{ color: "white", width: "30px", height: "30px" }}
            />
          }
          checkedIcon={
            <FavoriteIcon
              sx={{ color: "#EF272C", width: "30px", height: "30px" }}
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
        <Box
          sx={{
            p: "10px 15px",
            borderTop: "1px solid #E2EAF2",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item flexDirection="column">
              <Typography variant="body1" color="initial" fontSize={15}>
                Your Bid
              </Typography>
              <Typography variant="body1" color="initial">
                <CurrencyFormatter amount={yourBid} />
              </Typography>
            </Grid>
            <Grid item>
              <CustomDivider />
            </Grid>
            <Grid item flexDirection="column">
              <Typography
                variant="body1"
                color="initial"
                fontSize={15}
                sx={{ display: "flex", alignItems: "center" }}
              >
                Current Bid{" "}
                {yourBid < currentBid ? (
                  <div style={warningBall}></div>
                ) : (
                  <div style={safeBall}></div>
                )}
              </Typography>
              <Typography variant="body1" color="initial">
                <CurrencyFormatter amount={currentBid} />
              </Typography>
            </Grid>
          </Grid>
          <Button
            sx={{
              borderRadius: "8px",
              background: "#118BF4",
              textTransform: "none",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                background: "#118BF4",
              },
              marginTop: "17px",
              py: "12px",
            }}
            onClick={() => nav(`/auction_detail/${propID}`)}
          >
            View Detail
          </Button>
        </Box>
      </div>
    </Card>
  );
};

export default MyBidCard;
