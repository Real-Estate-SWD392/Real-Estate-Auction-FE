import { Button, Card, Grid, Typography } from "@mui/material";
import { style, styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MyListingCard from "./MyListingCard";
import { listSellerProps } from "../listProps";
import { RealEstateContext } from "../../../context/real-estate.context";
import { getRealEstateByOwnerId } from "../../../service/realEstateService";
import { AuthContext } from "../../../context/auth.context";

const buttonStyles = {
  borderRadius: "5px",
  padding: "7px 12px",
  backgroundColor: "rgba(0, 0, 0, 0.60)",
  color: "white",
};

const Ball = styled("div")((props) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: props.color,
  marginRight: "5px",
}));

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

export const statusColor = [
  {
    name: "IN AUCTION",
    color: "#51C6AD",
    amount: 2,
  },
  {
    name: "PENDING",
    color: "#FBBC05",
    amount: 2,
  },
  {
    name: "AVAILABLE",
    color: "#118BF4",
    amount: 2,
  },
  {
    name: "SOLD",
    color: "#8B8B8B",
    amount: 2,
  },
  {
    name: "REJECTED",
    color: "#FF0000",
    amount: 2,
  },
];

const MyListings = () => {
  const { user, accessToken } = useContext(AuthContext);

  const [auctionLists, setAuctionLists] = useState([]);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  console.log("Lisqios", user._id);

  useEffect(() => {
    const getRealEstateByOwner = async () => {
      try {
        let res = null;
        res = await getRealEstateByOwnerId(user._id, headers);
        console.log("Hung", res.data.response);
        setAuctionLists(res.data.response);
      } catch (error) {
        console.error("Error fetching my list:", error);
      }
    };

    getRealEstateByOwner();
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
          My Listings
        </Typography>
        <div className="status-overall">
          {statusColor.map((status, index) => (
            <Button style={buttonStyles} sx={{ mr: "14px" }}>
              <Ball color={status.color} />
              <Typography
                variant="body1"
                color="white"
                fontSize={14}
                fontWeight={500}
              >
                {status.name} (
                {
                  auctionLists.filter(
                    (auction) => auction.status.toUpperCase() === status.name
                  ).length
                }
                )
              </Typography>
            </Button>
          ))}
        </div>
      </div>
      <Divider />
      <div className="listing" style={{ marginTop: "30px" }}>
        <Grid container spacing={3} justifyContent="flex-start">
          {auctionLists &&
            Array.isArray(auctionLists) &&
            auctionLists.map((prop, index) => (
              <Grid item key={index}>
                <MyListingCard
                  property={prop}
                  propID={prop._id}
                  propImg={prop.image}
                  propType={prop.type}
                  desc={prop.desc}
                  propAddress={prop.propAddress}
                  beds={prop.bedRoom}
                  baths={prop.bathRoom}
                  area={prop.size}
                  status={prop.status}
                  propStreet={prop.street}
                  propDistrict={prop.district}
                  propCity={prop.city}
                  auctionLists={auctionLists}
                  setAuctionLists={setAuctionLists}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </Card>
  );
};

export default MyListings;
