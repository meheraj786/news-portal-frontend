import EveryDay from "../components/everyday/EveryDay";
import Banner from "../components/banner/Banner";
import FavoriteNews from "../favoritenews/FavoriteNews";
import Ads from "../components/ads/Ads";
import NewsItems from "@/components/newsitems/NewsItems";
const Home = () => {
  return (
    <>
      <div className="bg-white pt-40">
        <Banner></Banner>
        <FavoriteNews></FavoriteNews>
        <Ads></Ads>
        <EveryDay></EveryDay>
        <NewsItems></NewsItems>
      </div>
    </>
  );
};

export default Home;
