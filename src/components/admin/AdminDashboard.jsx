import { Grid, Typography } from "@mui/material";
import React from "react";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import AuctionCard from "./AuctionCard";
import { pendingAuctions } from "./dashboardData";

const colorStat = [
  {
    name: "Total Aucions",
    color: "#134B50",
    background: "#D5F4E3",
  },
  {
    name: "Total Members",
    color: "#134B50",
    background: "#D5F4E3",
  },
];

const auctionStat = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const boxPadding = {
  // p: "60px 80px",
  width: 270,
  height: 230,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
};

const AdminDashboard = () => {
  return (
    <div style={{ marginLeft: "50px" }}>
      <div className="stat-box">
        <Grid container gap={3}>
          <Grid
            item
            sx={{
              ...boxPadding,
              background: "#D5F4E3",
            }}
          >
            <div className="auction-stats" style={auctionStat}>
              <HouseRoundedIcon
                sx={{ color: "#49B882", width: "40px", height: "50px" }}
              />
              <Typography
                variant="body1"
                color="#134B50"
                fontSize={38}
                fontWeight={600}
              >
                100
              </Typography>
              <Typography variant="body1" color="#134B50" fontSize={18}>
                Total Auctions
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            sx={{
              ...boxPadding,
              background: "#DDF6F9",
            }}
          >
            <div className="auction-stats" style={auctionStat}>
              <GroupRoundedIcon
                sx={{ color: "#4EC7DA", width: "40px", height: "50px" }}
              />
              <Typography
                variant="body1"
                color="#083A67"
                fontSize={38}
                fontWeight={600}
              >
                100
              </Typography>
              <Typography variant="body1" color="#083A67" fontSize={18}>
                Total Members
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            sx={{
              ...boxPadding,
              background: "#FEF1D9",
            }}
          >
            <div className="auction-stats" style={auctionStat}>
              <AttachMoneyRoundedIcon
                sx={{ color: "#F0AC2D", width: "40px", height: "50px" }}
              />
              <Typography
                variant="body1"
                color="#763F05"
                fontSize={38}
                fontWeight={600}
              >
                100
              </Typography>
              <Typography variant="body1" color="#763F05" fontSize={18}>
                Auctions Sold
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            sx={{
              ...boxPadding,
              background: "#FDE2DB",
            }}
          >
            <div className="auction-stats" style={auctionStat}>
              <ReportProblemRoundedIcon
                sx={{ color: "#EF7A58", width: "40px", height: "50px" }}
              />
              <Typography
                variant="body1"
                color="#740615"
                fontSize={38}
                fontWeight={600}
              >
                100
              </Typography>
              <Typography variant="body1" color="#740615" fontSize={18}>
                Reported Auctions
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="pending-auction">
        <Typography
          variant="body1"
          color="initial"
          fontSize={26}
          fontWeight={600}
        >
          Newest Pending Auction
        </Typography>
        <Typography variant="body1" color="initial"></Typography>
        <div className="pending-list">
          <Grid container spacing={2}>
            {pendingAuctions.map((auction, index) => (
              <Grid item>
                <AuctionCard
                  ownerName={auction.ownerName}
                  createAt={auction.createdAt}
                  address={auction.address}
                  beds={auction.beds}
                  baths={auction.baths}
                  type={auction.type}
                  startingPrice={auction.startingPrice}
                  buyPrice={auction.buyPrice}
                  priceStep={auction.priceStep}
                  image={auction.image}
                  docs={auction.docs}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
