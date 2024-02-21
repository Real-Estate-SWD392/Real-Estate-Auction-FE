import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthContextProvider } from "./context/auth.context";
import { UserContextProvider } from "./context/user.context";
import { AuctionContextProvider } from "./context/auction.context";
import { RealEstateContextProvider } from "./context/real-estate.context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />

    <AuthContextProvider>
      <UserContextProvider>
        <AuctionContextProvider>
          <RealEstateContextProvider>
            <App />
          </RealEstateContextProvider>
        </AuctionContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
