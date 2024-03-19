import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import "./AddBalance.scss";
import { useFormik } from "formik";
import { validationAmount } from "./AmountValidate";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { createBill } from "../../service/billService";
import { toast } from "react-toastify";

const AddBalance = () => {
  const navigate = useNavigate();

  const { user, accessToken } = useContext(AuthContext);
  const userID = user ? user._id : null;

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationAmount,
    onSubmit: (values) => {
      console.log("Amount", values);
      handleCreateBill();
    },
  });

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const billData = {
    // memberID: userID,
    total: formik.values.amount,
    bankCode: "",
    language: "vn",
    payment: "VNPay",
    type: "Add Money To E-wallet",
  };

  const handleCreateBill = async () => {
    console.log("ID", userID);
    console.log("Bill", billData);
    console.log("head", headers);
    try {
      const res = await createBill(userID, billData, headers);
      console.log("Hung Nguyen", res);
      const billUrl = res.data.url;
      window.location.href = billUrl;
      // if (res && res.data && res.data.success) {
      //   console.log();
      //   console.log("DDD", res);
      //   toast.success("Add balance successfully !");
      // }
    } catch (error) {
      alert("Error create bill. Please try again later.");
      console.log("Aaa", error);
    }
  };

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

        <div>
          <Button type="submit" className="add-balance-btn">
            <p>Pay by VNPay</p>
          </Button>
        </div>

        <Button
          className="payment"
          onClick={() => navigate("/my-account/payment-history")}
        >
          <p>Payment History</p>
        </Button>
      </div>
    </form>
  );
};

export default AddBalance;
