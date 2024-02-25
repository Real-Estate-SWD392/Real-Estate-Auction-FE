import React from "react";
import AdminHeader from "./header/AdminHeader";
import AdminSideBar from "./navbar/AdminSideBar";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

const AdminLayout = () => {
  return (
    <>
      <Grid container>
        <Grid item>
          <AdminSideBar />
        </Grid>
        <Grid item sx={{ marginLeft: "280px", overflowX: "hidden" }}>
          <AdminHeader email={"phucanhdodang1211@gmail.com"} />
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminLayout;
