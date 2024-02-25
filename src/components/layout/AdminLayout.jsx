import React, { useContext } from "react";
import AdminHeader from "./header/AdminHeader";
import AdminSideBar from "./navbar/AdminSideBar";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { AuthContext } from "../../context/auth.context";

const AdminLayout = () => {
  return (
    <>
      <Grid container>
        <Grid item>
          <AdminSideBar />
        </Grid>
        <Grid item sx={{ marginLeft: "280px", overflowX: "hidden" }}>
          <AdminHeader />
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminLayout;
