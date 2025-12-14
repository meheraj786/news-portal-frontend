import "./App.css";
import Login from "./dashboard/pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import DashRootLayout from "./dashboard/layout/DashRootLayout";
import DashHome from "./dashboard/pages/DashHome";
import BlogSinglePost from "./pages/BlogSinglePost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "/single-post",
        element: <BlogSinglePost />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashRootLayout />,
    children: [{ index: true, element: <DashHome /> }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
