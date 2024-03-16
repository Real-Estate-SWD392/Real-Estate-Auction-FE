import React from "react";
import "./Wallet.scss";
import Button from "@mui/material/Button";

const Wallet = ({ wallet }) => {
  const formattedValue = (value) => {
    // Ensure the input is a valid number
    if (typeof value !== "number" || isNaN(value)) {
      return "Invalid input";
    }

    // Use Intl.NumberFormat to format the number as US currency
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return formattedAmount;
  };

  const handleAddMoney = async () => {
    // const dataPost = {
    //   total: 100,
    //   bankCode: "",
    //   language: "vn",
    //   payment: "VNPay",
    //   type: "Pay Auction Fee",
    // };
    // const response = await createBill(dataPost);
    // window.location.href = response.url;
  };

  return (
    <div className="wallet-container">
      <h1>E-wallet</h1>
      <div className="balance-field">
        <p>Your balance</p>
        <p className="balance-number">{formattedValue(wallet?.balance)}</p>
      </div>

      <div className="add-balance">
        <Button>
          <p>Add Balance</p>
        </Button>
        <p className="payment">Payment History</p>
      </div>
    </div>
  );
};

export default Wallet;
