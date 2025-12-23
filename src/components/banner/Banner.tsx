import React from "react";
import { MdWatchLater } from "react-icons/md";
import MiniCard from "./MiniCart";
import Container from "../container/Container";
import Slider from "react-slick";
import { useFetchTrendingPosts } from "@/api/hooks/post";
import DateFormatter from "../DateFormatter";

// 1. Update interface to match your Console Log
interface Post {
  _id: string;
  viewCount: number;
  category: {
    _id: string;
    name: string;
  };
  postDetails: {
    title: string;
    content: string;
    image: {
      url: string;
    };
    createdAt: string;
  };
}

const Banner: React.FC = () => {
  const { data, isLoading } = useFetchTrendingPosts();

  // Based on your console, data is already the array
  const posts = (data as unknown as Post[]) || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (isLoading) return <div className="text-center py-10">Loading Banner...</div>;
  if (posts.length === 0) return null;

  return (
    <Container>
      <div className="py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-5">
          {/* Main trending slider */}
          <div className="relative w-full md:w-[70%] overflow-hidden rounded">
            <Slider {...settings}>
              {posts.map((item: Post) => (
                <div key={item._id}>
                  <div className="relative overflow-hidden rounded-lg group">
                    <img
                      // FIX: Accessing via postDetails
                      src={item.postDetails.image?.url || ""}
                      alt={item.postDetails.title}
                      className="w-full h-80 sm:h-[360px] md:h-[400px] xl:h-[530px] object-cover rounded-lg"
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute inset-0 flex flex-col justify-end px-8 pb-6 gap-2">
                      <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full w-fit">
                        {item.category?.name || "General"}
                      </span>

                      <h2 className="text-white font-medium text-xl leading-snug line-clamp-2">
                        {/* FIX: Accessing via postDetails */}
                        {item.postDetails.title}
                      </h2>

                      <div className="flex items-center gap-x-1.5 text-gray-300 text-sm">
                        <MdWatchLater />
                        <span>
                          <DateFormatter date={item.postDetails.createdAt} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Trending sidebar */}
          <div className="w-full md:w-[40%] flex flex-col gap-y-4">
            <h2 className="font-primary font-semibold text-2xl">Trending</h2>
            <div className="w-full bg-red-500 h-0.5"></div>

            <div className="flex flex-col gap-y-2.5">
              {posts.map((item: Post) => (
                <MiniCard
                  key={item._id}
                  _id={item._id}
                  title={item.postDetails.title}
                  createdAt={item.postDetails.createdAt}
                  image={item.postDetails.image} // Pass the object {url: string}
                  category={item.category} // Pass the object {name: string}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;