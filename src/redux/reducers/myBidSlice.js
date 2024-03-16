import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bidList: [],
};

const bidAuctionSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    setBidList: (state, action) => {
      state.bidList = action.payload;
    },

    updateBidTimers: (state) => {
      state?.bidList?.forEach((property) => {
        // Update the timer for each property
        const { day, hour, minute, second } = property?.auctionID;

        let remainingTime =
          day * 24 * 60 * 60 + hour * 60 * 60 + minute * 60 + second;

        if (remainingTime > 0) {
          remainingTime -= 1;

          property.auctionID.day = Math.floor(remainingTime / (24 * 60 * 60));
          property.auctionID.hour = Math.floor(
            (remainingTime % (24 * 60 * 60)) / (60 * 60)
          );
          property.auctionID.minute = Math.floor(
            ((remainingTime % (24 * 60 * 60)) % (60 * 60)) / 60
          );
          property.auctionID.second = Math.floor(
            ((remainingTime % (24 * 60 * 60)) % (60 * 60)) % 60
          );
        }
      });
    },
  },
});

export const { setBidList, updateBidTimers } = bidAuctionSlice.actions;

export default bidAuctionSlice.reducer;

export const startBidTimerUpdates = () => (dispatch) => {
  setInterval(() => {
    dispatch(updateBidTimers());
  }, 1000);
};
