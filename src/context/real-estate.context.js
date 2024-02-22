import { createContext, useContext } from "react";
import { AuthContext } from "./auth.context";
import axios from "axios";
import { toast } from "react-toastify";

export const RealEstateContext = createContext();

export const RealEstateContextProvider = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  const getRealEstateByOwner = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/real-estate/owner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        // Handle successful response, e.g., access response data
        console.log("Real Estate: ", response.data);
        return response.data.response;
      } else {
        console.error("Get failed", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  const getRealEstateByID = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/real-estate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        // Handle successful response, e.g., access response data
        console.log("Real Estate: ", response.data);
        return response.data.response;
      } else {
        console.error("Get failed", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

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
        toast.success("Create request auction successully!!");
        return data;
      } else {
        console.error("Upload failed", response);
        toast.error("Create request auction fail!!");
        return response;
      }
    } catch (error) {
      console.error("Error during upload", error);
    }
  };

  const removeRealEstate = async (id) => {
    try {
      console.log(accessToken);

      const response = await axios.put(
        `http://localhost:8080/real-estate/remove/${id}`,
        {},
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
        console.log("Remove successfully", response);
        toast.success("Remove Real Estate Successfully");
        return data;
      } else {
        console.error("Remove failed", response);
        toast.error("Remove Real Estate Fail!!");
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
        getRealEstateByID,
        createNewRealEstate,
        uploadImages,
        removeRealEstate,
        uploadPDFs,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};
