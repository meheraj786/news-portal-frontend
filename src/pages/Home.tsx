import React from "react";
import Container from "../components/container/Container";
import Trending from "../components/trending/Trending";
import FavoriteNews from "../favoritenews/FavoriteNews";

const Home = () => {
  return (
    <>
      <div className="bg-white">
        <Trending></Trending>
        <FavoriteNews></FavoriteNews>
      </div>
    </>
  );
};

export default Home;
Home;
