import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuctionPropCard from "../home/related-prop/AuctionPropCard";
import { listAuctions } from "../../service/auctionService";
import { useNavigate } from "react-router-dom";

const MOST_POPULAR = "Most popular";
const RECENT = "Recently";

export const listPropType = ["Condo", "Villa", "Aparment"];
export const listCity = ["Thủ Đức", "Hồ Chí Minh"];
export const bathNum = [1, 2, 3, 4];
export const bedNum = [1, 2, 3, 4];

const SearchBody = ({ searchTerm, resultCount }) => {
  const [itemAuction, setItemAuction] = React.useState([]);

  const [auctions, setAuctions] = useState({});

  const properties = useSelector((state) => state.auction.properties);


  const fetchAuctionList = async () => {
    try {
      let res = null;
      res = await listAuctions();
      console.log(res.data.response);
      setAuctions(res.data.response);
    } catch (error) {
      console.error("Error fetching auction list:", error);
    }
  };


  useEffect(() => {
    fetchAuctionList();
  }, []);


  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ bgcolor: "white" }}>
        <div
          className="filter-box"
          style={{
            display: "flex",
            borderBottom: "1px solid #E2EAF2",
          }}
        >
          <div
            className="filter-content"
            style={{
              marginLeft: "65px",
              paddingBottom: "10px",
              marginTop: "10px",
            }}
          >
            <FormControl sx={{ width: 200, my: 1 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ marginLeft: "20px" }}
              >
                Property type
              </InputLabel>
              <Select
                //   value={age}
                //   onChange={handleChange}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="Property type"
              >
                {listPropType.map((type, index) => (
                  <MenuItem value={type} key={index}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 200, my: 1 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ marginLeft: "20px" }}
              >
                City
              </InputLabel>
              <Select
                //   value={age}
                //   onChange={handleChange}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="City"
              >
                {listCity.map((city, index) => (
                  <MenuItem value={city} key={index}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 100, my: 1 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ marginLeft: "20px" }}
              >
                Beds
              </InputLabel>
              <Select
                //   value={age}
                //   onChange={handleChange}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="Property type"
              >
                {bedNum.map((bed, index) => (
                  <MenuItem value={bed} key={index}>
                    {bed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 100, my: 1 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ marginLeft: "20px" }}
              >
                Baths
              </InputLabel>
              <Select
                //   value={age}
                //   onChange={handleChange}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="Property type"
              >
                {bathNum.map((bath, index) => (
                  <MenuItem value={bath} key={index}>
                    {bath}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div
          className="title"
          style={{
            marginLeft: "85px",
            marginBottom: "30px",
            paddingTop: "10px",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            fontSize={20}
            fontWeight={600}
            sx={{ display: "flex" }}
          >
            Home Auction & Real Estate Auctions in{" "}
            <p style={{ color: "#118BF4", marginLeft: "20px" }}>{searchTerm}</p>
          </Typography>
          <Typography
            variant="body1"
            color="#48525B"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-10px",
            }}
          >
            {resultCount} Results, sorted by{" "}
            <FormControl variant="standard" sx={{ minWidth: 120, m: 1 }}>
              <Select
                //   value={age}
                //   onChange={handleChange}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
              >
                <MenuItem value={MOST_POPULAR}>Most popular</MenuItem>
                <MenuItem value={RECENT}>Recently</MenuItem>
              </Select>
            </FormControl>
          </Typography>
        </div>
        <Grid container spacing={3} justifyContent="center">
          {auctions &&
            Array.isArray(auctions) &&
            auctions.map((prop, index) => (
              <Grid item key={index}>
                <div onClick={() => navigate("/auction_detail", {state: {id : prop._id}})}>
                <AuctionPropCard
                  propAuctionId={prop._id}
                  propImg={prop.realEstateID.image}
                  imgList={prop.imgList}
                  propType={prop.description}
                  name={prop.name}

                  propStreet={prop.realEstateID.street}
                  propDistrict={prop.realEstateID.district}
                  propCity={prop.realEstateID.city}

                  days={prop.day}
                  hours={prop.hour}
                  mins={prop.minute}
                  secs={prop.second}
                  startingBid={prop.startingBid}
                  currentBid={prop.currentPrice}
                  isFav={prop.isFav}
                  beds={prop.realEstateID.bedRoom}
                  baths={prop.realEstateID.bathRoom}
                  area={prop.realEstateID.size}
                />
                </div>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default SearchBody;
