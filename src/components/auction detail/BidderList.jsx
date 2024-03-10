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
import React from "react";

import moment from "moment";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
  width: "800px",
};

export const cellContent = {
  fontWeight: 600,
  padding: "12px",
};

const BidderList = ({
  viewBidders,
  handleCloseBidderList,
  auctionID,
  bidderList,
}) => {
  // const { getBidByAuction } = useContext(BidContext);

  // const sortedBiddersDescending = (bidList) => {
  //   const sortedBidders = [...bidList].sort(
  //     (a, b) => b.bidAmount - a.bidAmount
  //   );
  //   setBidderList(sortedBidders);
  // };

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

  // useEffect(() => {
  //   getBidList();
  // }, []);

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
          {bidderList?.length > 0 ? (
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
                    <TableCell align="left" sx={{ fontWeight: 600 }}>
                      Name
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>
                      Bid Amount
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>
                      Bid Time
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bidderList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{`${row?.userID?.firstName} ${row?.userID?.lastName}`}</TableCell>
                      <TableCell align="left">
                        {formattedValue(row?.price)}
                      </TableCell>
                      <TableCell align="left">
                        {moment(row.createdAt).format("HH:mm, DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h3
              style={{ width: "100%", marginTop: "20px", textAlign: "center" }}
            >
              No One Bid Yet!!!
            </h3>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default BidderList;
