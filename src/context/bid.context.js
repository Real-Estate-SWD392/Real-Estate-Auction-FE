import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { toast } from "react-toastify";
import axios from "axios";

export const BidContext = createContext();

export const BidContextProvider = ({ children }) => {
  const { user, setUser, accessToken } = useContext(AuthContext);

  const [bidList, setBidList] = useState([]);

  const [winList, setWinList] = useState([]);

  const getUserBid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bid/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // Handle successful update, e.g., update state, display success message, etc.
        console.log("Get successfully", data);
        setBidList(response.data.response);
        return response.data;
      } else {
        console.error("Get Bid List failed", response.data);
      }
    } catch (error) {
      console.error("Error during get bid list", error);
    }
  };

  const getWinBid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bid/win/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // Handle successful update, e.g., update state, display success message, etc.
        console.log("Get successfully", data);
        setWinList(response.data.response);
        return response.data;
      } else {
        console.error("Get Win List failed", response.data);
      }
    } catch (error) {
      console.error("Error during get win list", error);
    }
  };

  const updateNewBid = async (values) => {
    try {
      const response = await axios.put(`http://localhost:8080/bid/`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
      });

      if (response.status >= 200 && response.status <= 300) {
        const data = response.data;
        // Handle successful update, e.g., update state, display success message, etc.
        console.log("Update successfully", data);
        setBidList(response.data.response);
        return data;
      } else {
        console.error("Update Bid failed", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error during update bid", error);
    }
  };

  useEffect(() => {
    getUserBid();
    getWinBid();
  }, []);

  console.log(bidList);

  return (
    <BidContext.Provider
      value={{
        bidList,
        winList,
        setWinList,
        setBidList,
        getUserBid,
        updateNewBid,
        getWinBid,
      }}
    >
      {children}
    </BidContext.Provider>
  );
};
