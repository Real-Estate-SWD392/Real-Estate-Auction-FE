import React from "react";
import "./Discover.scss";

const Discover = () => {
  return (
    <div className="discover-container">
      <h2>Discover the Accomondation difference</h2>

      <div className="discover-item-box">
        <div className="discover-item">
          <h3>12+</h3>
          <p>Years in Business</p>
        </div>

        <div className="discover-item">
          <h3>~2.5</h3>
          <p>Million Registered Users</p>
        </div>

        <div className="discover-item">
          <h3>250k+</h3>
          <p>Properties Sold</p>
        </div>

        <div className="discover-item">
          <h3>$26+</h3>
          <p>Billion in Real Estate Transactions</p>
        </div>
      </div>
    </div>
  );
};

export default Discover;
