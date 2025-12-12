import Container from "../components/container/Container";
import EveryDayCard from "../components/everyday/EveryDayCard";
import type { CardProps } from "../types/CardProps";

const FavoriteNews = () => {
  const fvtCard: CardProps[] = [
    {
      image:
        "https://static.cricbuzz.com/a/img/v1/i1/c796689/pat-cummins-included-in-squad-for-adelaide-test.jpg?d=high&p=det",
      tag: "শিক্ষা",
      title: "শিক্ষা খাতে নতুন বাজেট বরাদ্দ",
      time: "9 ঘণ্টা আগে",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMddOOZjnz4MMCugzI1H82t54R4pnV-aFT6Q&s",
      tag: "পরিবেশ",
      title: "ঢাকায় নতুন ফ্লাইওভার উদ্বোধন",
      time: "14 ঘণ্টা আগে",
    },
    {
      image:
        "https://cdn.vectorstock.com/i/1000v/48/08/politic-liar-deceitful-politician-with-pinocchio-vector-47614808.jpg",
      tag: "খেলা",
      title: "জাতীয় ক্রিকেট দলের ঐতিহাসিক জয়",
      time: "2 ঘণ্টা আগে",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPuH1kQAHVumAHPRWTTiKwatTPA81-bT_M_Q&s",
      tag: "অর্থনীতি",
      title: "অর্থনীতিতে ইতিবাচক প্রবৃদ্ধির লক্ষণ",
      time: "৪ ঘণ্টা আগে",
    },
  ];
  return (
    <div className="bg-gray-200 py-8 ">
      <Container className="">
        <div className="flex flex-col gap-x-2">
          <div className="flex items-center gap-x-2">
            <div className="w-[5px]  bg-red-500 h-7 "></div>
            <h2 className=" font-extrabold text-[27px] font-primary text-black  ">
              সম্পাদকের পছন্দ
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1  sm:grid-colss-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-5">
          {fvtCard.map((card, i) => (
            <EveryDayCard key={i} {...card} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FavoriteNews;
