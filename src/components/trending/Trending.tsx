import React from "react";
import trending from "../../assets/trending.jpeg";
import { MdWatchLater } from "react-icons/md";
import cricket from "../../assets/cricket.jpg";
import MiniCard from "./MiniCart";
import Container from "../container/Container";

const Trending: React.FC = () => {
  const cardData = [
    {
      image: cricket, // আপনার ছবি পাথ দিন
      tag: "আন্তর্জাতিক",
      title: "সংসদে আজ গুরুত্বপূর্ণ বিল পাশ, দেশের উন্নয়নে নতুন মাইলফলক",

      time: "1 Hour ago",
    },
    {
      image: trending,
      tag: "খেলাধুলা",
      title: "জাতীয় ক্রিকেট দলের ঐতিহাসিক জয়",
      time: "৩ ঘণ্টা আগে",
    },
    {
      image: cricket,
      tag: "অর্থনীতি",
      title: "বাজারে আসছে নতুন রেকর্ড",
      time: "৪ ঘণ্টা আগে",
    },
  ];
  return (
    <Container>
      <div className="px-4  py-5">
        <div className="flex flex-col md:flex-row  justify-between items-center  gap-5">
          {/* Main trending card */}
          <div className="relative md:w-[70%] overflow-hidden rounded-lg">
            <div className="relative group  ">
              <img
                className="object-cover w-full  group-hover:scale-105  transition-all duration-250 "
                src={trending}
                alt="Trending"
              />
              <div className="group-hover:scale-105 transition-all duration-250   absolute inset-0 bg-black/50 "></div>
            </div>

            <div className="absolute bottom-[140px] left-[50px] text-white py-2 px-3 bg-red-500 text-white inline-block rounded-[10px]">
              আন্তর্জাতিক
            </div>
            <p className="w-[85%] absolute bottom-[65px] left-[50px] text-white font-primary font-medium text-[17px]">
              সংসদে আজ গুরুত্বপূর্ণ বিল পাশ, দেশের উন্নয়নে নতুন মাইলফলক মাহমুদ
              হাসান মাহমুদ হাসান ১৫ নভেম্বর, ২০২৫ ৫ মি
            </p>
            <div className="absolute bottom-5 left-20 flex items-center gap-x-1.5">
              <MdWatchLater className="text-white" />
              <p className="text-gray-300 font-primary font-medium">
                1 Hour ago
              </p>
            </div>
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
            {/* <div className="flex items-center gap-x-2 border border-gray-200 shadow-md py-3 rounded">
            <div className="w-[40%] h-full">
            <img
                className="object-cover rounded"
                src={cricket}
                alt="Cricket"
                />
                </div>
                <div className="flex gap-y-2.5">
                <p className="font-primary font-medium border-gray-300 border py-1 px-1.5 rounded-[18px] text-[17px]">
                Topic
                </p>
                </div>
          </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Trending;
