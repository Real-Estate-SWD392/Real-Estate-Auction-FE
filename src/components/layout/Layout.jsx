import Home from "../home/Home";
import ResponsiveAppBar from "./Navbar";


const Layout = () => {
    return (
        <div className="layout-container">
            <ResponsiveAppBar/>
            <Home/>
        </div>
    )
}

export default Layout;