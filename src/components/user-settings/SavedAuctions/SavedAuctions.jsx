import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { auctionProp } from "../listProp";
import SavedAuctionCard from "./SavedAuctionCard";
import { getAuctionById } from "../../../service/auctionService";
import { AuthContext } from "../../../context/auth.context";
import { getMemberInfoById } from "../../../service/memberService";
import { useNavigate } from "react-router-dom";

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const SavedAuctions = () => {
  const [auctionList, setAuctionList] = useState([]);
  const { user } = useContext(AuthContext);
  const idList = user.favoriteList ? user.favoriteList.map((item) => item._id) : [];

  const navigate = useNavigate();

  console.log("Listing", idList);

  const getAuctionByID = async (id) => {
    try {
      const res = await getAuctionById(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching auction by ID:", error);
      throw new Error("Failed to fetch auction by ID");
    }
  };

  const getListOfAuctionsByIDList = async (idList) => {
    const array = idList.filter((item) => item !== undefined);
    console.log("ABCD", array[1]);

    try {
      const auctionPromises = array.map((id) => getAuctionByID(id));
      console.log("Promise", auctionPromises);
      const auctions = await Promise.all(auctionPromises);
      // const auctions = getAuctionByID(array[0]);
      // console.log("BHH", auctions);

      for (let auction of auctions) {
        const ownerId = auction.response.realEstateID.ownerID;
        // Make an API call to get information about the user using the ownerId
        try {
          const userInfo = await getMemberInfoById(ownerId);
          console.log("User Info:", userInfo);
          // Add user info to the auction object
          auction.userInfo = userInfo;
        } catch (error) {
          console.error("Error fetching user info:", error);
          // Handle the error, e.g., display a message to the user
        }
      }
      setAuctionList(auctions);
    } catch (error) {
      console.error("Error fetching list of auctions by ID list:", error);
      // Handle the error, e.g., display a message to the user
    }
  };
  console.log("Losting", auctionList);

  useEffect(() => {
    getListOfAuctionsByIDList(idList);
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
          Saved Auctions
        </Typography>
      </div>
      <Divider />
      <div className="listing" style={{ marginTop: "30px" }}>
        <Grid container spacing={3} justifyContent="flex-start">
          {auctionList &&
            Array.isArray(auctionList) &&
            auctionList.map((prop, index) => (
              <Grid item key={index}>
                <div onClick={() => navigate("/auction_detail", {state: {id : prop.response._id}})}>
                <SavedAuctionCard
                  propImg={
                    prop.response && prop.response.realEstateID && prop.response.realEstateID.image
                      ? prop.response.realEstateID.image[0]
                      : ""
                  }
                  imgList={prop.response && prop.response.realEstateID && prop.response.realEstateID.image
                    ? prop.response.realEstateID.image.length
                    : 0}
                  propType={prop.response && prop.response.realEstateID && prop.response.realEstateID.type}
                  name={prop && prop.userInfo && prop.userInfo.data && prop.userInfo.data.response && prop.userInfo.data.response.firstName}
                  propAddress={prop.propAddress}
                  days={prop.response.day}
                  hours={prop.response.hour}
                  mins={prop.response.minute}
                  secs={prop.response.second}
                  startingBid={prop.response.startingBid}
                  currentBid={prop.response.currentPrice}
                  isFav={prop.isFav}
                  beds={prop.response.realEstateID.bedRoom}
                  baths={prop.response.realEstateID.bathRoom}
                  area={prop.response.realEstateID.size}
                  yourBid={prop.yourBid}

                  propStreet={prop.response.realEstateID.street}
                  propDistrict={prop.response.realEstateID.district}
                  propCity={prop.response.realEstateID.city}
                />
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
    </Card>
  );
};

export default SavedAuctions;
