// RelatedPropList.js
import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton, Typography } from "@mui/material";
import AuctionPropCard from "./AuctionPropCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const buttonStyle = {
  background: "#F4F7FA",
  width: "40px",
  height: "40px",
  borderRadius: "10px",
};
const RelatedPropList = ({ properties }) => {
  return (
    <>
      <div
        className="header-rcm-prop"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={28}
          fontWeight={500}
          sx={{ marginLeft: "85px", mb: "15px" }}
        >
          Reccommended Properties
        </Typography>
        <div className="navigate-next" style={{ marginRight: "85px" }}>
          <IconButton style={buttonStyle} sx={{ mr: "20px" }}>
            <ChevronRightIcon
              sx={{
                transform: "rotate(180deg)",
              }}
            />
          </IconButton>
          <IconButton style={buttonStyle}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <Grid container spacing={3} justifyContent="center">
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
