import React from "react";
import { MdWatchLater } from "react-icons/md";
import MiniCard from "./MiniCart";
import Container from "../container/Container";
import Slider from "react-slick";
import { useFetchTrendingPosts } from "@/api/hooks/post";

// ১. Backend Aggregation onujayi Interface thik kora
interface TrendingPost {
  _id: string;
  viewCount: number;
  postDetails: {
    tag: string;
    title: string;
    image: {
      url: string;
      publicId: string;
    };
    createdAt: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
}

const Banner: React.FC = () => {
  // ২. Hook theke data ana (Type casting kora holo)
  const { data: posts, isLoading } = useFetchTrendingPosts() as {
    data: TrendingPost[] | undefined;
    isLoading: boolean;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: { dots: false },
      },
    ],
  };

  if (isLoading)
    return <div className="text-center py-10">Loading Banner...</div>;

  return (
    <Container>
      <div className="py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-5">
          {/* Main trending slider */}
          <div className="relative w-full md:w-[70%] overflow-hidden rounded">
            <Slider {...settings} className="overflow-hidden">
              {posts?.map((item) => (
                <div key={item._id}>
                  <div className="relative overflow-hidden rounded-lg group">
                    {/* IMAGE: postDetails theke nite hobe */}
                    <img
                      src={
                        item.postDetails?.image?.url ||
                        "https://via.placeholder.com/800x500"
                      }
                      alt={item.postDetails?.title}
                      className="w-full h-80 sm:h-[360px] md:h-[400px] xl:h-[530px] object-cover transition-transform duration-300 rounded-lg md:group-hover:scale-105"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 gap-2 rounded-lg">
                      {/* CATEGORY: Backend theke direct object asche */}
                      <span className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full w-fit">
                        {item.category?.name || "News"}
                      </span>

                      {/* TITLE: postDetails theke */}
                      <h2 className="text-white font-medium text-sm sm:text-base md:text-xl leading-snug line-clamp-2">
                        {item.postDetails?.title}
                      </h2>

                      {/* VIEWS & TIME */}
                      <div className="flex items-center gap-x-4 text-gray-300 text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <MdWatchLater />
                          <span>
                            {item.postDetails?.createdAt
                              ? new Date(
                                  item.postDetails.createdAt
                                ).toLocaleDateString()
                              : ""}
                          </span>
                        </div>
                        <span className="text-orange-400 font-bold flex items-center gap-1">
                          🔥 {item.viewCount} Views
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
              {posts?.map((item) => (
                <MiniCard
                  key={item._id}
                  // MiniCard-er props gulo backend onujayi pathate hobe
                  title={item.postDetails?.title}
                  tag={item.postDetails?.tag}
                  image={item.postDetails?.image}
                  category={item.category}
                  createdAt={item.postDetails?.createdAt}
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
