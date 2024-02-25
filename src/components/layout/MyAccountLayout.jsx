import React, { useContext } from "react";
import ResponsiveAppBar from "./navbar/Navbar";
import { Grid } from "@mui/material";
import ProfileComponent from "../user-settings/ProfileComponent";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const MyAccountLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="">
      <ResponsiveAppBar userName={`${user.firstName} ${user.lastName}`} />
      <div className="my-account-container" style={{ background: "#FAFAFA" }}>
        <div
          className="content"
          style={{ marginLeft: "30px", paddingTop: "30px" }}
        >
          <Grid container>
            <Grid item>
              <ProfileComponent
                userName={`${user.firstName} ${user.lastName}`}
                userEmail={user.email}
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
