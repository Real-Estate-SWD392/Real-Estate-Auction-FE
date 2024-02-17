import { createContext, useContext } from "react";
import { AuthContext } from "./auth.context";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { setUser, accessToken } = useContext(AuthContext);

  const updateProfile = async (id, values) => {
    try {
      const response = await fetch(
        `http://localhost:8080/member/update-profile/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Update successfully", data);
        setUser(data.response);
      } else {
        const errorData = await response.json();
        console.error("Update failed", errorData);
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  const changePassword = async (id, values) => {
    try {
      const response = await fetch(
        `http://localhost:8080/account/changePassword/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Update successfully", data);
        setUser(data.response);
      } else {
        const errorData = await response.json();
        console.error("Update failed", errorData);
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };
  return (
    <UserContext.Provider value={{ updateProfile, changePassword }}>
      {children}
    </UserContext.Provider>
  );
};
