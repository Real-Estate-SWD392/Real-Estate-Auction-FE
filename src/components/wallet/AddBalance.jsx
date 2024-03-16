import { Button, TextField } from "@mui/material";
import React from "react";
import "./AddBalance.scss";
import { useFormik } from "formik";
import { validationAmount } from "./AmountValidate";
import { useNavigate } from "react-router-dom";

const AddBalance = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationAmount,
    onSubmit: (values) => {
      console.log("Amount", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="add-balance-container">
        <h1>Add Balance</h1>
        <div className="add-balance-field">
          <p>Amount *</p>
          {/* <p className="balance-number">$3,460,455</p> */}
          <TextField
            type="text"
            name="amount"
            value={formik.values.amount}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            onChange={formik.handleChange}
            className="custom-textfield"
          />
        </div>

        <div >
          <Button type="submit" className="add-balance-btn">
            <p>Pay by VNPay</p>
          </Button>
          
        </div>

        <Button className="payment" onClick={() => navigate("/my-account/payment-history")}>
            <p >Payment History</p>
          </Button>
      </div>
    </form>
  );
};

export default AddBalance;
