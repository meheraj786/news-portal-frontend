import Header from "../header/Header";
import { Outlet } from "react-router";
import Topheader from "../components/topheader/Topheader";
import Footer from "../components/footer/Footer";
import { useFetchNavMenu } from "@/api/hooks/navMenu";
import Loader from "@/components/Loader/Loader";

const RootLayout = () => {
  const {isLoading}= useFetchNavMenu();
  // if (isLoading) return <Loader/>
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
