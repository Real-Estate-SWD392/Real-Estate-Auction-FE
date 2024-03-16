import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { toast } from "react-toastify";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { user, setUser, accessToken } = useContext(AuthContext);

  const [userWallet, setUserWallet] = useState(null);

  const updateProfile = async (id, values) => {
    values.profile.image = values.image;

    console.log(values);
    try {
      const response = await axios.patch(
        `http://localhost:8080/member/update-profile/${id}`,
        values.profile,
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
        console.log("Update successfully", data);
        toast.success("Update User Profile Successfully!!");
        setUser(data.response);
      } else {
        console.error("Update failed", response.data);
        toast.error("Update User Profile Failed!!");
      }
    } catch (error) {
      console.error("Error during update", error);
      toast.error("Update User Profile Failed!!");
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
        console.log("Change Password successfully", data);
        setUser(data.response);
        toast.success("Change Password successfully");
      } else {
        const errorData = await response.json();
        toast.error("Change Password Fail!");
        console.error("Update failed", errorData);
      }
    } catch (error) {
      console.error("Error during update", error);
      toast.error("Change Password Fail!");
    }
  };

  const getMemberInfoById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/member/update-profile/${id}`,
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
      } else {
        console.error("Update failed", response.data);
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  const removeFromFavList = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/member/remove-favorite-auction/${_id}`,
        { id: user._id }, // Include _id in the request body
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
        console.log("Remove successfully", data);
        toast.success(response.data.message);
        return data;
      } else {
        console.error("Update failed", response.data);
        toast.error("Remove From Favorite List fail");
        return response.data;
      }
    } catch (error) {
      console.error("Error during update", error);
      toast.error("Remove From Favorite List fail");
    }
  };

  const getAllAccount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/account/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
      });

      if (response.status === 200) {
        const data = response.data;
        // Handle successful update, e.g., update state, display success message, etc.
        console.log("Get successfully", data);
        return data;
      } else {
        console.error("Get failed", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  const banAccount = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/account/ban/${id}`,
        {},
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
        console.log("Ban Account Successfully", data);
        toast.success(data.message);
        return data;
      } else {
        console.error("Ban Account Failed", response.data);
        toast.error(response.data.message);
        return response.data;
      }
    } catch (error) {
      console.error("Ban Account Fail", error);
    }
  };

  const unbanAccount = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/account/unban/${id}`,
        {},
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
        console.log("Unban Account Successfully", data);
        toast.success(data.message);
        return data;
      } else {
        console.error("Unban Account Failed", response.data);
        toast.error(response.data.message);
        return response.data;
      }
    } catch (error) {
      console.error("Unban Account Fail", error);
    }
  };

  const createAccount = async (body) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/account/`,
        { body },
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
        console.log("Create Account Successfully", data);
        toast.success(data.message);
        return data;
      } else {
        console.error("Create Account Failed", response.data);
        toast.error(response.data.message);
        return response.data;
      }
    } catch (error) {
      console.error("Ban Account Fail", error);
    }
  };

  const removeAccount = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/account/remove/${id}`,
        {},
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
        console.log("Remove Account Successfully", data);
        toast.success(data.message);
        return data;
      } else {
        console.error("Remove Account Failed", response.data);
        toast.error(response.data.message);
        return response.data;
      }
    } catch (error) {
      console.error("Ban Account Fail", error);
    }
  };

  const getBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/e-wallet/${user._id}`,
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
        console.log("Get E-wallet Successfully", data);
        return data;
      } else {
        console.error("Get E-wallet Failed", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Get E-wallet Fail", error);
    }
  };

  const addMoneyToEwallet = async (amount) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/e-wallet/add/${user._id}`,
        { amount },
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
        console.log("Add Money Successfully", data);
        return data;
      } else {
        console.error("Add Money Failed", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Add Money Fail", error);
    }
  };

  const payMoney = async (amount) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/e-wallet/pay/${user._id}`,
        { amount },
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
        console.log("Pay Money Successfully", data);
        return data;
      } else {
        console.error("Pay Money Failed", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Pay Mone Fail", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        updateProfile,
        changePassword,
        getMemberInfoById,
        removeFromFavList,
        getAllAccount,
        banAccount,
        unbanAccount,
        removeAccount,
        createAccount,
        getBalance,
        addMoneyToEwallet,
        userWallet,
        setUserWallet,
        payMoney,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
