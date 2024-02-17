import React from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { auctionProp } from "../listProp";
import MyBidCard from "./MyBidCard";

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const MyBids = () => {
  return (
    <Card
      sx={{
        width: "1100px",
        pb: "100px",
        mb: "50px",
        paddingX: "35px",
        pt: "30px",
      }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingBottom: "30px",
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={25}
          fontWeight={600}
          sx={{ mr: "40px" }}
        >
          My Bids
        </Typography>
      </div>
      <Divider />
      <div className="listing" style={{ marginTop: "30px" }}>
        <Grid container spacing={3} justifyContent="flex-start">
          {auctionProp.map((prop, index) => (
            <Grid item key={index}>
              <MyBidCard
                propImg={prop.propImg}
                imgList={prop.imgList}
                propType={prop.propType}
                name={prop.name}
                propAddress={prop.propAddress}
                days={prop.days}
                hours={prop.hours}
                mins={prop.mins}
                secs={prop.secs}
                startingBid={prop.startingBid}
                currentBid={prop.currentBid}
                isFav={prop.isFav}
                beds={prop.beds}
                baths={prop.baths}
                area={prop.area}
                yourBid={prop.yourBid}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Card>
  );
};

export default MyBids;
