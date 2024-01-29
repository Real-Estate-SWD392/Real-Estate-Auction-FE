import AuctionDetail from "../auction detail/AuctionDetail";
import Home from "../home/Home";
import Layout from "../layout/Layout";


const AppRoutes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path:"",
                element: <Home/>
            },
            {
                path:"/detail",
                element: <AuctionDetail/>
            }
            
        ]
    }
]

export default AppRoutes;