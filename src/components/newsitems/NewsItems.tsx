import { Link } from "react-router";
import CategoriesCard from "../categoriescard/CategoriesCard";
import Container from "../container/Container";
import TagCard from "../tag/tagcard/TagCard";
import { Button } from "../ui/button";
import NewsCard from "./NewsCard";
import { useFetchAllCategories } from "@/api/hooks/category";
import { useFetchAllTags } from "@/api/hooks/tag";
import { useFetchAllPosts } from "@/api/hooks/post";

const newsItems = [
  {
    image:
      "https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=800&h=600&fit=crop",
    title: "ভোলা-বরিশাল সেতুর দাবিতে উত্তাল ভোলা- ইস্টিকোর গ্যাসবাহী গাড়ি আটক",
    date: "November 25, 2025",
    comments: 0,
    description:
      "রাজধানীর বিন আলামগীরের শোরাল কোথাপাড়ায় তোলার পাঁচ দশা দাবি বাস্তবায়ন সরকারের নীরবতার বিরুদ্ধে আজ ভোলাসুত্রে অবস্থানের মর্যাদাহীনান",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    title: "শিক্ষা প্রতিষ্ঠানে নতুন নিয়ম জারি",
    date: "November 25, 2025",
    comments: 12,
    description:
      "দেশের সকল শিক্ষা প্রতিষ্ঠানে নতুন নিয়মকানুন জারি করেছে শিক্ষা মন্ত্রণালয়। এতে শিক্ষার্থীদের উপস্থিতি এবং পরীক্ষা পদ্ধতিতে বড় পরিবর্তন আনা হয়েছে।",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=600&fit=crop",
    title: "কৃষকদের জন্য নতুন ভর্তুকি ঘোষণা",
    date: "November 24, 2025",
    comments: 8,
    description:
      "সরকার কৃষকদের জন্য সার ও বীজে নতুন ভর্তুকি ঘোষণা করেছে। এতে কৃষকরা আগামী মৌসুমে কম খরচে চাষাবাদ করতে পারবেন বলে আশা করা হচ্ছে।",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    title: "রাজধানীতে নতুন ফ্লাইওভার উদ্বোধন",
    date: "November 24, 2025",
    comments: 15,
    description:
      "ঢাকার যানজট নিরসনে মহাখালীতে নতুন ফ্লাইওভার উদ্বোধন করা হয়েছে। এতে যাত্রীদের সময় সাশ্রয় হবে এবং যানজট কমবে বলে মনে করছেন বিশেষজ্ঞরা।",
  },
];

const NewsItems = () => {
  const {data:categories}=useFetchAllCategories()
  const {data:tags}=useFetchAllTags()
  const {data:posts}=useFetchAllPosts()
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
                {posts?.slice(0, 6).map((item, index) => (
                  <NewsCard key={index} {...item} />
                ))}
              </div>
                        <div className="text-center mt-10 mb-10 md:mb-0">
            <Link to="/news">
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
