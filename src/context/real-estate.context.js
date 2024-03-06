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
    values.formValues.image = values.image;
    values.formValues.pdf = values.pdf;

    console.log("Hu hon chua 1", values);

    try {
      const response = await axios.post(
        "http://localhost:8080/real-estate/",
        values.formValues,
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
        toast.success("Create real estate successully!!");
        return data;
      } else {
        console.error("Upload failed", response);
        return response;
      }
    } catch (error) {
      toast.error("Create real estate fail!!");
      console.error("Error during upload", error);
    }
  };

  const getRealEstateByStatus = async (status) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/real-estate/status/${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        const data = await response.data;
        // Handle successful login, e.g., save token to local storage, redirect, etc.
        console.log("Get Sucess: ", data);
        return data;
      } else {
        const errorData = await response.data;
        console.error("Get failed", errorData);

        return errorData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRealEstate = async (id, values) => {
    if (values.image !== "") {
      values.property.image = values.image;
    }

    if (values.pdf !== "") {
      values.property.pdf = values.pdf;
    }

    console.log(values);

    try {
      const response = await axios.put(
        `http://localhost:8080/real-estate/${id}`,
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
        console.log("Update successfully", response);
        toast.success("Update real estate successully!!");
        return data;
      } else {
        console.error("Upload failed", response);
        return response;
      }
    } catch (error) {
      toast.error("Update real estate fail!!");
      console.error("Error during upload", error);
    }
  };

  const removeRealEstate = async (id) => {
    try {
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
        updateRealEstate,
        getRealEstateByStatus,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};
