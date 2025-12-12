import type { CardProps } from "../../types/CardProps";
import Container from "../container/Container";
import EveryDayCard from "./EveryDayCard";

const EveryDay = () => {
  const everyday: CardProps[] = [
    {
      image: "https://theunitedindian.com/images/crime-13-04-24-M-hero.webp",
      tag: "অর্থনীতি",
      time: "1 Hour ago",
      title: "সংসদে আজ গুরুত্বপূর্ণ বিল পাশ",
      description: "ঢাকায় নতুন স্কাইটাওয়ার উদ্বোধন",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPuH1kQAHVumAHPRWTTiKwatTPA81-bT_M_Q&s",
      tag: "অর্থনীতি",
      time: "৩ ঘণ্টা আগে",
      title: "জাতীয় ক্রিকেট দলের ঐতিহাসিক জয়",
      description: "শিক্ষায় নতুন বাজারের সৃষ্টি",
    },
    {
      image:
        "https://static.cricbuzz.com/a/img/v1/i1/c796689/pat-cummins-included-in-squad-for-adelaide-test.jpg?d=high&p=det",
      tag: "অর্থনীতি",
      title: "বাজারে আসছে নতুন রেকর্ড",
      time: "৪ ঘণ্টা আগে",
      description: "জাতীয় ক্রিকেট দলের ঐতিহাসিক জয়",
    },
    {
      image:
        "https://static.cricbuzz.com/a/img/v1/i1/c796689/pat-cummins-included-in-squad-for-adelaide-test.jpg?d=high&p=det",
      tag: "অর্থনীতি",
      title: "বাজারে আসছে নতুন রেকর্ড",
      time: "৪ ঘণ্টা আগে",
      description: "অর্থনীতিতে গুরুত্বপূর্ণ প্রবৃদ্ধি",
    },
    {
      image:
        "https://static.cricbuzz.com/a/img/v1/i1/c796689/pat-cummins-included-in-squad-for-adelaide-test.jpg?d=high&p=det",
      tag: "অর্থনীতি",
      title: "বাজারে আসছে নতুন রেকর্ড",
      time: "৪ ঘণ্টা আগে",
      description: "ঢাকায় নতুন মেডিকেল স্টোরে দোকান উদ্বোধন",
    },
  ];
  return (
    <Container>
      <div className="py-8 ">
        <div className="flex justify-between  ">
          <div className=" w-[70%] ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
              {everyday.map((card, i) => (
                <EveryDayCard key={i} {...card} />
              ))}
            </div>
          </div>
          <div className="w-[35%] "></div>
        </div>
      </div>
    </Container>
  );
};

export default EveryDay;
