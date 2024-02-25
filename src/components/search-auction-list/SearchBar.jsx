import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AuctionContext } from "../../context/auction.context";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchQuery,
  setSearchResutlts,
} from "../../redux/reducers/searchAuctionSlice";
import { setProperties } from "../../redux/reducers/auctionSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const { searchAuction } = useContext(AuctionContext);

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const searchResults = useSelector((state) => state.search.searchResults);

  const handleOnChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    //redux update search querry
    event.preventDefault();
    try {
      const res = await searchAuction(query);
      console.log(res);

      dispatch(getSearchQuery(query));
      dispatch(setSearchResutlts(res.response));
    } catch (error) {}
  };

  return (
    <div>
      <form action="" method="GET" onClick={handleSubmit}>
        <TextField
          id=""
          placeholder="Search city or address"
          value={query}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  sx={{
                    borderRadius: "0px 8px 8px 0",
                    background: "#F25D49",
                    py: "10px",
                    mr: "-14px",
                    "&:hover": { bgcolor: "#F25D49" },
                  }}
                >
                  <SearchIcon sx={{ color: "white", fontSize: "35px" }} />
                </Button>
              </InputAdornment>
            ),
            style: { borderRadius: "8px" },
          }}
          sx={{
            width: "calc(100% + 200px)",
            ml: "30px",
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
