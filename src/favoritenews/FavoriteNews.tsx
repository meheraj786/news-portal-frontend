import React from "react";
import Container from "../components/container/Container";
import FavoriteNewsCard from "./FavoriteNewsCard";
import fvt from "../assets/fvt2.jpeg";
import fvt2 from "../assets/fvt3.jpg";
import trending from "../assets/trending.jpeg";
import cricket from "../assets/cricket.jpg";

const FavoriteNews = () => {
  const fvtCada = [
    {
      image: trending,
      tag: "শিক্ষা",
      title: "শিক্ষা খাতে নতুন বাজেট বরাদ্দ",
    },
    {
      image: fvt2,
      tag: "পরিবেশ",
      title: "ঢাকায় নতুন ফ্লাইওভার উদ্বোধন",
    },
    {
      image: fvt2,
      tag: "খেলা",
      title: "জাতীয় ক্রিকেট দলের ঐতিহাসিক জয়",
    },
    {
      image: cricket,
      tag: "অর্থনীতি",
      title: "অর্থনীতিতে ইতিবাচক প্রবৃদ্ধির লক্ষণ",
    },
  ];
  return (
    <div className="bg-gray-200">
      <Container className="">
        <div className="py-8 ">
          <div className="flex flex-col gap-x-2">
            <div className="flex items-center gap-x-2">
              <div className="w-[5px] bg-red-500 h-[28px] "></div>
              <h2 className=" font-extrabold text-[27px] font-primary text-black  ">
                সম্পাদকের পছন্দ
              </h2>
            </div>
            <div className="flex items-center gap-x-2.5">
              {fvtCada.map((card, i) => (
                <FavoriteNewsCard key={i} {...card} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FavoriteNews;
