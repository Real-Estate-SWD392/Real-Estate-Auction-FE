import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import ResponsiveAppBar from "./navbar/Navbar";

const Layout = () => {
  return (
    <div className="layout-container">
      <ResponsiveAppBar userName={"Phuc Anh Do Dang"} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
