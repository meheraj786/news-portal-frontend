import "./App.css";
import Login from "./dashboard/pages/Login";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import DashRootLayout from "./dashboard/layout/DashRootLayout";
import AuthSimpleLayout from "./dashboard/layout/AuthSimpleLayout";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";
import DashHome from "./dashboard/pages/DashHome";
import BlogSinglePost from "./pages/BlogSinglePost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./dashboard/pages/Categories";
import Posts from "./dashboard/pages/Posts";
import NavMenu from "./dashboard/pages/NavMenu";
import Subscription from "./dashboard/pages/Subscription";
import Ads from "./dashboard/pages/Ads";
import AddPost from "./dashboard/pages/AddPost";
import EmailVerification from "./dashboard/pages/EmailVerification";
import ResetPassword from "./dashboard/pages/ResetPassword";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  /* ----------------------------------------------------------------
     1. PUBLIC ROUTES (Login, Verify, Reset)
     - Wrapped in AuthSimpleLayout for the white box design
  ---------------------------------------------------------------- */
  {
    element: <AuthSimpleLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "verify-otp",
        element: <EmailVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  /* ----------------------------------------------------------------
     2. PROTECTED ROUTES (Dashboard)
     - Wrapped in ProtectedRoute to blocking access
  ---------------------------------------------------------------- */
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashRootLayout />,
        children: [
          { index: true, element: <DashHome /> },
          { path: "categories", element: <Categories /> },
          { path: "posts", element: <Posts /> },
          { path: "nav", element: <NavMenu /> },
          { path: "add-post", element: <AddPost /> },
          { path: "subscription", element: <Subscription /> },
          { path: "ads", element: <Ads /> },
        ],
      },
    ],
  },
  /* ----------------------------------------------------------------
     3. ROOT REDIRECT
     - Redirects root "/" to "/dashboard"
     - The ProtectedRoute will then kick them to /login if needed
  ---------------------------------------------------------------- */
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
        path: "/single-post/:id",
        element: <BlogSinglePost />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* ২. HelmetProvider দিয়ে সবকিছু মুড়িয়ে দিন */}
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {/* ৩. এটি RouterProvider-এর মাধ্যমে আপনার সব পেজে এসইও ডাটা পাঠাবে */}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
