import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import ScrollToTop from "../../ScrollToTop";

const router = createBrowserRouter(AppRoutes);

const Router = () => {
  return (
    <>
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </>
  );
};

export default Router;
