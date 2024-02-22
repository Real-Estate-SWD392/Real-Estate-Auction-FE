import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import detail_photo from "../../assets/img/auction-detail-photo.png";
import "./AuctionDetail.scss";

import icon_image from "../../assets/img/detail_logo_image.png";
import icon_view from "../../assets/img/detail_logo_view.png";
import icon_location from "../../assets/img/detail_logo_location.png";
import heart_icon from "../../assets/img/heart_icon_detail.png";
import money_icon from "../../assets/img/detail_money_icon.png";
import nomoney_icon from "../../assets/img/detail_nomoney_icon.png";
import warning_icon from "../../assets/img/detail_warning_icon.png";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Typography } from "@mui/material";

const mapStateToProps = (state) => {
  return {
    properties: state.auction.properties,
    // You can add more properties from the Redux store as needed
  };
};

const AuctionDetail = ({ props }) => {
  const days = 50;
  const hours = 10;
  const mins = 0;
  const secs = 0;

  


  return (
    <div className="auction-detail-container">
      <Grid container spacing={5}>
        <Grid xs={7}>
          <div className="detail-toggle-button">
            <div className="detail-toggle-button-box-a">
              <p style={{ color: "#118BF4" }}> Back to search</p>
              <p>WV | West Union | Details</p>
            </div>
            <p>Not legitimate ? Report this Auction</p>
          </div>

          <div className="detail-photos">
            <img src={detail_photo} alt="" />

            <div className="detail-photo-button">
              <div className="photo-button-content">
                <img src={icon_image} alt="" />
                <p>Gallery</p>
              </div>

              <div className="photo-button-content">
                <img src={icon_location} alt="" />
                <p>Map View</p>
              </div>

              <div className="photo-button-content">
                <img src={icon_view} alt="" />
                <p>Street View</p>
              </div>
            </div>
          </div>

          <div className="auction-detail-name">
            <div className="auction-detail-name-content">
              <h2>6284 MCELROY CREEK RD</h2>
              <p>West Union, WV 26456</p>
            </div>

            <div className="auction-detail-name-number">
              <div className="auction-detail-number-item">
                <h3>3</h3>
                <p>Beds</p>
              </div>

              <div className="auction-detail-number-item">
                <h3>1</h3>
                <p>Bath</p>
              </div>

              <div className="auction-detail-number-item">
                <h3>914</h3>
                <p>Square Feet</p>
              </div>
            </div>
          </div>

          <div className="auction-detail-banner">
            <p>Go ahead - Place an online bid today.</p>
          </div>

          <div className="auction-detail-description">
            <h2>Description</h2>
            <p>
              REO Occupied - the seller does not represent or guarantee
              occupancy status. NO VIEWINGS of this property. Please DO NOT
              DISTURB the occupant. "As is" cash only sale with no contingencies
              or inspections. Buyer will be responsible for obtaining possession
              of the property upon closing.
            </p>

            <p>
              Occupied auction, Sold As Is, Trustee deed will be recorded prior
              to sale deed.
            </p>

            <div className="auction-detail-description-warning">
              <RemoveCircleOutlineIcon
                style={{ color: "#F25D49", fontSize: "50px" }}
              />
              <div className="warning-content">
                <p>Occupied - Do Not Disturb</p>
                <p>
                  Attempting to inspect or visit an occupied property may be
                  considered trespassing.
                </p>
              </div>
            </div>
          </div>

          <div className="auction-detail-document">
            <h2>Documents</h2>
            <p>
              The following documents are available for 6284 MCELROY CREEK RD
              West Union, WV 26456
            </p>
            <div className="document-box">
              <p>ALL US Protect Family From Lead</p>
              <p>Purchase & Sale Agreement</p>
            </div>
          </div>

          <div className="auction-detail-property">
            <h2>Property Details</h2>
            <div className="property-box">
              <div className="property-item">
                <p className="property-title">Beds</p>
                <p>3 Beds</p>
              </div>

              <div className="property-item">
                <p className="property-title">Full Baths</p>
                <p>1 Bath</p>
              </div>

              <div className="property-item">
                <p className="property-title">Size</p>
                <p>914 Sq. Ft.</p>
              </div>

              <div className="property-item">
                <p className="property-title">Property ID</p>
                <p>88516811353</p>
              </div>
            </div>
          </div>

          <div className="auction-detail-listby">
            <p>Agent: CHARLES HARVEY</p>
            <p>Phone Number: (304) 887-3742</p>
            <p>Contact Email: abcxys@gmail.com</p>
          </div>
        </Grid>

        <Grid xs={5}>
          <div className="detail-bidding-space">
            <div className="clock-container">


              <Grid container spacing={1} sx={{ marginLeft: "1px", justifyContent:"center" }}>
                <Grid item flexDirection="column">
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    fontSize={50}
                    textAlign="center"
                  >
                    {days < 10 ? "0" + days : days}
                  </Typography>
                  <Typography variant="body1" color="#48525B">
                    Days
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontSize={50}>
                    :
                  </Typography>
                </Grid>
                <Grid item flexDirection="column">
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    fontSize={50}
                    textAlign="center"
                  >
                    {hours < 10 ? "0" + hours : hours}
                  </Typography>
                  <Typography variant="body1" color="#48525B">
                    Hours
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontSize={50}>
                    :
                  </Typography>
                </Grid>
                <Grid item flexDirection="column">
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    fontSize={50}
                    textAlign="center"
                  >
                    {mins < 10 ? "0" + mins : mins}
                  </Typography>
                  <Typography variant="body1" color="#48525B">
                    Mins
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial" fontSize={50}>
                    :
                  </Typography>
                </Grid>
                <Grid item flexDirection="column">
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    fontSize={50}
                    textAlign="center"
                  >
                    {secs < 10 ? "0" + secs : secs}
                  </Typography>
                  <Typography variant="body1" color="#48525B">
                    Secs
                  </Typography>
                </Grid>
              </Grid>



            </div>

            <div className="detail-bid-price-container">
              <p className="current-bid-price">
                <p className="current-price">$20,000</p>
                <p>Current Bid</p>
              </p>

              <p className="number-bidder">
                <p className="number">220</p>
                <p>Bidders</p>
              </p>
            </div>

            <div className="detail-starting-price">
              <p>Starting Price</p>
              <p>$20,000</p>
            </div>

            <div className="detail-bid-deposit">
              <p>Bid Deposit</p>
              <p>Required</p>
            </div>

            <p className="note">
              Note: The seller may choose to negotiate with bidders even
              if the reserve price isn't met.
            </p>

            <div className="detail-place-bid">
              <div className="place-bid-button">Place Bid</div>
              <img src={heart_icon} alt="" className="add-to-love-button" />
            </div>
            <div className="detail-orr">
              <div className="line"></div>
              <p>or</p>
              <div className="line"></div>
            </div>

            <div className="detail-buy-absolute-button">
              Buy this property with $100,000
            </div>

            <div className="detail-chatting-button">
              Chat with Property Owner
            </div>
          </div>

          <div className="info-banner">
            <div className="info-banner-item">
              <img src={money_icon} alt="" />
              <div className="info-banner-content">
                <h2>Cash Only Sale</h2>
                <p>
                  Cash Purchase Only. Conventional financing is not available;
                  financing contingency not offered.
                </p>
              </div>
            </div>

            <div className="info-banner-item">
              <img src={nomoney_icon} alt="" />
              <div className="info-banner-content">
                <h2>No Buyers Premium</h2>
                <p>This property is not subject to a buyer's premium.</p>
              </div>
            </div>

            <div className="info-banner-item">
              <img src={warning_icon} alt="" />
              <div className="info-banner-content">
                <h2>Special Servicing Conditions Apply</h2>
                <p>Bid review required. Sold subject to seller approval.</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuctionDetail;
