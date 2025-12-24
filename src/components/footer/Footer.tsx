import { Link } from "react-router"; // react-router-dom use kora bhalo
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
import Container from "../container/Container";
import { useFetchAllPosts } from "@/api/hooks/post";
import { useFetchNavMenu } from "@/api/hooks/navMenu";

// 1. _id oboshoy string hobe (MongoDB ID string hoy)
type NavItem = {
  _id: string;
  name: string;
  path?: string;
};

type Contract = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const contract: Contract[] = [
  { name: "Facebook", icon: <FaFacebookF />, path: "" },
  { name: "Linkedin", icon: <FaLinkedinIn />, path: "" },
  { name: "YouTube", icon: <FaYoutube />, path: "" },
  { name: "Twitter", icon: <IoLogoTwitter />, path: "" },
  { name: "Instagram", icon: <FaInstagram />, path: "" },
];

const Footer = () => {
  const { data: latestNews } = useFetchAllPosts();
  const { data: navItems } = useFetchNavMenu();

  return (
    <div className="bg-gray-200 py-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {/* Section 1: Logo & Info */}
          <div className="text-left">
            <Logo />
            <h2 className="font-semibold font-secondary text-[14px] pt-3 leading-7 text-gray-600">
              বাংলাদেশের সর্বাধিক জনপ্রিয় এবং বিশ্বাসযোগ্য সংবাদপত্র। সত্য,
              নিরপেক্ষ এবং দায়বদ্ধ সাংবাদিকতার প্রতি আমাদের অঙ্গীকার।
            </h2>
          </div>

          {/* Section 2: Categories (বিভাগ) */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="font-bold font-secondary text-[17px] pb-4 border-b border-gray-300 w-full text-center lg:text-left mb-4">
              বিভাগ
            </h2>
            <div className="flex flex-col gap-3 text-gray-700 font-medium w-full items-center lg:items-start">
              {/* Logic Fix: Array check and fixed Link props */}
              {Array.isArray(navItems) &&
                navItems.slice(0, 6).map((nav: NavItem) => (
                  <Link
                    key={nav._id}
                    to={`/category/${nav._id}`}
                    className="cursor-pointer hover:text-red-600 transition flex items-center gap-2"
                  >
                    {nav.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Section 3: Social/About (আমাদের সম্পর্কে) */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="font-bold font-secondary text-[17px] pb-4 border-b border-gray-300 w-full text-center lg:text-left mb-4">
              আমাদের সম্পর্কে
            </h2>
            <div className="flex flex-col gap-4">
              {contract.map((info, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 group cursor-pointer hover:text-red-600 transition"
                >
                  <span className="border border-gray-300 rounded p-2 text-[18px] group-hover:border-red-500 group-hover:bg-white transition">
                    {info.icon}
                  </span>
                  <span className="text-sm font-medium">{info.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Latest News */}
          <div>
            <h2 className="font-bold font-secondary text-[17px] pb-4 border-b border-gray-300 w-full text-center lg:text-left mb-4">
              Latest News
            </h2>
            <div className="flex flex-col gap-y-4">
              {/* postDetails?.title use kora hoyeche apnar backend pattern onujayi */}
              {latestNews?.slice(0, 3).map((post: any) => (
                <Link
                  key={post._id}
                  to={`/single-post/${post._id}`}
                  className="block hover:bg-gray-50 transition-all rounded-lg" // block use kora hoyeche jate pura card click kaj kore
                >
                  <MiniCard
                    key={post?._id}
                    title={post?.title}
                    image={post?.image}
                    category={post?.category}
                    createdAt={post?.createdAt}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
