import AuctionDetail from "../auction detail/AuctionDetail";
import AuctionDetail1 from "../auction detail/AuctionDetail1";
import Home from "../home/Home";
import Layout from "../layout/Layout";
import SearchComponent from "../search-auction-list/SearchComponent";
import AddProperties from "../seller-dashboard/AddProperties";
import MyListings from "../seller-dashboard/MyListings/MyListings";
import MyProfile from "../seller-dashboard/MyProfile";
import SellerComponent from "../seller-dashboard/SellerComponent";
import UpdateProperty from "../seller-dashboard/UpdateProperty/UpdateProperty";
import UpdatePropertyList from "../seller-dashboard/UpdateProperty/UpdatePropertyList";
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
        path: "/auction_detail/:id",
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
        children: [
          {
            path: "add",
            element: <AddProperties />,
          },
          {
            path: "profile",
            element: <MyProfile />,
          },
          {
            path: "property-list",
            element: <UpdatePropertyList />,
          },

          {
            path: "update/:id",
            element: <UpdateProperty />,
          },
          {
            path: "auction-list",
            element: <MyListings />,
          },
        ],
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
