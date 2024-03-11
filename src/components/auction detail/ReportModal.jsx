import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import { useRef } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

const reasons = [
  {
    name: "Fraudulent Activity",
  },
  {
    name: "Inappropriate Content",
  },
  {
    name: "Scam/Missing Information",
  },
  {
    name: "Price Manipulation",
  },
  {
    name: "Counterfeit Items",
  },
  {
    name: "Unfair Bidding Practices",
  },
];

const REQUIRED_COUNT = 70;

const ReportModal = ({ openReport, handleCloseReport }) => {
  const [report, setReport] = useState({
    reason: "",
    description: "",
  });

  const [letterCount, setLetterCount] = useState(0);

  const [error, setError] = useState({});

  const handleInputChange = (name, value) => {
    if (name === "description") {
      const updatedLetterCount = value.length;
      setLetterCount(updatedLetterCount);
      if (letterCount >= REQUIRED_COUNT - 1) {
        return;
      }
      setError({
        description: "",
      });
    }

    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!report.description) {
      newErrors.description = "Please fill in description";
    }
    if (!report.reason) {
      newErrors.reason = "Reason is missing";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    handleCloseReport();
    setReport({
      reason: "",
      description: "",
    });
    setLetterCount(0);
    setError({
      reason: "",
      description: "",
    });
  };

  const handleSubmit = () => {
    validateForm();
    console.log(report);
  };

  return (
    <Modal
      open={openReport}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          className="close-btn"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-10px",
          }}
        >
          <IconButton onClick={handleCloseReport}>
            <Close />
          </IconButton>
        </div>
        <div
          className="modal-content"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-20px",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            fontSize={24}
            fontWeight={600}
          >
            Report this Auction?
          </Typography>
          <Typography
            variant="body1"
            color="#85929E"
            fontSize={14}
            sx={{ mt: "8px" }}
          >
            Once you send a report, the staff team will decide your report
            ticket
          </Typography>
          <div className="price-input" style={{ marginTop: "30px" }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Report type</InputLabel>
              <Select
                value={report.reason}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Report type"
                error={Boolean(error.reason)}
                sx={{ borderRadius: "8px" }}
                onChange={(event) =>
                  handleInputChange("reason", event.target.value)
                }
              >
                {reasons.map((reason, index) => (
                  <MenuItem value={reason.name} key={index}>
                    {reason.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="" style={{ marginTop: "20px" }}>
              <Grid container>
                <Grid item>
                  <TextField
                    label="Report description"
                    value={report.description}
                    sx={{ width: "495px" }}
                    InputProps={{
                      // readOnly: letterCount >= REQUIRED_COUNT, // Lock input when limit is reached
                      style: { borderRadius: "8px" },
                      endAdornment: (
                        <InputAdornment>
                          <Typography
                            variant="body1"
                            color="initial"
                            fontSize={12}
                            sx={{ mr: "10px" }}
                          >
                            {letterCount}/{REQUIRED_COUNT}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    multiline
                    onChange={(event) =>
                      handleInputChange("description", event.target.value)
                    }
                    error={Boolean(error.description)}
                    helperText={error.description}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              mt: "40px",
              bgcolor: "black",
              p: "17px 205px",
              "&:hover": {
                bgcolor: "black",
              },
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "8px",
            }}
            onClick={() => handleSubmit()}
          >
            Send Report
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReportModal;
