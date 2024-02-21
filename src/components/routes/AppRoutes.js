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
];

export default AppRoutes;
