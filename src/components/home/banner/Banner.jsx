import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PercentIcon from "@mui/icons-material/Percent";
import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner-container">
      <h1>Invest in real estate starts here</h1>
      <div className="option-banner">
        <div className="option-detail buy">BUY</div>
        <div className="option-detail">SELL</div>
      </div>

      <div className="banner-searchbar">
        <input type="text" placeholder="State, County, City, Zip Code..."/>
        <div className="search-icon-banner">
        <SearchIcon />
        </div>
      </div>

      <div className="banner-offers">
        <h2>Don't miss these offers:</h2>
        <div className="banner-item-container">
          <div className="banner-offer-item">
            <PercentIcon />
            <div className="banner-item-header">
              Cash Incentive Available!
              <p>Up to $7,500 credited at closing. Learn More.</p>
            </div>
          </div>

          <div className="banner-offer-item">
            <PercentIcon />
            <div className="banner-item-header">
              Cash Incentive Available!
              <p>Up to $7,500 credited at closing. Learn More.</p>
            </div>
          </div>

          <div className="banner-offer-item">
            <PercentIcon />
            <div className="banner-item-header">
              Cash Incentive Available!
              <p>Up to $7,500 credited at closing. Learn More.</p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Banner;
