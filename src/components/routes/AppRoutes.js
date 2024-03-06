import AdminDashboard from "../admin/AdminDashboard";
import AdminLogin from "../admin/AdminLogin";
import AuctionManagement from "../admin/AuctionManagement";
import ReportManagement from "../admin/ReportManagement";
import UserManagement from "../admin/UserManagement";
import AuctionDetail from "../auction detail/AuctionDetail";
import AuctionDetail1 from "../auction detail/AuctionDetail1";
import Forbidden403 from "../forbidden-page/Forbidden403";
import Home from "../home/Home";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import MyAccountLayout from "../layout/MyAccountLayout";
import SearchComponent from "../search-auction-list/SearchComponent";
import MyBids from "../user-settings/MyBids/MyBids";
import AddProperties from "../seller-dashboard/AddProperties";
import MyListings from "../seller-dashboard/MyListings/MyListings";
import MyProfile from "../seller-dashboard/MyProfile";
import SellerComponent from "../seller-dashboard/SellerComponent";
import UpdateProperty from "../seller-dashboard/UpdateProperty/UpdateProperty";
import UpdatePropertyList from "../seller-dashboard/UpdateProperty/UpdatePropertyList";
import ProfileComponent from "../user-settings/ProfileComponent";
import SavedAuctions from "../user-settings/SavedAuctions/SavedAuctions";
import WinningBids from "../user-settings/WinningBids/WinningBids";
import ProtectedRoutes from "./ProtectedRoutes";
import PaymentHistory from "../seller-dashboard/PaymentHistory";

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
          <ProtectedRoutes name={"sell"}>
          <SellerComponent
            userName={"Anh Anhidaiowudoiauwdiouaw"}
            userEmail={"phucanhdodang1211@gmail.com"}
          />
          </ProtectedRoutes>
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
    ],
  },

  {
    path: "/my-account",
    element: <MyAccountLayout />,
    children: [
      {
        path: "/my-account",
        element: <MyProfile />,
      },
      {
        path: "/my-account/my-bids",
        element: <MyBids />,
      },
      {
        path: "/my-account/saved",
        element: <SavedAuctions />,
      },
      {
        path: "/my-account/winning-bids",
        element: <WinningBids />,
      },
      {
        path: "/my-account/payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
  {
    path: "/accommondation-admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/accommondation-admin",
        element: <AdminDashboard />,
      },
      {
        path: "/accommondation-admin/auction-management",
        element: <AuctionManagement />,
      },
      {
        path: "/accommondation-admin/user-management",
        element: <UserManagement />,
      },
      {
        path: "/accommondation-admin/reports",
        element: <ReportManagement />,
      },
    ],
  },
  {
    path: "/accommondation-admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/forbidden",
    element: <Forbidden403 />,
  },
];

export default AppRoutes;
