import React from "react";
import "./Type.scss";
import ForeClosure from "../../../assets/img/ForeclosureSales.png.png";
import BankOwned from "../../../assets/img/BankOwnedHomes.png.png";
import AuctionHome from "../../../assets/img/AuctionHomes.png.png";
import SellProperty from "../../../assets/img/SellYourProperty.png.png";

const Type = () => {
  return (
    <div className="type-container">
      <h2>Search a wide range of properties to bid on or sell your property</h2>
      <div className="type-item-box">
        <div className="type-item">
          <img src={ForeClosure} alt="" />
          <h3>Foreclosure Sales</h3>
          <p>
            Browse hundreds of exclusive properties across the U.S. and find
            foreclosure events near you
          </p>
        </div>

        <div className="type-item">
          <img src={BankOwned} alt="" />
          <h3>Bank Owned Homes</h3>
          <p>These sellers are ready to make a deal on these properties</p>
        </div>

        <div className="type-item">
          <img src={AuctionHome} alt="" />
          <h3>Auction Homes</h3>
          <p>
            Find your next fixer-upper, investment property or your forever home
            on Hubzu
          </p>
        </div>

        <div className="type-item">
          <img src={SellProperty} alt="" />
          <h3>Sell Your Property</h3>
          <p>Market your property on Hubzu with our Signature</p>
        </div>
      </div>
    </div>
  );
};

export default Type;
