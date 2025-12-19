import type { CardProps } from "../../types/CardProps";
import Container from "../container/Container";
import EveryDayCard from "./EveryDayCard";
import CategoriesCard from "../../components/categoriescard/CategoriesCard";
import { CategoriesList } from "../../components/categoriescard/CategoriesList";
import TagCard from "../tag/tagcard/TagCard";
import { TagList } from "../tag/tagdata/TagList";
import NewsCard from "../newsitems/NewsCard";
import { useSubscribe } from "@/api/hooks/subscribtion";
import { useState } from "react";
import { toast } from "sonner";

const EveryDay = () => {
  const subscripMutation = useSubscribe();
  const [subEmail, setSubEmail] = useState("");
  const handleSubmit = () => {
    subscripMutation.mutate(subEmail, {
      onSuccess: () => {
        toast.success("subscrip");
        setSubEmail("");
      },
    });
  };
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
    <div className="py-8 bg-gray-50  ">
      <Container>
        <div className="  flex flex-col gap-x-2">
          <div className="flex items-center gap-x-2">
            <div className="w-[5px]  bg-red-500 h-7 "></div>
            <h2 className=" font-extrabold text-[27px] font-primary text-black  ">
              বিশেষ প্রতিবেদন
            </h2>
          </div>
        </div>
        <div className="  flex flex-col lg:flex-row justify-between py-8  ">
          <div className=" py-8 w-full lg:w-[67%] ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
              {everyday.map((card, i) => (
                <EveryDayCard key={i} {...card} />
              ))}
            </div>
          </div>

          <div className=" w-full lg:w-[30%] ">
            <div className=" flex flex-col gap-y-5 ">
              <div className="bg-linear-to-r  from-red-600 via-red-500 to-green-700 p-6 flex flex-col gap-y-2  rounded-lg">
                <h2 className="font-bold font-secondary text-[17px] text-white ">
                  নিউজলেটার সাবস্ক্রাইব করুন
                </h2>
                <p className="font-semibold  font-secondary text-[14px] text-white ">
                  সর্বশেষ খবর সরাসরি আপনার ইমেইলে পান
                </p>
                <input
                  type="text"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="Your Email..."
                  className="w-full border border-gray-300 rounded-lg  py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white "
                />
                <button
                  onClick={handleSubmit}
                  className="font-semibold  font-primary  text-[15px] text-black  cursor-pointer   bg-white py-3 rounded-lg"
                >
                  Subscrip
                </button>
              </div>
              <div className="bg-muted rounded-lg p-8 text-center border border-border">
                <p>Adds</p>
                <div className="bg-background/50 w-[300px] h-[250px] flex items-center justify-center rounded ">
                  <p> w-300px h-250px </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EveryDay;
