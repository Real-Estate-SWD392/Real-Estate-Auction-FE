import React from "react";
import "./Offer.scss";

const Offer = () => {
  return (
    <>
      <h1 style={{margin: "15px", paddingLeft: "80px", paddingTop: "50px", fontSize: "28px"}}>Check out these offers:</h1>
      <div className="offer-container">
        <div className="offer-item-container">
          <div className="offer-item-1">
            <div className="offer-item-1-description">
              <h3>Exclusive auctions ending soon</h3>
              <p>Save thousands with No Buyer's Premium or Tech Fees.</p>
            </div>
          </div>

          <div className="offer-item-2">
            <div className="offer-item-2-description">
              <h3>Save big on select properties!</h3>
              <p>Save thousands with No Buyer's Premium or Tech Fees.</p>
            </div>
          </div>

          <div className="offer-item-3">
            <div className="offer-item-3-description">
              <h3>HUGE Cash Credits at Closing!</h3>
              <p>
                From $1,000 to $7,500 credited on select occupied
                properties.
              </p>
            </div>
          </div>

          <div className="offer-item-1">
            <div className="offer-item-1-description">
              <h3>Exclusive auctions ending soon</h3>
              <p>Save thousands with No Buyer's Premium or Tech Fees.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
