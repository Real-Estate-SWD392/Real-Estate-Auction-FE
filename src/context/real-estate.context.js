import { createContext, useContext } from "react";
import { AuthContext } from "./auth.context";
import axios from "axios";

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

  // const uploadImages = async (values) => {
  //   console.log(values);

  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/real-estate/uploadImages`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include", // Include cookies in the request
  //         body: JSON.stringify(values),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       // Handle successful login, e.g., save token to local storage, redirect, etc.
  //       console.log("Upload successfully", data);
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Upload failed", errorData);
  //     }
  //   } catch (error) {
  //     console.error("Error during update", error);
  //   }
  // };
  const createNewRealEstate = async (values) => {
    values.property.image = values.image;
    values.property.pdf = values.pdf;

    console.log(values);

    try {
      const response = await axios.post(
        "http://localhost:8080/real-estate/",
        values.property,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        const data = response.data;
        console.log("Upload successfully", response);
        return data;
      } else {
        console.error("Upload failed", response);
        return response;
      }
    } catch (error) {
      console.error("Error during upload", error);
    }
  };

  const uploadImages = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:8080/real-estate/uploadImages",
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Change Content-Type to multipart/form-data
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        const data = response.data.file;
        console.log("Upload successfully", response);
        return data;
      } else {
        console.error("Upload failed", response);
        return response;
      }
    } catch (error) {
      console.error("Error during upload", error);
    }
  };

  const uploadPDFs = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:8080/real-estate/uploadPDF",
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Change Content-Type to multipart/form-data
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        const data = response.data.file;
        console.log("Upload successfully", response);
        return data;
      } else {
        console.error("Upload failed", response);
        return response;
      }
    } catch (error) {
      console.error("Error during upload", error);
    }
  };

  return (
    <RealEstateContext.Provider
      value={{
        getRealEstateByOwner,
        createNewRealEstate,
        uploadImages,
        uploadPDFs,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};
