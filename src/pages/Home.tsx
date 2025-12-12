import EveryDay from "../components/everyday/EveryDay";
import Banner from "../components/banner/Banner";
import FavoriteNews from "../favoritenews/FavoriteNews";
const Home = () => {
  return (
    <>
      <div className="bg-white pt-40">
        <Banner></Banner>
        <FavoriteNews></FavoriteNews>
        <EveryDay></EveryDay>
      </div>
    </>
  );
};

export default Home;
