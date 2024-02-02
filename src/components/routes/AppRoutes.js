import AuctionDetail from "../auction detail/AuctionDetail";
import Home from "../home/Home";
import Layout from "../layout/Layout";
import SearchComponent from "../search-auction-list/SearchComponent";
import SellerComponent from "../seller-dashboard/SellerComponent";

const AppRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/auctions",
        element: <SearchComponent />,
      },
      {
        path: "/detail",
        element: <AuctionDetail />,
      },
      {
        path: "/sell",
        element: (
          <SellerComponent
            userName={"Anh Anhidaiowudoiauwdiouaw"}
            userEmail={"phucanhdodang1211@gmail.com"}
          />
        ),
      },
    ],
  },
];

export default AppRoutes;
