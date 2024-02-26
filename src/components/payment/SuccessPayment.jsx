import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { payment } from "./paymentData";
import { BidContext } from "../../context/bid.context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuctionContext } from "../../context/auction.context";
import { useDispatch } from "react-redux";
import { setDetail, setProperties } from "../../redux/reducers/auctionSlice";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  outline: "none",
  borderRadius: "20px",
  p: 4,
  width: 600,
};

export const leftStyling = {
  textAlign: "left",
};

const SuccessPayment = () => {
  const { type, bank, amount, email, mobile } = payment;
  const open = Boolean(true);

  const nav = useNavigate();

  const { id } = useParams();

  const location = useLocation();

  const [bill, setBill] = useState(null);

  const { getBill } = useContext(BidContext);

  const { addToJoinList } = useContext(AuctionContext);

  const dispatch = useDispatch();

  console.log(location);

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const getBillRes = await getBill(id, location.search);

        if (getBillRes?.success) {
          setBill(getBillRes.response);

          switch (getBillRes.response.type) {
            case "Pay Auction Fee": {
              const res = await addToJoinList(getBillRes.response.auctionID);
              console.log(res);
              if (res.success) {
                dispatch(setDetail(res.response));
              }
              break;
            }

            case "Buy Now": {
              break;
            }
            default: {
              break;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBillData();
  }, []);

  const CurrencyFormatter = ({ amount }) => {
    // Ensure amount is a number
    const formattedAmount = Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    return (
      <Typography
        variant="body1"
        color="initial"
        fontWeight={600}
        textAlign="right"
      >
        {formattedAmount}
      </Typography>
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <img
        src="https://i.pinimg.com/564x/1e/50/9d/1e509d84215ae9013852345e1d1177d9.jpg"
        style={{ width: "100%", height: "100%" }}
        alt=""
      />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="header"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon
              sx={{ width: "50px", height: "50px", color: "#00D284" }}
            />
            <Typography
              variant="body1"
              color="#00D284"
              fontSize={20}
              sx={{ marginTop: "10px" }}
            >
              Payment successful
            </Typography>
          </div>
          <div
            className="body"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Grid container sx={{ width: "100%" }}>
              <Grid container item xs={6} flexDirection="column" rowSpacing={3}>
                <Grid item>
                  <Typography variant="body1" color="initial">
                    Payment type
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial">
                    Mobile
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial">
                    Email
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial">
                    Amount paid
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="initial">
                    Transaction ID
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} flexDirection="column" rowSpacing={3}>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    style={{ textAlign: "right" }}
                  >
                    {bill?.payment}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    style={{ textAlign: "right" }}
                  >
                    {bill?.memberID?.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    style={{ textAlign: "right" }}
                  >
                    {bill?.memberID?.email}
                  </Typography>
                </Grid>
                <Grid item>
                  <CurrencyFormatter amount={bill?.total} />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight={600}
                    style={{ textAlign: "right" }}
                  >
                    {bill?._id}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div
            className="actions"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Print receipt
            </Button>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 600, ml: "20px" }}
              onClick={() => nav(`/auction_detail/${bill.auctionID}`)}
            >
              Return to auction page
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SuccessPayment;
