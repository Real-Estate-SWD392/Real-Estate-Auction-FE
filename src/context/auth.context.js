import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

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
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //   const logout = async () => {
  //     const res = await axios.post(
  //       "http://localhost:8800/auth/logout",
  //       {},
  //       { withCredentials: true }
  //     );
  //     setUser(null);
  //     localStorage.removeItem("user");
  //   };

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
