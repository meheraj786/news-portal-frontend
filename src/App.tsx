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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./dashboard/pages/Categories";
import Posts from "./dashboard/pages/Posts";
import NavMenu from "./dashboard/pages/NavMenu";
import { AddPost } from "./dashboard/pages/AddPost";
import Subscription from "./dashboard/pages/Subscription";
import Ads from "./dashboard/pages/ads";

const queryClient = new QueryClient();
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
        path: "category/:id",
        Component: CategoryPage,
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
    children: [
      { index: true, element: <DashHome /> },
      { path: "/dashboard/categories", element: <Categories /> },
      { path: "/dashboard/posts", element: <Posts /> },
      { path: "/dashboard/nav", element: <NavMenu /> },
      { path: "/dashboard/add-post", element: <AddPost /> },
      { path: "/dashboard/subscription", element: <Subscription /> },
      { path: "/dashboard/ads", element: <Ads /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
