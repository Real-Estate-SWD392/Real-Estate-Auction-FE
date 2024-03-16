import { Card, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { CardMedia, Grid, Typography, Button, Box } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import { styled } from "@mui/system";
import { statusColor } from "./UpdatePropertyList";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { RealEstateContext } from "../../../context/real-estate.context";
import { useNavigate } from "react-router-dom";

const imgCard = {
  width: "320px",
  height: "180px",
};

const address = {
  width: "300px",
  height: "50px",
};

const descSpacing = {
  marginTop: "10px",
};

const combinedStyles = {
  ...address,
  ...descSpacing,
};

const iconSize = {
  width: "20px",
  height: "20px",
  color: "#2A69A3",
};

const StatusBall = styled("div")((props) => ({
  width: "12px",
  height: "12px",
  borderRadius: "10px",
  backgroundColor: props.color,
}));

const getStatusColor = (status) => {
  const statusObj = statusColor.find(
    (item) => item.name === status.toUpperCase()
  );
  return statusObj ? statusObj.color : "white";
};

const UpdatePropertyCard = ({
  propID,
  propImg,
  imgList,
  propType,
  desc,
  propAddress,
  beds,
  baths,
  area,
  status,
  index,
  onRemove,
  setIsOpenUpdate,
  setSelectedTabIndex,
}) => {
  const handleRemoveRealEstate = async () => {
    await onRemove(propID);
  };

  const nav = useNavigate();

  return (
    <>
      <Card elevation={2} sx={{ borderRadius: "12px" }}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <CardMedia
            title=""
            image={propImg}
            style={imgCard}
            sx={{
              filter: "brightness(0.9)",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 3,
              top: 8,
              right: 8,
              backgroundColor: "#FF0854",
              "&:hover": {
                backgroundColor: "#FF0854",
              },
            }}
            onClick={handleRemoveRealEstate}
          >
            <DeleteForeverIcon
              sx={{ color: "white", width: "20px", height: "20px" }}
            />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              zIndex: 3,
              bottom: 5,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "8px",
              borderRadius: "4px",
              background: "rgba(0, 0, 0, 0.60)",
              paddingX: "8px",
            }}
          >
            <StatusBall color={getStatusColor(status)} />
            <Typography
              variant="body1"
              color="white"
              fontWeight={500}
              fontSize={15}
              textTransform="uppercase"
              sx={{ marginLeft: "8px" }}
            >
              {status}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              zIndex: 3,
              bottom: 5,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              marginRight: "8px",
              borderRadius: "4px",
              background: "rgba(0, 0, 0, 0.60)",
              paddingX: "8px",
            }}
          >
            <Typography
              variant="body1"
              color="white"
              fontWeight={500}
              fontSize={15}
              textTransform="uppercase"
              sx={{}}
            >
              {propType}
            </Typography>
          </Box>
        </Box>
        <div className="prop-desc" style={{ paddingLeft: "15px" }}>
          <Typography
            variant="body1"
            color="initial"
            style={combinedStyles}
            fontSize={17}
            marginBottom={"15px"}
          >
            {propAddress}
          </Typography>
          <Grid
            container
            className="specs"
            spacing={2}
            sx={{ marginTop: "1px" }}
          >
            <Grid item className="bedNum" style={{ display: "flex" }}>
              <BedIcon sx={{ mr: "10px" }} style={iconSize} />
              <Typography variant="body1" color="#48525B">
                {beds} beds
              </Typography>
            </Grid>
            <Grid item className="bathNum" style={{ display: "flex" }}>
              <BathtubIcon sx={{ mr: "10px" }} style={iconSize} />
              <Typography variant="body1" color="#48525B">
                {baths} baths
              </Typography>
            </Grid>
            <Grid item className="area" style={{ display: "flex" }}>
              <StraightenIcon sx={{ mr: "10px" }} style={iconSize} />
              <Typography variant="body1" color="#48525B">
                {area} m2
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            color="initial"
            fontSize={13}
            sx={{
              mt: "15px",
              width: "300px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 4, // Adjust the number of lines to your preference
            }}
          >
            {desc
              ? `Description: ${desc}`
              : "No Description For This Real Estate"}{" "}
          </Typography>
        </div>
        <div className="prop-price" style={{ marginTop: "15px" }}>
          <Box
            sx={{
              p: "20px 5px",
              borderTop: "1px solid #E2EAF2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                background: "#118BF4",
                padding: "12px 90px",
                fontWeight: "600",
                "&:hover": {
                  background: "#118BF4",
                },
              }}
              onClick={() => {
                nav(`update/${propID}`);
                setIsOpenUpdate(true);
                setSelectedTabIndex(null);
              }}
            >
              Update Property
            </Button>
          </Box>
        </div>
      </Card>
    </>
  );
};

export default UpdatePropertyCard;
