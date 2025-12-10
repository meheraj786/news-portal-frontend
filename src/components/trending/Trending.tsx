import React from "react";
import trending from "../../assets/trending.jpeg";
const Trending = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-[20px]">
        {/* main trending cart */}
        <div className="relative  w-[70%] ">
          <div className="relative  ">
            <img
              className="object-cover w-full rounded  "
              src={trending}
              alt=""
            />

            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="absolute bottom-[140px] left-[50px] text-white py-2 px-[7px] bg-red-500 text-white inline-block  rounded-[10px] ">
            আন্তর্জাতিক
          </div>
          <p className="w-[85%] absolute bottom-[65px] left-[50px] text-white font-primary font-medium   text-[17px] ">
            সংসদে আজ গুরুত্বপূর্ণ বিল পাশ, দেশের উন্নয়নে নতুন মাইলফলক মাহমুদ
            হাসান মাহমুদ হাসান ১৫ নভেম্বর, ২০২৫ ৫ মি
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trending;
