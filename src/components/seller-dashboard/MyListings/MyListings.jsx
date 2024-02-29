import { Button, Card, Grid, Typography } from "@mui/material";
import { style, styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MyListingCard from "./MyListingCard";
import { listSellerProps } from "../listProps";
import { RealEstateContext } from "../../../context/real-estate.context";
import { getRealEstateByOwnerId } from "../../../service/realEstateService";
import { AuthContext } from "../../../context/auth.context";
import Loading from "../../loading/Loading";

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
    name: "In Auction",
    color: "#51C6AD",
    amount: 2,
  },
  {
    name: "Pending",
    color: "#FBBC05",
    amount: 2,
  },
  {
    name: "Available",
    color: "#118BF4",
    amount: 2,
  },
  {
    name: "Sold",
    color: "#8B8B8B",
    amount: 2,
  },
  {
    name: "Rejected",
    color: "#FF0000",
    amount: 2,
  },
];

const MyListings = () => {
  const { user, accessToken } = useContext(AuthContext);

  const [isLoading, setIsloading] = useState(true);

  const { getRealEstateByStatus } = useContext(RealEstateContext);

  const [auctionLists, setAuctionLists] = useState([]);

  const [statusAmount, setStatusAmount] = useState([]);

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
        setStatusAmount(res.data.response);
      } catch (error) {
        console.error("Error fetching my list:", error);
      }
    };

    getRealEstateByOwner();
  }, []);

  const handelFilter = async (status) => {
    try {
      const res = await getRealEstateByStatus(status);
      console.log(res);

      if (res.success) {
        const filterByUser = res.response.filter(
          (item) => item.ownerID === user._id
        );
        setAuctionLists(filterByUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(auctionLists);

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
            <Button
              style={buttonStyles}
              sx={{ mr: "14px" }}
              onClick={() => handelFilter(status.name)}
            >
              <Ball color={status.color} />
              <Typography
                variant="body1"
                color="white"
                fontSize={14}
                fontWeight={500}
              >
                {status.name.toUpperCase()} (
                {
                  statusAmount.filter(
                    (auction) => auction.status === status.name
                  ).length
                }
                )
              </Typography>
            </Button>
          ))}
        </div>
      </div>
      <Divider />
      {isLoading ? (
        <Loading setIsLoading={setIsloading} />
      ) : (
        <div className="listing" style={{ marginTop: "30px" }}>
          <Grid container spacing={3} justifyContent="flex-start">
            {auctionLists &&
            Array.isArray(auctionLists) &&
            auctionLists.length > 0 ? (
              auctionLists.map((prop, index) => (
                <Grid item key={index}>
                  <MyListingCard
                    property={prop}
                    propID={prop._id}
                    propImg={prop.image}
                    propType={prop.type}
                    desc={prop.description}
                    propAddress={prop.propAddress}
                    beds={prop.bedRoom}
                    baths={prop.bathRoom}
                    area={prop.size}
                    status={prop.status}
                    propStreet={prop.street}
                    propWard={prop.ward}
                    propDistrict={prop.district}
                    propCity={prop.city}
                    auctionLists={auctionLists}
                    setAuctionLists={setAuctionLists}
                  />
                </Grid>
              ))
            ) : (
              <h3 style={{ width: "100%", textAlign: "center" }}>
                You Don't Create Any Auction Yet!
              </h3>
            )}
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default MyListings;
