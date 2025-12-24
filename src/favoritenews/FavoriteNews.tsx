import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router";
import { useFetchAllPosts } from "@/api/hooks/post";
import Container from "../components/container/Container";
import EveryDayCard from "../components/everyday/EveryDayCard";
import type { CardProps } from "@/types/CardProps";
import { Button } from "@/components/ui/button";

// Custom Next Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-[-45px] transform -translate-y-1/2 bg-gray-200 text-black p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all z-10"
    >
      <MdArrowForwardIos size={18} />
    </button>
  );
};

// Custom Previous Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-12 top-[-45px] transform -translate-y-1/2 bg-gray-200 text-black p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all z-10"
    >
      <MdArrowBackIos size={18} />
    </button>
  );
};

const FavoriteNews = () => {
  const { data: posts, isLoading } = useFetchAllPosts();

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  if (isLoading) {
    return <div className="py-10 text-center">লোড হচ্ছে...</div>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <Container>
        {/* Title Section with Red Accent */}
        <div className="  flex flex-col gap-x-2">
          <div className="flex items-center gap-x-2">
            <div className="w-[5px]  bg-red-500 h-7 "></div>
            <h2 className=" font-extrabold text-[27px] font-primary text-black  ">
              বিশেষ প্রতিবেদন
            </h2>
          </div>
        </div>

        {/* Slider Section */}
        <div className="slider-container relative">
          <Slider {...settings}>
            {Array.isArray(posts) &&
              posts.map((card: CardProps, i: number) => (
                <div key={card._id || i} className="px-2">
                  <EveryDayCard {...card} />
                </div>
              ))}
          </Slider>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 mb-10 md:mb-0">
          <Link to="/category/all">
            <Button>সব সংবাদ দেখুন</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FavoriteNews;
