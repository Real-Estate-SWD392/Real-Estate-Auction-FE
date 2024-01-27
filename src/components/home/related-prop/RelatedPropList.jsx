// RelatedPropList.js
import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@mui/material";
import AuctionPropCard from "./AuctionPropCard";

const RelatedPropList = ({ properties }) => {
  return (
    <>
      <Typography
        variant="body1"
        color="initial"
        fontSize={32}
        sx={{ marginLeft: "115px", mb: "15px" }}
      >
        Reccommended Properties:
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {properties.map((prop, index) => (
          <Grid item key={index}>
            <AuctionPropCard
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
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    properties: state.auction.properties,
    // You can add more properties from the Redux store as needed
  };
};

export default connect(mapStateToProps)(RelatedPropList);
