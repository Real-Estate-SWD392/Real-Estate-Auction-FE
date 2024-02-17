import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || null
  );

  const [refreshToken, setRefreshToken] = useState(Cookies.get("refreshToken"));

  useEffect(() => {
    console.log(Cookies);
    const token = Cookies.get("refreshToken");
    if (token) {
      // No need to set the cookie again, as it should already exist
      console.log("Refresh token exists:", token);
    } else {
      console.log("Refresh token not exists:");
    }
  }, [refreshToken]);

  const login = async (inputs) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Logged in successfully", data);
        setUser(data.response);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        Cookies.set("refreshToken", data.refreshToken, {
          secure: true,
          sameSite: "None",
        });
      } else {
        const errorData = await response.json();
        console.error("Login failed", errorData);
        console.log("Response: ", response);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const register = async (inputs) => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Register successfully", data);
      } else {
        const errorData = await response.json();
        console.error("Register failed", errorData);
        console.log("Response: ", response);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
  }, [accessToken]);

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
        setUser,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
