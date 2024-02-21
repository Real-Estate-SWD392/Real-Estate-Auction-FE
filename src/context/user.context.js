import { createContext, useContext } from "react";
import { AuthContext } from "./auth.context";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { setUser, accessToken } = useContext(AuthContext);

  const updateProfile = async (id, values) => {
    try {
      console.log(values);
      const response = await fetch(
        `http://localhost:8080/member/update-profile/65c779e38fd0bf66e97318b5`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
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
    <UserContext.Provider value={{ updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};
