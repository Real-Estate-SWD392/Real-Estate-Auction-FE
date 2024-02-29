import TestComponent from "../TestComponent";
import AdminDashboard from "../admin/AdminDashboard";
import AdminLogin from "../admin/AdminLogin";
import AuctionManagement from "../admin/AuctionManagement";
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
import MyProfile from "../seller-dashboard/MyProfile";
import SellerComponent from "../seller-dashboard/SellerComponent";
import MyBids from "../user-settings/MyBids/MyBids";
import ProfileComponent from "../user-settings/ProfileComponent";
import SavedAuctions from "../user-settings/SavedAuctions/SavedAuctions";
import WinningBids from "../user-settings/WinningBids/WinningBids";

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
    path: "/successful-payment",
    element: <SuccessPayment />,
  },
  {
    path: "/test",
    element: <TestComponent />,
  },
];

export default AppRoutes;
