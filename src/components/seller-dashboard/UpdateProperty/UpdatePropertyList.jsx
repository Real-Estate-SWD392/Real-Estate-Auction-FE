import React from "react";
import UpdatePropertyCard from "./UpdatePropertyCard";
import { Button, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { listSellerProps } from "../listProps";

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "rgb(0,0,0,0.12)",
});

export const statusColor = [
  {
    name: "IN AUCTION",
    color: "#51C6AD",
    amount: 2,
  },
  {
    name: "PENDING",
    color: "#FBBC05",
    amount: 2,
  },
  {
    name: "AVAILABLE",
    color: "#118BF4",
    amount: 2,
  },
  {
    name: "SOLD",
    color: "#8B8B8B",
    amount: 2,
  },
  {
    name: "REJECTED",
    color: "#FF0000",
    amount: 2,
  },
];

const UpdatePropertyList = () => {
  return (
    <Card
      sx={{
        width: "1100px",
        pb: "100px",
        mb: "50px",
        paddingX: "35px",
        pt: "30px",
      }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingBottom: "30px",
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={25}
          fontWeight={600}
          sx={{ mr: "40px" }}
        >
          Property List
        </Typography>
      </div>
      <Divider />
      <div className="listing" style={{ marginTop: "30px" }}>
        <Grid container spacing={3} justifyContent="flex-start">
          {listSellerProps
            .filter(
              (prop) =>
                prop.status === "AVAILABLE" || prop.status === "REJECTED"
            )
            .map((prop, index) => (
              <Grid item key={index}>
                <UpdatePropertyCard
                  propImg={prop.propImg}
                  propType={prop.propType}
                  desc={prop.desc}
                  propAddress={prop.propAddress}
                  beds={prop.beds}
                  baths={prop.baths}
                  area={prop.area}
                  status={prop.status}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </Card>
  );
};

export default UpdatePropertyList;
