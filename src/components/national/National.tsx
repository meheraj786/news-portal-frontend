import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import Container from "../container/Container";
import { useFetchAllCategories } from "@/api/hooks/category";
import { useFetchAllTags } from "@/api/hooks/tag";
import { useFetchAllPosts } from "@/api/hooks/post";
import type { CardProps } from "@/types/CardProps";

const National = () => {
  const { data: CategoriesList } = useFetchAllCategories();
  const { data: TagList } = useFetchAllTags();
  const { data: recentPosts } = useFetchAllPosts();
  const articles = [
    {
      id: 1,
      category: "জাতীয়",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
      title:
        "বাঙলা ভাষিকদের বাংলাদেশ ও পশ্চিমবঙ্গের রাজসিংহ পর্ব: সংস্থান সংকট",
      author: "Indianexpress.Com",
      date: "January 5, 2025",
      excerpt:
        "বর্তমান বিশ্বে বাংলা ভাষী জনগোষ্ঠীর একটি বিশাল অংশ বাংলাদেশ ও পশ্চিমবঙ্গে বসবাস করেন। তবে এই দুই অঞ্চলে বাংলা ভাষা ও সংস্কৃতির প্রসার এবং সংরক্ষণ নিয়ে রয়েছে নানা সংস্থান সংকট।",
    },
    {
      id: 2,
      category: "ভ্রমণ",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      title: "বান্দরবান পাহাড়ের যুদ্ধে একটি চুক্তির স্বর্গ",
      author: "Indianexpress.Com",
      date: "January 2, 2025",
      excerpt:
        "বান্দরবান জেলা দেশের পার্বত্য এলাকাগুলির মধ্যে একটি বিখ্যাত স্থান। এখানে পাহাড়, নদী, উপত্যকা সবকিছুই মিলেমিশে একটি অপরূপ প্রাকৃতিক দৃশ্য তৈরি করেছে। বান্দরবান ভ্রমণ মানে শুধু প্রকৃতি দেখা নয়, এটি একটি অবিস্মরণীয় অভিজ্ঞতা।",
    },
    {
      id: 3,
      category: "ভ্রমণ",
      categoryEn: "Travel",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      title: "Sikkim Travel Guide: A Complete Experience in the Himalayas",
      author: "Indianexpress.Com",
      date: "January 2, 2025",
      excerpt:
        "Sikkim অত্যাশ্চর্য হিমালয়ের কোলে অবস্থিত একটি ছোট্ট রাজ্য যা তার প্রাকৃতিক সৌন্দর্য, বৌদ্ধ মঠ এবং বৈচিত্র্যময় সংস্কৃতির জন্য বিখ্যাত। পাহাড়, হিমবাহ এবং সবুজ উপত্যকা নিয়ে গঠিত এই অঞ্চলটি প্রকৃতিপ্রেমীদের জন্য স্বর্গ।",
    },
    {
      id: 4,
      category: "ভ্রমণ",
      categoryEn: "Travel",
      image:
        "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&h=400&fit=crop",
      title: "কলকাতা এক শহরের ডেডের যাত্রার গল্প",
      author: "Indianexpress.Com",
      date: "January 2, 2025",
      excerpt:
        "কলকাতা, পশ্চিমবঙ্গের রাজধানী শহরটি, একটি সমৃদ্ধ ইতিহাস এবং সংস্কৃতির কেন্দ্র। এই শহরটি তার ঐতিহ্যবাহী রাস্তা, পুরানো দালানকোঠা এবং ঐতিহাসিক স্মৃতিস্তম্ভের জন্য বিখ্যাত। কলকাতার রাস্তায় হাঁটলে মনে হয় যেন সময় থমকে আছে।",
    },
  ];

  return (
    <div className="bg-gray-50 pt-35 min-h-screen">
      {/* Main Container */}
      <Container>
        {/* Category Header */}
        <div className="text-center mb-8 bg-white py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Category : <span className="text-pink-600">জাতীয়</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Articles */}
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                      {article.category}
                    </span>
                    {article.categoryEn && (
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                        {article.categoryEn}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-pink-600 cursor-pointer transition-colors">
                    {article.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="text-pink-600">👤</span> {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-pink-600">📅</span> {article.date}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <button className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                    Continue Reading →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-1 rounded">
                  Search
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Recent Posts
              </h3>
              <ul className="space-y-3">
                {recentPosts
                  ?.slice(0, 3)
                  ?.map((post: CardProps, index: number) => (
                    <li
                      key={index}
                      className="text-gray-700 hover:text-pink-600 cursor-pointer transition-colors text-sm"
                    >
                      {post.title}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Recent Comments
              </h3>
              <p className="text-gray-600 text-sm">No comments to show.</p>
            </div>

            {/* Archives */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Archives
              </h3>
              <ul className="space-y-2">
                {[
                  "December 2024",
                  "November 2024",
                  "October 2024",
                  "September 2024",
                  "August 2024",
                  "July 2024",
                  "June 2024",
                ].map((month, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700 hover:text-pink-600 cursor-pointer transition-colors">
                      {month}
                    </span>
                    {/* <span className="text-gray-500 text-xs">({Math.floor(Math.random() * 10) + 1})</span> */}
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Categories
              </h3>
              <ul className="space-y-2">
                {CategoriesList?.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700 hover:text-pink-600 cursor-pointer transition-colors">
                      {category?.name}
                    </span>
                    {/* <span className="text-gray-500 text-xs">({Math.floor(Math.random() * 15) + 1})</span> */}
                  </li>
                ))}
              </ul>
            </div>

            {/* About Me */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                About Me
              </h3>
              <div className="mb-4">
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  Hello, I am Monty Leo
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Where I welcome you (the readers) of my Blog. নমস্কার
                  পাঠকবৃন্দ, আপনাদের স্বাগত জানাই আমার ব্লগে। এই ব্লগে আমি নানা
                  বিষয়ে লিখে থাকি।
                </p>
                <div className="flex gap-3 mb-4">
                  <Facebook className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
                  <Twitter className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
                  <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
                  <Youtube className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
                </div>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                  alt="Monty Leo"
                  className="w-16 h-16 rounded-full"
                />
              </div>
            </div>

            {/* Recent Article */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Recent Article
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=80&fit=crop"
                    alt="Article"
                    className="w-24 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm text-gray-800 hover:text-pink-600 cursor-pointer font-semibold">
                      বাংলা ভাষিকদের বাংলাদেশ ও পশ্চিমবঙ্গের রাজসিংহ
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      January 5, 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6 text-white">
              <h3 className="text-xl font-bold mb-2">
                Subscribe To Our Newsletter
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                আমাদের নিউজলেটার সাবস্ক্রাইব করুন এবং নতুন পোস্টের আপডেট পান।
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded mb-3 text-gray-800"
              />
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition-colors">
                Subscribe Now
              </button>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Tags Cloud
              </h3>
              <div className="flex flex-wrap gap-2">
                {TagList?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 hover:bg-pink-600 hover:text-white px-3 py-1 rounded text-sm text-gray-700 cursor-pointer transition-colors"
                  >
                    {tag?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default National;
