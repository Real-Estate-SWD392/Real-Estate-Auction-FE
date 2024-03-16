import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedList: [],
};

const savedAuctionSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    setSavedList: (state, action) => {
      state.savedList = action.payload;
    },

    updateSavedTimers: (state) => {
      state.savedList.forEach((property) => {
        // Update the timer for each property
        const { day, hour, minute, second } = property.response;

        let remainingTime =
          day * 24 * 60 * 60 + hour * 60 * 60 + minute * 60 + second;

        if (remainingTime > 0) {
          remainingTime -= 1;

          property.response.day = Math.floor(remainingTime / (24 * 60 * 60));
          property.response.hour = Math.floor(
            (remainingTime % (24 * 60 * 60)) / (60 * 60)
          );
          property.response.minute = Math.floor(
            ((remainingTime % (24 * 60 * 60)) % (60 * 60)) / 60
          );
          property.response.second = Math.floor(
            ((remainingTime % (24 * 60 * 60)) % (60 * 60)) % 60
          );
        }
      });
    },
  },
});

export const { setSavedList, updateSavedTimers } = savedAuctionSlice.actions;

export default savedAuctionSlice.reducer;

export const startSavedTimerUpdates = () => (dispatch) => {
  setInterval(() => {
    dispatch(updateSavedTimers());
  }, 1000);
};
