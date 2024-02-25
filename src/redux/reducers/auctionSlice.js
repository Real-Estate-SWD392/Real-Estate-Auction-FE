import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  detail: {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  },
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

    setDetail: (state, action) => {
      state.detail = action.payload;
    },

    updateDetailTimers: (state) => {
      // Update the timer for each property
      const { day, hour, minute, second } = state.detail;

      let remainingTime =
        day * 24 * 60 * 60 + hour * 60 * 60 + minute * 60 + second;

      if (remainingTime > 0) {
        remainingTime -= 1;

        state.detail.day = Math.floor(remainingTime / (24 * 60 * 60));
        state.detail.hour = Math.floor(
          (remainingTime % (24 * 60 * 60)) / (60 * 60)
        );
        state.detail.minute = Math.floor(
          ((remainingTime % (24 * 60 * 60)) % (60 * 60)) / 60
        );
        state.detail.second = Math.floor(
          ((remainingTime % (24 * 60 * 60)) % (60 * 60)) % 60
        );
      }
    },
  },
});

export const { setProperties, updateTimers, setDetail, updateDetailTimers } =
  auctionSlice.actions;
export default auctionSlice.reducer;

// You can use the following function to start the timer updates
export const startTimerUpdates = () => (dispatch) => {
  setInterval(() => {
    dispatch(updateTimers());
  }, 1000);
};

export const startDetailTimerUpdates = () => (dispatch) => {
  setInterval(() => {
    dispatch(updateDetailTimers());
  }, 1000);
};
