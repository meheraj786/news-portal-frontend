import Header from "../header/Header";
import { Outlet } from "react-router";
import Topheader from "../components/topheader/Topheader";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Topheader />
      <Header></Header>

      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
