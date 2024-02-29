import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [isLoginGoogle, setIsLoginGoogle] = useState(false);

  const [isOpenLogin, setIsOpenLogin] = useState(false);

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
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Login successfully");
        const data = response.data;
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Logged in successfully", data.response.role);
        setUser(data.response);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        Cookies.set("refreshToken", data.refreshToken, {
          secure: true,
          sameSite: "None",
        });
        return data.response;

        
      } else {
        const errorData = response.data;
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
    try {
      const response = await axios.get("http://localhost:8080/auth/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response);

      if (response.status === 200) {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        Cookies.remove("refreshToken");
        toast.success("Logout Successfully!!!");
        console.log("Logout successfully", response.data);
      } else {
        toast.success("Logout Failed!!!");
        console.error("Logout failed", response.data);
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

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
        isOpenLogin,
        setIsOpenLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;