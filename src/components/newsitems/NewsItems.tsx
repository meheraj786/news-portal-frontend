import { Link } from "react-router";
import CategoriesCard from "../categoriescard/CategoriesCard";
import Container from "../container/Container";
import TagCard from "../tag/tagcard/TagCard";
import { Button } from "../ui/button";
import NewsCard from "./NewsCard";
import { useFetchAllCategories } from "@/api/hooks/category";
import { useFetchAllTags } from "@/api/hooks/tag";
import { useFetchAllPosts } from "@/api/hooks/post";
import type { CardProps } from "@/types/CardProps";

const NewsItems = () => {
  const { data: categories } = useFetchAllCategories();
  const { data: tags } = useFetchAllTags();
  const { data: posts } = useFetchAllPosts();

  console.log(tags, "tags");

  return (
    <div>
      <div className=" bg-gray-50  pb-15">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <span className="w-1.5 h-10 bg-red-500 rounded-full" />
              সর্বশেষ সংবাদ
            </h1>
            <p className="text-gray-600 ml-6">আজকের গুরুত্বপূর্ণ খবর</p>
          </div>
          <div className=" flex flex-col lg:flex-row justify-between ">
            {/* News Cards */}
            <div className="w-full lg:w-[67%]">
              <div className="space-y-6">
                {posts?.slice(0, 4).map((item: CardProps, index: number) => (
                  <NewsCard key={index} {...item} />
                ))}
              </div>
              <div className="text-center mt-10 mb-10 md:mb-0">
                <Link to="/category/all">
                  <Button>সব সংবাদ দেখুন</Button>
                </Link>
              </div>
            </div>
            <div className=" w-full lg:w-[30%] ">
              <div className=" flex flex-col gap-y-5 ">
                <div className="">
                  <CategoriesCard categories={categories || []} />
                </div>
                <div className="">
                  <TagCard tags={tags || []} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NewsItems;
