import React, { useContext, useEffect, useState } from "react";
import UpdatePropertyCard from "./UpdatePropertyCard";
import { Button, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { listSellerProps } from "../listProps";
import { RealEstateContext } from "../../../context/real-estate.context";
import { AuthContext } from "../../../context/auth.context";
import Loading from "../../loading/Loading";

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

const UpdatePropertyList = ({ setIsOpenUpdate, setSelectedTabIndex }) => {
  const { user } = useContext(AuthContext);
  const { getRealEstateByOwner, removeRealEstate } =
    useContext(RealEstateContext);

  const [propertyList, setPropertyList] = useState([]);

  const [isLoading, setIsloading] = useState(true);

  const handleRemoveProperty = async (propID) => {
    const isConfirm = window.confirm("Are you sure remove this real estate?");

    if (isConfirm) {
      try {
        // Remove the property from the backend
        await removeRealEstate(propID);

        // Update the UI state to remove the property from the list
        setPropertyList(
          propertyList.filter((property) => property._id !== propID)
        );
      } catch (error) {
        console.error("Error removing property:", error);
      }
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await getRealEstateByOwner(user._id);
        setPropertyList(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

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
      {isLoading ? (
        <Loading setIsLoading={setIsloading} />
      ) : (
        <div className="listing" style={{ marginTop: "30px" }}>
          <Grid container spacing={3} justifyContent="flex-start">
            {propertyList?.length > 0 ? (
              propertyList.map((prop, index) => (
                <Grid item key={index}>
                  <UpdatePropertyCard
                    propID={prop._id}
                    propImg={prop.image}
                    propType={prop.type}
                    desc={prop.description}
                    propAddress={`${prop.street}, ${prop.ward}, ${prop.district}, ${prop.city}`}
                    beds={prop.bedRoom}
                    baths={prop.bathRoom}
                    area={prop.size}
                    status={prop.status}
                    setIsOpenUpdate={setIsOpenUpdate}
                    setSelectedTabIndex={setSelectedTabIndex}
                    onRemove={() => handleRemoveProperty(prop._id)}
                  />
                </Grid>
              ))
            ) : (
              <h3 style={{ width: "100%", textAlign: "center" }}>
                You Don't Have Any Real Estates Yet!
              </h3>
            )}
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default UpdatePropertyList;
