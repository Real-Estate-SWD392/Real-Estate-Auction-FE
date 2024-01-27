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
        const { days, hours, mins, secs } = property;
        let remainingTime =
          days * 24 * 60 * 60 + hours * 60 * 60 + mins * 60 + secs;

        if (remainingTime > 0) {
          remainingTime -= 1;

          property.days = Math.floor(remainingTime / (24 * 60 * 60));
          property.hours = Math.floor(
            (remainingTime % (24 * 60 * 60)) / (60 * 60)
          );
          property.mins = Math.floor(
            ((remainingTime % (24 * 60 * 60)) % (60 * 60)) / 60
          );
          property.secs = Math.floor(
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
