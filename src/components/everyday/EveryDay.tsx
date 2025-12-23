import { useFetchAllPosts } from "@/api/hooks/post";
import Container from "../container/Container";
import EveryDayCard from "./EveryDayCard";
import { useSubscribe } from "@/api/hooks/subscribtion";
import { useState } from "react";
import { toast } from "sonner";
import SquareAds from "../ads/SquareAds";
import type { CardProps } from "@/types/CardProps";
import Subcribtion from "../subscribtion/Subcribtion";

const EveryDay = () => {
  const subscripMutation = useSubscribe();
  const [subEmail, setSubEmail] = useState("");
  const { data: posts, isError } = useFetchAllPosts();
  console.log(posts, "post");

  const handleSubmit = () => {
    subscripMutation.mutate(subEmail, {
      onSuccess: () => {
        toast.success("subscrip");
        setSubEmail("");
      },
    });
  };

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
              {posts?.slice(0, 4).map((card: CardProps, i: number) => (
                <EveryDayCard key={i} {...card} />
              ))}
            </div>
          </div>

          <div className=" w-full lg:w-[30%] ">
            <div className=" flex flex-col gap-y-5 ">
              <Subcribtion />
              <SquareAds />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EveryDay;
