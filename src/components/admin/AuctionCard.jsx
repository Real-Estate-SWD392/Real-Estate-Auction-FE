import { Card, CardMedia, Typography } from "@mui/material";
import React from "react";

const AuctionCard = ({
  ownerName,
  createAt,
  address,
  beds,
  baths,
  type,
  startingPrice,
  buyPrice,
  priceStep,
  image,
  docs,
}) => {
  return (
    <Card sx={{ background: "#F4F6F8", borderRadius: "20px" }} elevation={0}>
      <div className="card-content" style={{ padding: "15px 15px" }}>
        <div
          className="name-timestamps"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            fontSize={15}
            fontWeight={600}
          >
            {ownerName}
          </Typography>
          <Typography variant="body1" color="#8997A0" fontSize={14}>
            {createAt}
          </Typography>
        </div>
        <div className="address">
          <Typography
            variant="body1"
            color="initial"
            fontSize={15}
            sx={{
              width: "250px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
            }}
          >
            {address}
          </Typography>
        </div>
        <div className="prop-spec">
          <div className="beds">
            <Typography variant="body1" color="initial">
              {beds}
            </Typography>
          </div>
          <div className="baths">
            <Typography variant="body1" color="initial">
              {baths}
            </Typography>
          </div>
        </div>
        <div className="img-container" style={{ width: 100, height: 50 }}>
          <CardMedia
            title=""
            image={image}
            sx={{ width: "100%", height: "50%" }}
          />
          <Typography variant="body1" color="initial">
            {type}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default AuctionCard;
