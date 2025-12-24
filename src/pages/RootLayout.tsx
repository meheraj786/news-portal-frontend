import Header from "../header/Header";
import { Outlet } from "react-router";
import Topheader from "../components/topheader/Topheader";
import Footer from "../components/footer/Footer";
import ScrollToTop from "@/components/schrolltotop/SchrollToTop";

const RootLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Topheader />
      <Header></Header>

      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
