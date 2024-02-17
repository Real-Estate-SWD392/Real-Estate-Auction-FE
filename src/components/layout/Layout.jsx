import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import ResponsiveAppBar from "./navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="layout-container">
      {/* get authorization token here and get the userName from authorization token */}
<<<<<<< HEAD
      <ResponsiveAppBar
        userName={user ? user.firstName + " " + user.lastName : ""}
      />

=======
      <ResponsiveAppBar userName={"anh anh"} />
>>>>>>> phanh
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
