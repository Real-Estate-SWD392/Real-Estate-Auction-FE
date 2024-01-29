import Home from "../home/Home";
import Layout from "../layout/Layout";
import SearchComponent from "../search-auction-list/SearchComponent";
import SellerComponent from "../seller-dashboard/SellerComponent";

const AppRoutes = [
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/auctions",
    element: <SearchComponent />,
  },
  {
    path: "/sell",
    element: <SellerComponent />,
  },
];

export default AppRoutes;
