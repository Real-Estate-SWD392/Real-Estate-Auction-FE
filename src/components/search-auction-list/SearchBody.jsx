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
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionPropCard from "../home/related-prop/AuctionPropCard";
import { AuctionContext } from "../../context/auction.context";
import { setProperties } from "../../redux/reducers/auctionSlice";
import { getSearchResutlts } from "../../redux/reducers/searchAuctionSlice";
import { provinceURL } from "../../apiConfig";

export const listPropType = ["Condo", "Villa", "Aparment"];
export const listCity = ["Thủ Đức", "Hồ Chí Minh"];
export const bathNum = [1, 2, 3, 4];
export const bedNum = [1, 2, 3, 4];

const SearchBody = ({ searchTerm, resultCount }) => {
  const [itemAuction, setItemAuction] = React.useState([]);

  const [auctions, setAuctions] = useState({});

  const properties = useSelector((state) => state.auction.properties);

  const [provinceList, setProvinceList] = useState(null);

  console.log(properties);

  const dispatch = useDispatch();

  const { filterAuction, sortByTime, sortByPopular } =
    useContext(AuctionContext);

  const [filterValues, setFilterValues] = useState({
    type: "",
    city: "",
    bedRoom: "",
    bathRoom: "",
  });

  const handleChange = async (fieldName, values) => {
    setFilterValues((prev) => ({
      ...prev,
      [fieldName]: values,
    }));
  };

  const handleSort = async (sortField) => {
    console.log(sortField);
    switch (sortField) {
      case "time": {
        const res = await sortByTime();
        dispatch(setProperties(res.response)); // Dispatch action to set properties in the store
        break;
      }

      case "popular": {
        const res = await sortByPopular();
        dispatch(setProperties(res.response)); // Dispatch action to set properties in the store
        break;
      }

      default: {
        break;
      }
    }
  };

  useEffect(() => {
    const fetchFilteredAuction = async () => {
      try {
        const res = await filterAuction(filterValues);
        console.log("Fileeee", res.response);

        if (res.response) {
          dispatch(setProperties(res.response)); // Dispatch action to set properties in the store
          dispatch(getSearchResutlts(res.response));
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (
      filterValues.bathRoom !== "" ||
      filterValues.bedRoom !== "" ||
      filterValues.city !== "" ||
      filterValues.type !== ""
    ) {
      fetchFilteredAuction();
    }
  }, [filterValues]); // Execute whenever filterValues changes

  console.log(filterValues);

  useEffect(() => {
    const getProvince = `${provinceURL}/api/province`;
    fetch(getProvince)
      .then((response) => response.json())
      .then((data) => {
        const provincesData = data.results.map(
          (result) => result.province_name
        );

        console.log(provincesData);

        setProvinceList(provincesData);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

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
                onChange={(e) => handleChange("type", e.target.value)}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="Property type"
              >
                {listPropType?.map((type, index) => (
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
                onChange={(e) => handleChange("city", e.target.value)}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="City"
              >
                {provinceList?.map((city, index) => (
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
                onChange={(e) => {
                  handleChange("bedRoom", e.target.value);
                }}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="Property type"
              >
                {bedNum?.map((bed, index) => (
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
                onChange={(e) => {
                  handleChange("bathRoom", e.target.value);
                }}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
                label="Property type"
              >
                {bathNum?.map((bath, index) => (
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
                // value={age}
                onChange={(e) => handleSort(e.target.value)}
                sx={{ marginLeft: "20px", color: "#118BF4" }}
              >
                <MenuItem value="popular">Most popular</MenuItem>
                <MenuItem value="time">Recently</MenuItem>
              </Select>
            </FormControl>
          </Typography>
        </div>
        <Grid container spacing={3} justifyContent="center">
          {properties?.length > 0
            ? properties.map((prop, index) => (
                <Grid item key={index}>
                  <AuctionPropCard
                    id={prop._id}
                    propImg={prop.realEstateID?.image[0]}
                    imgList={prop.realEstateID.image}
                    propType={prop.realEstateID.type}
                    name={prop.name}
                    propAddress={prop.realEstateID.address}
                    days={prop.day}
                    hours={prop.hour}
                    mins={prop.minute}
                    secs={prop.second}
                    startingBid={prop.startingPrice}
                    currentBid={prop.currentPrice}
                    isFav={prop.isFav}
                    beds={prop.realEstateID.bedRoom}
                    baths={prop.realEstateID.bathRoom}
                    area={prop.realEstateID.size}
                  />
                </Grid>
              ))
            : "abc"}
        </Grid>
      </Box>
    </>
  );
};

export default SearchBody;
