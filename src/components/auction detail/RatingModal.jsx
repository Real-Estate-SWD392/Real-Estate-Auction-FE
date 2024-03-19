import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

// const RatingModal = () => {
//   const labels = {
//     0.5: "Useless",
//     1: "Useless+",
//     1.5: "Poor",
//     2: "Poor+",
//     2.5: "Ok",
//     3: "Ok+",
//     3.5: "Good",
//     4: "Good+",
//     4.5: "Excellent",
//     5: "Excellent+",
//   };

//   cpon

//   return (
//     <div className="rating-container">
//       <Box
//         sx={{
//           width: 200,
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <Rating
//           name="text-feedback"
//           value={value}
//           readOnly
//           precision={0.5}
//           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//         />
//         <Box sx={{ ml: 2 }}>{labels[value]}</Box>
//       </Box>

//     </div>
//   );
// };

// export default RatingModal;

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
import React, { useContext, useState } from "react";
import { useRef } from "react";
import { AuctionContext } from "../../context/auction.context";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";
import { toast } from "react-toastify";
import { ratingOwnerAuction } from "../../service/memberService";

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


const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const value = 3.5;
const REQUIRED_COUNT = 70;

const RatingModal = ({  openRating, handleCloseRating, ownerID  }) => {
  const [report, setReport] = useState({
    reason: "",
    description: "",
  });


  const [error, setError] = useState({});

  const { createReport } = useContext(AuctionContext);

  const { ratingOwner } = useContext(UserContext);

  const { user, accessToken } = useContext(AuthContext);

  const [value, setValue] = useState(0);


  const handleClose = () => {
    handleCloseRating();
    setReport({
      reason: "",
      description: "",
    });
    setError({
      reason: "",
      description: "",
    });
  };


  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const rates = {
    rating: value,
    userId: user._id
  }


  const handleSubmit = async () => {
    
    console.log("Dataa", rates);
    console.log("Ownermm", ownerID);

    try {
      const res = await ratingOwnerAuction(ownerID, rates, headers);
      console.log("Hung Dep Trai", res);
      toast.success("Rating successfully !");
      handleCloseRating();
      // if (res.data.success) {
      //   toast.success(res.data.msg);
      // }
    } catch (error) {
      console.log("Rating fail", error);
      toast.error(error.response.data.message);
    }
    }

  return (
    <Modal
      open={openRating}
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
          <IconButton onClick={handleCloseRating}>
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
            Rating this owner ?
          </Typography>

          <div className="price-input" style={{ marginTop: "20px" }}>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              <Box sx={{ ml: 2, fontSize: 30 }}>{labels[value]}</Box>

              <Rating
                name="text-feedback"
                value={value} // Control the value of Rating component
                onChange={(event, newValue) => {
                  setValue(newValue); // Update the state variable with new value
                }}
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
            </Box>

            
           
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
            Send Rating
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RatingModal;
