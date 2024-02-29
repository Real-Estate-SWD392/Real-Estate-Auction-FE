// store/index.js
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import auctionReducer, {
  startTimerUpdates,
  setProperties,
  updateDetailTimers,
  startDetailTimerUpdates,
  setNotStartAuction,
} from "./reducers/auctionSlice";
import searchAuctionReducer, {
  setSearchResults,
  startSearchTimerUpdates,
} from "./reducers/searchAuctionSlice";
import savedAuctionReducer, {
  startSavedTimerUpdates,
} from "./reducers/savedAuctionSlice";

import bidAuctionReducer, { startBidTimerUpdates } from "./reducers/myBidSlice";
import axios from "axios";

const store = configureStore({
  reducer: {
    auction: auctionReducer,
    search: searchAuctionReducer,
    saved: savedAuctionReducer,
    bid: bidAuctionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore check for non-serializable values (e.g., functions)
    }),
});

export const fetchInitialProperties = () => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/auction/status/In Auction`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      // Handle successful login, e.g., save token to local storage, redirect, etc.
      console.log("Auction List: ", data);
      dispatch(setProperties(data.response)); // Dispatch action to set properties in the store
      dispatch(setSearchResults(data.response)); // Dispatch action to set properties in the store
    } else {
      const errorData = await response.json();
      console.error("Load auction failed", errorData);
    }
  } catch (error) {
    console.error("Error during update", error);
  }
};

export const fetchNotStartAuctions = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/auction/status/Not Start`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      console.log("Not Start List: ", data);
      dispatch(setNotStartAuction(data.response)); // Dispatch action to set properties in the store
    } else {
      const errorData = response.data;
      console.error("Load not Start auction failed", errorData);
    }
  } catch (error) {
    console.error("Error during load", error);
  }
};

// Initialize the store with the initial list of properties
store.dispatch(fetchInitialProperties());

store.dispatch(fetchNotStartAuctions());

// Start the timer updates
store.dispatch(startTimerUpdates());

store.dispatch(startDetailTimerUpdates());

store.dispatch(startSearchTimerUpdates());

store.dispatch(startSavedTimerUpdates());

store.dispatch(startBidTimerUpdates());

export default store;
