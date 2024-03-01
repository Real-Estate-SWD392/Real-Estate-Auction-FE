// RelatedPropList.js
import React from "react";
import { connect, useSelector } from "react-redux";
import { Grid, IconButton, Typography } from "@mui/material";
import AuctionPropCard from "./AuctionPropCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuctionContext } from "../../../context/auction.context";

const buttonStyle = {
  background: "#F4F7FA",
  width: "40px",
  height: "40px",
  borderRadius: "10px",
};
const RelatedPropList = ({}) => {
  const { auctionList, setAuctionList } = useContext(AuctionContext);

  const navigate = useNavigate();
  const properties = useSelector((state) => state.auction.properties);

  setAuctionList(properties);

  const handleNavigate = () => {
    navigate("/auctions");
  };

  return (
    <>
      <div
        className="header-rcm-prop"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 80px",
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={28}
          fontWeight={500}
        >
          Recommended Properties
        </Typography>
        <div className="navigate-next">
          <IconButton style={buttonStyle} onClick={handleNavigate}>
            <ChevronRightIcon
              sx={{
                transform: "rotate(180deg)",
              }}
            />
          </IconButton>
          <IconButton style={buttonStyle} onClick={handleNavigate}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <Grid container spacing={3} sx={{ width: "90%", margin: "0 auto" }}>
        {/* <Grid container spacing={3} justifyContent="flex-start" style={{padding: "0 85px", marginTop:"20px"}}> */}
        {auctionList.map((prop, index) => (
          <Grid item key={index} xs={3} md={3}>
            <AuctionPropCard
              id={prop._id}
              propImg={prop.realEstateID.image[0]}
              imgList={prop.realEstateID.image}
              propType={prop.realEstateID.type}
              name={prop.name}
              propStreet={prop.realEstateID.street}
              propWard={prop.realEstateID.ward}
              propDistrict={prop.realEstateID.district}
              propCity={prop.realEstateID.city}
              days={prop.day}
              hours={prop.hour}
              mins={prop.minute}
              secs={prop.second}
              startingBid={prop.startingPrice}
              currentBid={prop.currentPrice}
              isFav={prop.isFav}
              beds={prop.realEstateID.bedRoom}
              baths={prop.realEstateID.bathRoom}
              area={prop.realEstateID.size}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RelatedPropList;
