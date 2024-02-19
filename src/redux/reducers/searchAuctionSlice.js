import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  searchResults: [],
  searchFilter: {
    propertyType: "",
    city: "",
    beds: "",
    baths: "",
  },
};

const searchAuctionSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchQuery: (state, action) => {
      state.searchQuerry = action.payload;
    },

    getSearchResutlts: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { getSearchQuery, getSearchResutlts } = searchAuctionSlice.actions;

export default searchAuctionSlice.reducer;
