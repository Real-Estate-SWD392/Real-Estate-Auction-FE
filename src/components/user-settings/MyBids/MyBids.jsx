import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { auctionProp } from "../listProp";
import MyBidCard from "./MyBidCard";
import { BidContext } from "../../../context/bid.context";
import Loading from "../../loading/Loading";

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const MyBids = () => {
  const [isLoading, setIsloading] = useState(true);
  const { bidList } = useContext(BidContext);

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

      {isLoading ? (
        <Loading setIsLoading={setIsloading} />
      ) : (
        <div className="listing" style={{ marginTop: "30px" }}>
          <Grid container spacing={3} justifyContent="flex-start">
            {bidList.length > 0 ? (
              bidList.map((prop, index) => (
                <Grid item key={index}>
                  <MyBidCard
                    propID={prop?.auctionID?._id}
                    propImg={prop?.auctionID?.realEstateID?.image[0]}
                    imgList={prop?.auctionID?.realEstateID?.image?.length}
                    propType={prop?.auctionID?.realEstateID?.type}
                    propAddress={`${prop?.auctionID?.realEstateID?.street}, ${prop?.auctionID?.realEstateID?.ward}, ${prop?.auctionID?.realEstateID?.district}, ${prop?.auctionID?.realEstateID?.city} `}
                    name={`${prop?.auctionID?.realEstateID?.ownerID?.firstName} ${prop?.auctionID?.realEstateID?.ownerID?.lastName}`}
                    days={prop?.auctionID?.day}
                    hours={prop?.auctionID?.hour}
                    mins={prop?.auctionID?.minute}
                    secs={prop?.auctionID?.second}
                    startingBid={prop?.auctionID?.startingBid}
                    currentBid={prop?.auctionID?.currentPrice}
                    isFav={prop?.isFav}
                    beds={prop?.auctionID?.realEstateID.bedRoom}
                    baths={prop?.auctionID?.realEstateID.bathRoom}
                    area={prop?.auctionID?.realEstateID.size}
                    yourBid={prop?.price}
                  />
                </Grid>
              ))
            ) : (
              <h3 style={{ width: "100%", textAlign: "center" }}>
                You Haven't Place A Bid Yet!
              </h3>
            )}
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default MyBids;
