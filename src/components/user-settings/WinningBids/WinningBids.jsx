import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { auctionProp } from "../listProp";
import WinningBidCard from "./WinningBidCard";
import { BidContext } from "../../../context/bid.context";
import Loading from "../../loading/Loading";
import { AuctionContext } from "../../../context/auction.context";

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const WinningBids = () => {
  const { winList, setWinList, getWinBid } = useContext(BidContext);

  const { checkAlreadyPay } = useContext(AuctionContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getWinBid();
      setWinList(res.response);
    };

    fetchData();
  }, []);

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
          Winning Bids
        </Typography>
      </div>
      <Divider />
      {isLoading ? (
        <Loading setIsLoading={setIsLoading} />
      ) : (
        <div className="listing" style={{ marginTop: "30px" }}>
          <Grid container spacing={3} justifyContent="flex-start">
            {winList.length > 0 ? (
              winList.map((prop, index) => (
                <Grid item key={index}>
                  <WinningBidCard
                    propImg={prop?.realEstateID?.image[0]}
                    imgList={prop?.realEstateID?.image.length}
                    propType={prop?.realEstateID?.type}
                    name={prop?.name}
                    propAddress={`${prop?.realEstateID?.street}, ${prop?.realEstateID?.ward}, ${prop?.realEstateID?.district}, ${prop?.realEstateID?.city}`}
                    days={prop?.day}
                    hours={prop?.hour}
                    mins={prop?.minute}
                    secs={prop?.second}
                    startingBid={prop?.startPrice}
                    currentBid={prop?.currentPrice}
                    isFav={prop.isFav}
                    beds={prop?.realEstateID?.bedRoom}
                    baths={prop?.realEstateID?.bathRoom}
                    area={prop?.realEstateID?.size}
                    yourBid={prop?.yourBid}
                    propID={prop?._id}
                    realEstateID={prop?.realEstateID._id}
                  />
                </Grid>
              ))
            ) : (
              <h3 style={{ width: "100%", textAlign: "center" }}>
                You Haven't Win Any Auction Yet!
              </h3>
            )}
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default WinningBids;
