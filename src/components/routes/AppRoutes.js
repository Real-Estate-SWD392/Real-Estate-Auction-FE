import AuctionDetail from "../auction detail/AuctionDetail";
import AuctionDetail1 from "../auction detail/AuctionDetail1";
import Home from "../home/Home";
import Layout from "../layout/Layout";
import SearchComponent from "../search-auction-list/SearchComponent";
import SellerComponent from "../seller-dashboard/SellerComponent";
import ProfileComponent from "../user-settings/ProfileComponent";

const AppRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auctions",
        element: <SearchComponent />,
      },
      {
        path: "/auctions/:id",
        element: <AuctionDetail1 />,
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
      {
        path: "/my-account",
        element: (
          <ProfileComponent
            userName={"Anh Anhidaiowudoiauwdiouaw"}
            userEmail={"phucanhdodang1211@gmail.com"}
          />
        ),
      },
    ],
  },
];

export default AppRoutes;
