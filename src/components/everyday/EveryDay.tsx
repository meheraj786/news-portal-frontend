
import Container from "../container/Container";
import EveryDayCard from "./EveryDayCard";
import SquareAds from "../ads/SquareAds";
import { useFetchAllPosts } from "@/api/hooks/post";

const EveryDay = () => {
const {data:posts}=useFetchAllPosts()

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
              {posts?.slice(0, 6).map((card, i) => (
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
                  placeholder="Your Email..."
                  className="w-full border border-gray-300 rounded-lg  py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white "
                />
                <button className="font-semibold  font-primary  text-[15px] text-black  cursor-pointer   bg-white py-3 rounded-lg">
                  Subscrip
                </button>
              </div>
<SquareAds/>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EveryDay;
