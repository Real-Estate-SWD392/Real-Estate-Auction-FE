// store/index.js
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import auctionReducer, {
  startTimerUpdates,
  setProperties,
} from "./reducers/auctionSlice";
import { listProp } from "../components/home/related-prop/ListProp";

const store = configureStore({
  reducer: {
    auction: auctionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore check for non-serializable values (e.g., functions)
    }),
});

// Initialize the store with the initial list of properties
store.dispatch(setProperties(listProp));

// Start the timer updates
store.dispatch(startTimerUpdates());

export default store;
