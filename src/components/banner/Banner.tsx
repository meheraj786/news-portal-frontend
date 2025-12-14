import { MdWatchLater } from "react-icons/md";
import MiniCard from "./MiniCart";
import Container from "../container/Container";
import type { CardProps } from "../../types/CardProps";
import Slider from "react-slick";

const Banner: React.FC = () => {
  const cardData: CardProps[] = [
    {
      image: "https://theunitedindian.com/images/crime-13-04-24-M-hero.webp",
      tag: "অর্থনীতি",
      title: "সংসদে আজ গুরুত্বপূর্ণ বিল পাশ, দেশের উন্নয়নে নতুন মাইলফলক",
      time: "1 Hour ago",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPuH1kQAHVumAHPRWTTiKwatTPA81-bT_M_Q&s",
      tag: "অর্থনীতি",
      title: "জাতীয় ক্রিকেট দলের ঐতিহাসিক জয়",
      time: "৩ ঘণ্টা আগে",
    },
    {
      image:
        "https://static.cricbuzz.com/a/img/v1/i1/c796689/pat-cummins-included-in-squad-for-adelaide-test.jpg?d=high&p=det",
      tag: "অর্থনীতি",
      title: "বাজারে আসছে নতুন রেকর্ড",
      time: "৪ ঘণ্টা আগে",
    },
  ];

  const latestNews: CardProps[] = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
      tag: " আন্তর্জাতিক",
      title: `সংসদে আজ গুরুত্বপূর্ণ বিল পাশ, দেশের উন্নয়নে নতুন মাইলফলক মাহমুদ
                হাসান মাহমুদ হাসান ১৫ নভেম্বর, ২০২৫ ৫ মি`,

      time: "1 Hour ago",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bV1J79Xqdkm0C2pIFZ8uoSPA05myxkdMVg&s",
      tag: "অর্থনীতি",
      title: "জাতীয় ক্রিকেট দলের ঐতিহাসিক জয়",
      time: "৩ ঘণ্টা আগে",
    },
    {
      image: "https://cdn.britannica.com/68/6268-050-04FB8622/Bangladesh.jpg",
      tag: "অর্থনীতি",
      title: "বাজারে আসছে নতুন রেকর্ড",
      time: "৪ ঘণ্টা আগে",
    },
  ];
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
        <div className="flex flex-col sm:flex-row  justify-between items-start  gap-5">
          {/* Main trending card */}
          <div className="relative w-full md:w-[70%] overflow-hidden rounded-xl shadow-sm">
            <Slider {...settings} className="overflow-hidden">
              {latestNews.map((item, i) => (
                <div key={i}>
                  <div className="relative overflow-hidden rounded-xl group">
                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
            w-full
            h-[320px] sm:h-[360px] md:h-[400px] lg:h-[440px]
            object-cover
            transition-transform duration-300
            md:group-hover:scale-105
          "
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* CONTENT WRAPPER */}
                    <div
                      className="
            absolute inset-0
            flex flex-col justify-end
            px-4 sm:px-6 md:px-8
            pb-4 sm:pb-6
            gap-2
          "
                    >
                      {/* TAG */}
                      <span className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full w-fit">
                        {item.tag}
                      </span>

                      {/* TITLE */}
                      <p className="text-white font-medium text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
                        {item.title}
                      </p>

                      {/* TIME */}
                      <div className="flex items-center gap-x-1.5 text-gray-300 text-xs sm:text-sm">
                        <MdWatchLater />
                        <span>{item.time}</span>
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
            <div className="w-full bg-red-500 h-[2px]"></div>

            {/* Mini trending card */}

            <div className=" flex flex-col gap-y-2.5  ">
              {cardData.map((card, i) => (
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
