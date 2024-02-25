import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import axios from "axios";
import { toast } from "react-toastify";

export const AuctionContext = createContext();

export const AuctionContextProvider = ({ children }) => {
  const { user, setUser, accessToken } = useContext(AuthContext);

  const [auctionList, setAuctionList] = useState([]);

  const getAllAuctions = async () => {
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
        setAuctionList(data.response);
      } else {
        const errorData = await response.json();
        console.error("Load auction failed", errorData);
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  const getAuctionByRealEstateID = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/auction/realEstate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = await response.data;
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Auction List: ", data);
        return response.data;
      } else {
        const errorData = await response.data;
        console.error("Load auction failed", errorData);
        return errorData.data;
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  const searchAuction = async (value) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auction/name/${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Data: ", data);
        return data;
      } else {
        const errorData = await response.json();
        console.error("Searchfailed", errorData);
        return errorData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterAuction = async (value) => {
    try {
      console.log("value", value);

      const response = await fetch(
        `http://localhost:8080/auction/filter?type=${value.type}&city=${value.city}&bedRoom=${value.bedRoom}&bathRoom=${value.bathRoom}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Data: ", data);
        return data;
      } else {
        const errorData = await response.json();
        console.error("Filter Fail", errorData);
        return errorData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addAuctionToFavList = async (id, values) => {
    try {
      const response = await fetch(
        `http://localhost:8080/member/add-favorite-auction/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: { auctionID: JSON.stringify(values) },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Add to fav sucess: ", data);
      } else {
        const errorData = await response.json();
        console.error("Add to fav fail failed", errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortByTime = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auction/sort/time`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Data: ", data);
        return data;
      } else {
        const errorData = await response.json();
        console.error("Sort failed", errorData);
        return errorData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortByPopular = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/auction/sort/popular`,
        {
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Data: ", data);
        return data;
      } else {
        const errorData = await response.json();
        console.error("Sort failed", errorData);
        return errorData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createAuction = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/auction/`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        const data = await response.data;
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Create Sucess: ", data);
        toast.success("Create Auction Success! Your Auction is on pending");
        return data;
      } else {
        const errorData = await response.data;
        console.error("Create failed", errorData);

        return errorData;
      }
    } catch (error) {
      toast.error("Create Auction Fail!!");
      console.log(error);
    }
  };

  const addToJoinList = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/auction/addMember/${id}/${user._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        const data = await response.data;
        console.log("Add To Join List Sucess: ", data);
        return data;
      } else {
        const errorData = await response.data;
        console.error("Add To Join List failed", errorData);
        return errorData;
      }
    } catch (error) {
      toast.error("Add To Join List Fail!!");
      console.log(error);
    }
  };

  const setWinner = async (id, userID) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/auction/setWinner/${id}`,
        { userID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        const data = await response.data;
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Set Winner Sucess: ", data);
      } else {
        const errorData = await response.data;
        console.error("Set Winner failed", errorData);
      }
    } catch (error) {
      toast.error("Set Winner Auction Fail!!");
      console.log(error);
    }
  };

  const closeAuction = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/auction/closeAuction/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        const data = await response.data;
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Close Sucess: ", data);
        toast.success(data.message);
        return data;
      } else {
        const errorData = await response.data;
        toast.error(errorData.message);
        console.error("Close failed", errorData);
        return errorData;
      }
    } catch (error) {
      toast.error("Close Auction Fail!!");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllAuctions();
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuctionContext.Provider
      value={{
        auctionList,
        setAuctionList,
        addAuctionToFavList,
        searchAuction,
        filterAuction,
        sortByTime,
        sortByPopular,
        createAuction,
        getAuctionByRealEstateID,
        closeAuction,
        setWinner,
        addToJoinList,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};
