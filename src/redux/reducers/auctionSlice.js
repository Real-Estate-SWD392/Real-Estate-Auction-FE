import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    updateTimers: (state) => {
      state.properties.forEach((property) => {
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

export const { setProperties, updateTimers } = auctionSlice.actions;
export default auctionSlice.reducer;

// You can use the following function to start the timer updates
export const startTimerUpdates = () => (dispatch) => {
  setInterval(() => {
    dispatch(updateTimers());
  }, 1000);
};
