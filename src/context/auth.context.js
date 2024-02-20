import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [isLoginGoogle, setIsLoginGoogle] = useState(false);

  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || null
  );

  const [refreshToken, setRefreshToken] = useState(Cookies.get("refreshToken"));

  useEffect(() => {
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
  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await fetch(
          "http://localhost:8080/auth/google/success",
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

    fetchData();
  }, []);

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
    setUser(null);
    setAccessToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(accessToken);
      try {
        const response = await fetch("http://localhost:8080/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Logout successfully", data);
        } else {
          const errorData = await response.json();
          console.error("Logout failed", errorData);
        }
      } catch (error) {
        console.error("Error during logout", error);
      }
    };

    if (!accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
        setUser,
        setIsLoginGoogle,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
