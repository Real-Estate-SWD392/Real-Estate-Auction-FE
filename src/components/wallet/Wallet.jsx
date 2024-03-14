import React from "react";
import "./Wallet.scss";
import Button from "@mui/material/Button";

const Wallet = () => {
    return(
        <div className="wallet-container">
            <h1>E-wallet</h1>
            <div className="balance-field">
                <p>Your balance</p>
                <p className="balance-number">$3,460,455</p>
                
            </div>

            <div className="add-balance">
                <Button>
                    <p>Add Balance</p>
                </Button>
                <p className="payment" >Payment History</p>
            </div>
        </div>
    )
}

export default Wallet;