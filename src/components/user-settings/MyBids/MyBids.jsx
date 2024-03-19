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
import { useDispatch, useSelector } from "react-redux";
import { setSavedList } from "../../../redux/reducers/savedAuctionSlice";
import { setBidList } from "../../../redux/reducers/myBidSlice";

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const MyBids = () => {
  const [isLoading, setIsloading] = useState(true);
  const { bidList, getUserBid } = useContext(BidContext);
  const list = useSelector((state) => state.bid.bidList);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserBid();

      if (res.success) {
        setBidList(res.response);
        const highestPriceBidsMap = new Map();

        // Iterate through bidList
        res?.response?.forEach((bid) => {
          console.log(bid);
          // Check if the auctionID already exists in the map
          if (highestPriceBidsMap.has(bid.auctionID._id)) {
            // If it does, compare the price with the existing bid
            const existingBid = highestPriceBidsMap.get(bid.auctionID._id);
            if (bid.price > existingBid.price) {
              // If the new bid has a higher price, update the map
              highestPriceBidsMap.set(bid.auctionID._id, { ...bid });
            }
          } else {
            // If the auctionID does not exist in the map, add it
            highestPriceBidsMap.set(bid.auctionID._id, { ...bid });
          }
        });

        // Convert the map values to an array to get the final list of highest price bids
        dispatch(setBidList(Array.from(highestPriceBidsMap.values())));
      }
    };

    fetchData();

    // Create a map to store the highest price bid for each auctionID
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
          My Bids
        </Typography>
      </div>
      <Divider />

      {isLoading ? (
        <Loading setIsLoading={setIsloading} />
      ) : (
        <div className="listing" style={{ marginTop: "30px" }}>
          <Grid container spacing={3} justifyContent="flex-start">
            {list?.length > 0 ? (
              list?.map((prop, index) => (
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
