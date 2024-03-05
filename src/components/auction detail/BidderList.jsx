import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { bidders } from "./bidderData";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
};

export const cellContent = {
  fontWeight: 600,
  padding: "12px",
};

const BidderList = ({ viewBidders, handleCloseBidderList }) => {
  const [bidderList, setBidderList] = useState([]);

  const sortedBiddersDescending = (bidList) => {
    const sortedBidders = [...bidList].sort(
      (a, b) => b.bidAmount - a.bidAmount
    );
    setBidderList(sortedBidders);
  };

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

  useEffect(() => {
    sortedBiddersDescending(bidders);
  }, []);
  return (
    <Modal
      open={viewBidders}
      onClose={handleCloseBidderList}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, borderRadius: "15px" }}>
        <div
          className="header"
          style={{
            width: "100%",
            background: "black",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            padding: "15px 0",
          }}
        >
          <Typography
            variant="body1"
            color="white"
            textAlign="center"
            fontWeight={600}
          >
            Bidder List
          </Typography>
        </div>
        <div
          className="table-cont"
          style={{ padding: "0 10px", paddingBottom: "10px" }}
        >
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              maxHeight: 500,
              overflowY: "scroll",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Bid Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Time Stamps
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bidderList.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{row.fullname}</TableCell>
                    <TableCell align="center">
                      {formattedValue(row.bidAmount)}
                    </TableCell>
                    <TableCell align="center">{row.timeStamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Modal>
  );
};

export default BidderList;
