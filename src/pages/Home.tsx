import EveryDay from "../components/everyday/EveryDay";

import Trending from "../components/trending/Trending";
import FavoriteNews from "../favoritenews/FavoriteNews";

const Home = () => {
  return (
    <>
      <div className="bg-white pt-40">
        <Trending></Trending>
        <FavoriteNews></FavoriteNews>
        <EveryDay></EveryDay>
      </div>
    </>
  );
};

export default Home;
