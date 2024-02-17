import { createContext, useContext } from "react";
import { AuthContext } from "./auth.context";

export const RealEstateContext = createContext();

export const RealEstateContextProvider = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  const getRealEstateByOwner = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/real-estate/owner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Real Estate: ", data);
        return data.response;
      } else {
        const errorData = await response.json();
        console.error("Get failed", errorData);
        return errorData;
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  return (
    <RealEstateContext.Provider value={{ getRealEstateByOwner }}>
      {children}
    </RealEstateContext.Provider>
  );
};
