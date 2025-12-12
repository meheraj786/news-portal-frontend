import { Link } from "react-router";
import Logo from "../logo/Logo";
import type React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import MiniCard from "../banner/MiniCart";
import type { CardProps } from "../../types/CardProps";
import Container from "../container/Container";

type NavItems = {
  name: string;
  path?: string;
};
type Contract = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItems[] = [
  {
    name: " জাতীয়",
    path: "/",
  },
  {
    name: " রাজনীতি",
    path: "",
  },
  {
    name: "  বিনোদন",
    path: "",
  },
  {
    name: " খেলাধুলা",
    path: "",
  },
  {
    name: "আন্তর্জাতিক",
    path: "",
  },
];
const contract: Contract[] = [
  { name: "Facebook", icon: <FaFacebookF />, path: "" },
  {
    name: "Linkdin",
    icon: <FaLinkedinIn />,
    path: "",
  },
  { name: "YouTube", icon: <FaYoutube />, path: "" },
  {
    name: "Twitter",
    icon: <IoLogoTwitter />,
    path: "",
  },
  {
    name: "Instragram",
    icon: <FaInstagram />,
    path: "",
  },
];
const latestNews: CardProps[] = [
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
const Footer = () => {
  return (
    <div className=" bg-gray-200 ">
      <Container>
        <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div className="text-left ">
            <Logo></Logo>
            <h2 className="font-semibold  font-secondary text-[14px] pt-3 leading-7  ">
              বাংলাদেশের সর্বাধিক জনপ্রিয় এবং বিশ্বাসযোগ্য সংবাদপত্র। সত্য,
              নিরপেক্ষ এবং দায়বদ্ধ সাংবাদিকতার প্রতি আমাদের অঙ্গীকার।
            </h2>
          </div>
          <div className=" ">
            <h2 className="font-bold font-secondary text-center  text-[17px] pb-2.5 ">
              বিভাগ
            </h2>
            <div className="group  flex flex-col  gap-5 text-gray-700 font-medium transition duration-200 ">
              {navItems.map((nav, i) =>
                nav.path ? (
                  <Link
                    to={nav.path}
                    key={i}
                    className="cursor-pointer hover:text-red-600 border border-gray-300 hover:border-red-500 transition duration-200  text-center rounded py-1 px-2"
                  >
                    {nav.name}
                  </Link>
                ) : (
                  <span
                    key={i}
                    className="cursor-pointer  text-center hover:text-red-600 border  border-gray-300 hover:border-red-500 transition duration-200  rounded py-1 px-2"
                  >
                    {nav.name}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="">
            <h2 className="font-bold font-secondary text-center text-[17px] pb-2.5   ">
              আমাদের সম্পর্কে
            </h2>
            <div className="  flex flex-col items-center  gap-5 text-gray-700 font-medium transition duration-200 ">
              {contract.map((info, i) =>
                info.path ? (
                  <div className="hover:text-red-600 hover:border-red-500  flex gap-x-2.5 items-center transition duration-200 cursor-pointer ">
                    <Link
                      to={info.path}
                      key={i}
                      className="cursor-pointer hover:text-red-600 border border-gray-300 hover:border-red-500 transition duration-200 text-[18px] items-center  rounded py-1.5 px-2"
                    >
                      {info.icon} {info.name}
                    </Link>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="flex items-center gap-x-2.5 cursor-pointer transition duration-200 hover:text-red-600  group "
                  >
                    <span className="border border-gray-300 rounded py-1.5 px-2 text-[18px] transition duration-200 group-hover:border-red-500">
                      {info.icon}
                    </span>

                    <span className="transition duration-200 hover:text-red-500">
                      {info.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="">
            <h2 className=" text-center  font-bold font-secondary text-[17px] pb-2.5   ">
              Latest News
            </h2>
            <div className="  flex flex-col gap-y-2.5  ">
              {latestNews.map((card, i) => (
                <MiniCard key={i} {...card} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
