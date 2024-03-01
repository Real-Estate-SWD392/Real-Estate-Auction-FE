import TestComponent from "../TestComponent";
import AdminDashboard from "../admin/AdminDashboard";
import AdminLogin from "../admin/AdminLogin";
import ReportManagement from "../admin/ReportManagement";
import UserManagement from "../admin/UserManagement";
import AuctionDetail from "../auction detail/AuctionDetail";
import AuctionDetail1 from "../auction detail/AuctionDetail1";
import Home from "../home/Home";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import MyAccountLayout from "../layout/MyAccountLayout";
import SuccessPayment from "../payment/SuccessPayment";
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
import Forbidden403 from "../forbidden-page/Forbidden403";
import StaffLayout from "../layout/StaffLayout";
import AuctionManagement from "../staff/AuctionManagement";
import ProtectedRoutes from "./ProtectedRoutes";

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
    ],
  },
  {
    path: "/accommondation-admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/accommondation-admin/dashboard",
        element: <AdminDashboard />,
      },

      {
        path: "/accommondation-admin/user-management",
        element: <UserManagement />,
      },
    ],
  },

  {
    path: "/accommondation-staff",
    element: <StaffLayout />,
    children: [
      {
        path: "/accommondation-staff/auction-management",
        element: <AuctionManagement />,
      },
      {
        path: "/accommondation-staff/reports",
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

  { path: "/bill/:id", element: <SuccessPayment /> },
  {
    path: "/test",
    element: <TestComponent />,
  },
];

export default AppRoutes;
