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
      state.searchTerm = action.payload;
    },

    setSearchResutlts: (state, action) => {
      state.searchResults = action.payload;
    },

    updateSearchTimers: (state) => {
      state.searchResults.forEach((property) => {
        // Update the timer for each property
        const { day, hour, minute, second } = property;

        let remainingTime =
          day * 24 * 60 * 60 + hour * 60 * 60 + minute * 60 + second;

        if (remainingTime > 0) {
          remainingTime -= 1;

          property.day = Math.floor(remainingTime / (24 * 60 * 60));
          property.hour = Math.floor(
            (remainingTime % (24 * 60 * 60)) / (60 * 60)
          );
          property.minute = Math.floor(
            ((remainingTime % (24 * 60 * 60)) % (60 * 60)) / 60
          );
          property.second = Math.floor(
            ((remainingTime % (24 * 60 * 60)) % (60 * 60)) % 60
          );
        }
      });
    },
  },
});

export const { getSearchQuery, setSearchResutlts, updateSearchTimers } =
  searchAuctionSlice.actions;

export default searchAuctionSlice.reducer;

export const startSearchTimerUpdates = () => (dispatch) => {
  setInterval(() => {
    dispatch(updateSearchTimers());
  }, 1000);
};
