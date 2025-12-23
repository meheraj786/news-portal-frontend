import { useFetchAllPosts } from "@/api/hooks/post";
import Container from "../components/container/Container";
import EveryDayCard from "../components/everyday/EveryDayCard";
import type { CardProps } from "@/types/CardProps";

const FavoriteNews = () => {
const {data:posts}=useFetchAllPosts()
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
          {posts?.map((card : CardProps, i: number) => (
            <EveryDayCard key={i} {...card} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FavoriteNews;
