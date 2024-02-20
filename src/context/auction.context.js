import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";

export const AuctionContext = createContext();

export const AuctionContextProvider = ({ children }) => {
  const { setUser, accessToken } = useContext(AuthContext);

  const [auctionList, setAuctionList] = useState([]);

  const getAllAuctions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auction`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const searchAuction = async (value) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auction/name/${value}`,
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
        addAuctionToFavList,
        searchAuction,
        filterAuction,
        sortByTime,
        sortByPopular,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};
