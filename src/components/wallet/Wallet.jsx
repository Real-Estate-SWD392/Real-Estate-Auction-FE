import React from "react";
import "./Wallet.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Wallet = (props) => {
  const navigate = useNavigate();
  return (
    <div className="wallet-container">
      <h1>E-wallet</h1>
      <div className="balance-field">
        <p>Your balance</p>
        <p className="balance-number">$3,460,455</p>
      </div>

      <div>
        <Button
          className="add-balance"
          onClick={() => {
            props.setOpenAddBalance(true);
            props.setOpenWallet(false);
          }}
        >
          <p>Add Balance</p>
        </Button>
        <Button className="payment" onClick={() => navigate("/my-account/payment-history")}>
          <p >Payment History</p>
        </Button>
      </div>
    </div>
  );
};

export default Wallet;
