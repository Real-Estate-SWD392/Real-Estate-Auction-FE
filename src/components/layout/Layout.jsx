import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import ResponsiveAppBar from "./navbar/Navbar";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* get authorization token here and get the userName from authorization token */}
      <ResponsiveAppBar userName={""} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
