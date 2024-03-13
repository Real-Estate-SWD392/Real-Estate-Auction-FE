import {
  Box,
  Chip,
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
};
const ViewReportModal = ({
  openReasons,
  handleCloseReasonList,
  reasonList,
}) => {
  const reasonType = [
    {
      name: "Fraudulent Activity",
      background: "rgb(137, 22, 82, 0.1)",
      color: "rgb(137, 22, 82)",
    },
    {
      name: "Inappropriate Content",
      background: "rgb(29, 36, 202,0.1)",
      color: "rgb(29, 36, 202)",
    },
    {
      name: "Scam/Missing Information",
      background: "rgb(27, 60, 115,0.1)",
      color: "rgb(27, 60, 115)",
    },
    {
      name: "Price Manipulation",
      background: "rgb(255, 64, 125,0.1)",
      color: "rgb(255, 64, 125)",
    },
    {
      name: "Counterfeit Items",
      background: "rgb(105, 98, 173,0.1)",
      color: "rgb(105, 98, 173)",
    },
    {
      name: "Unfair Bidding Practices",
      background: "rgb(131, 192, 193,0.1)",
      color: "rgb(131, 192, 193)",
    },
  ];

  console.log(reasonList);

  return (
    <div>
      <Modal
        open={openReasons}
        onClose={handleCloseReasonList}
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
              Auction Report List
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
                width: 850,
              }}
            >
              <Table
                sx={{ width: "100%" }}
                aria-label="simple table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Reporter Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Reason
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Description
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Time stamp
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reasonList.map((reason, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{
                          pr: "20px",
                          maxWidth: "103.7px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {reason.reporterName}
                      </TableCell>
                      <TableCell align="center" sx={{ pr: "20px" }}>
                        {
                          <Chip
                            label={reason.reason}
                            style={{
                              background: reasonType.find(
                                (item) => item.name === reason.reason
                              )?.background,

                              fontWeight: 600,
                              color: reasonType.find(
                                (item) => item.name === reason.reason
                              )?.color,
                            }}
                          />
                        }
                      </TableCell>
                      <TableCell align="center" sx={{ pr: "20px" }}>
                        {reason.description}
                      </TableCell>
                      <TableCell align="center" sx={{ pr: "20px" }}>
                        12-03-2024
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewReportModal;
