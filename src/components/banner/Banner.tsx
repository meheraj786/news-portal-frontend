import { MdWatchLater } from "react-icons/md";
import MiniCard from "./MiniCart";
import Container from "../container/Container";
import Slider from "react-slick";
import { useFetchTrendingPosts } from "@/api/hooks/post";

// ১. একটি ইন্টারফেস তৈরি করা যাতে টাইপস্ক্রিপ্ট বুঝতে পারে ডেটা কেমন হবে
interface Post {
  _id: string;
  title: string;
  category:
    | {
        _id: string;
        name: string;
      }
    | string;
  image?: {
    url: string;
  };
  createdAt: string;
  link?: string;
}

const Banner: React.FC = () => {
  // টাইপ ডিফাইন করে দেওয়া হলো
  const { data: posts } = useFetchTrendingPosts() as {
    data: Post[] | undefined;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <Container>
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-5">
          {/* Main trending card */}
          <div className="relative w-full md:w-[70%] overflow-hidden rounded ">
            <Slider {...settings} className="overflow-hidden">
              {posts?.map((item, i) => (
                <div key={i}>
                  <div className="relative overflow-hidden rounded-lg group">
                    {/* IMAGE - Optional Chaining ব্যবহার করা হয়েছে */}
                    <img
                      src={
                        item.image?.url || "https://via.placeholder.com/800x500"
                      }
                      alt={item.title}
                      className="w-full h-80 sm:h-[360px] md:h-[400px] xl:h-[530px] object-cover transition-transform duration-300 rounded-lg md:group-hover:scale-105"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* CONTENT WRAPPER */}
                    <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 gap-2 rounded-lg">
                      {/* CATEGORY - Type casting ব্যবহার করে এরর দূর করা হয়েছে */}
                      <span className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full w-fit">
                        {typeof item.category === "object"
                          ? (item.category as any)?.name
                          : item.category}
                      </span>

                      {/* TITLE */}
                      <p className="text-white font-medium text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
                        {item.title}
                      </p>

                      {/* TIME */}
                      <div className="flex items-center gap-x-1.5 text-gray-300 text-xs sm:text-sm">
                        <MdWatchLater />
                        <span>
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : ""}
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

            <div className=" flex flex-col gap-y-2.5  ">
              {posts?.map((card, i) => (
                <MiniCard key={i} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
