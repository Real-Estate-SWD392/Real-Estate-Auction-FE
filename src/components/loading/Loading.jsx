import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

const Loading = ({ setIsLoading, loadingTime }) => {
  useEffect(() => {
    // Set a timeout to delay the execution of the effect

    if (loadingTime === undefined) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, []);

  console.log(loadingTime);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
