import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { auctionProp } from "../listProp";
import SavedAuctionCard from "./SavedAuctionCard";
import { getAuctionById } from "../../../service/auctionService";
import { AuthContext } from "../../../context/auth.context";
import { getMemberInfoById } from "../../../service/memberService";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

const SavedAuctions = () => {
  const [auctionList, setAuctionList] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const { user, accessToken } = useContext(AuthContext);
  const idList = user.favoriteList
    ? user.favoriteList.map((item) => item._id)
    : [];

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

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const getListOfAuctionsByIDList = async (idList) => {
    console.log(idList);

    const array = idList.filter((item) => item !== undefined);

    console.log(array);

    try {
      const auctionPromises = array.map((id) => getAuctionByID(id));
      const auctions = await Promise.all(auctionPromises);
      // const auctions = getAuctionByID(array[0]);
      // console.log("BHH", auctions);

      for (let auction of auctions) {
        console.log(auction);
        const ownerId = auction.response.realEstateID.ownerID._id;
        // Make an API call to get information about the user using the ownerId
        try {
          const userInfo = await getMemberInfoById(ownerId, headers);

          console.log(userInfo);
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

  useLayoutEffect(() => {
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
      {loading ? (
        <Loading setIsLoading={setLoading} />
      ) : (
        <div className="listing" style={{ marginTop: "30px" }}>
          <Grid container spacing={3} justifyContent="flex-start">
            {auctionList.length > 0 ? (
              auctionList.map((prop, index) => (
                <Grid item key={index}>
                  <div>
                    <SavedAuctionCard
                      propID={prop.response._id}
                      propImg={
                        prop.response &&
                        prop.response.realEstateID &&
                        prop.response.realEstateID.image
                          ? prop.response.realEstateID.image[0]
                          : ""
                      }
                      imgList={
                        prop.response &&
                        prop.response.realEstateID &&
                        prop.response.realEstateID.image
                          ? prop.response.realEstateID.image.length
                          : 0
                      }
                      propType={
                        prop.response &&
                        prop.response.realEstateID &&
                        prop.response.realEstateID.type
                      }
                      name={
                        prop &&
                        prop.userInfo &&
                        prop.userInfo.data &&
                        prop.userInfo.data.response &&
                        prop.userInfo.data.response.firstName
                      }
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
                      propWard={prop.response.realEstateID.ward}
                      propDistrict={prop.response.realEstateID.district}
                      propCity={prop.response.realEstateID.city}
                    />
                  </div>
                </Grid>
              ))
            ) : (
              <h3 style={{ width: "100%", textAlign: "center" }}>
                You Haven't Add Any Auction To Favorite List Yet!
              </h3>
            )}
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default SavedAuctions;
