import React, { useContext, useEffect } from "react";
import AdminHeader from "./header/AdminHeader";
import AdminSideBar from "./navbar/AdminSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { AuthContext } from "../../context/auth.context";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  const nav = useNavigate();

  useEffect(() => {
    if (user.role !== "staff" && user.role !== "admin") {
      nav("/forbidden");
    }
  });

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
