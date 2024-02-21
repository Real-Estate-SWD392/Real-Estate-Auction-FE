import React from "react";
import ResponsiveAppBar from "./navbar/Navbar";
import { Grid } from "@mui/material";
import ProfileComponent from "../user-settings/ProfileComponent";
import { Outlet } from "react-router-dom";

const MyAccountLayout = () => {
  return (
    <div className="">
      <ResponsiveAppBar userName={"anh anh"} />
      <div className="my-account-container" style={{ background: "#FAFAFA" }}>
        <div
          className="content"
          style={{ marginLeft: "30px", paddingTop: "30px" }}
        >
          <Grid container>
            <Grid item>
              <ProfileComponent
                userName={"Anh Anh"}
                userEmail={"phucanhdodang1211@gmail.com"}
              />
            </Grid>
            <Grid item sx={{ marginLeft: "50px" }}>
              <Outlet />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MyAccountLayout;
