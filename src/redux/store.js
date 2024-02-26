// store/index.js
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import auctionReducer, {
  startTimerUpdates,
  setProperties,
  updateDetailTimers,
  startDetailTimerUpdates,
} from "./reducers/auctionSlice";
import searchAuctionReducer, {
  setSearchResults,
  startSearchTimerUpdates,
} from "./reducers/searchAuctionSlice";
import { listProp } from "../components/home/related-prop/ListProp";
import { useContext, useState } from "react";
import { AuctionContext } from "../context/auction.context";

const store = configureStore({
  reducer: {
    auction: auctionReducer,
    search: searchAuctionReducer,
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

// Initialize the store with the initial list of properties
store.dispatch(fetchInitialProperties());

// Start the timer updates
store.dispatch(startTimerUpdates());

store.dispatch(startDetailTimerUpdates());

store.dispatch(startSearchTimerUpdates());

export default store;
