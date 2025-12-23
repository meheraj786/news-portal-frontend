import Container from "../components/container/Container";
import { Link, useParams } from "react-router";
import CategoriesCard from "../components/categoriescard/CategoriesCard";
import {
  useFetchAllCategories,
  useFetchCategoryById,
} from "@/api/hooks/category";
// import { useFetchAllTags } from "@/api/hooks/tag";
import { useFetchAllPosts, useFetchPostsByCategory } from "@/api/hooks/post";
// import TagCard from "@/components/tag/tagcard/TagCard";
import DateFormatter from "@/components/DateFormatter";
import { PostContent } from "@/components/post/PostContent";
import type { CardProps } from "@/types/CardProps";
import RecentPost from "@/components/recentpost/RecentPost";
import Subcribtion from "@/components/subscribtion/Subcribtion";
import SquareAds from "@/components/ads/SquareAds";

const CategoryPage = () => {
  const { id } = useParams();
  // const { data: TagsList } = useFetchAllTags();
  const { data: CategoriesList } = useFetchAllCategories();
  const { data: posts } = useFetchAllPosts();
  const { data: categoryPosts } = useFetchPostsByCategory(id as string);
  const { data: category } = useFetchCategoryById(id as string);
  console.log(categoryPosts);

  const displayPosts = id === "all" ? posts : categoryPosts;

  return (
    <div className="bg-gray-50 pt-35 min-h-screen">
      {/* Main Container */}
      <Container>
        {/* Category Header */}
        <div className="text-center mb-8 bg-white py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Category :{" "}
            <span className="text-pink-600">
              {id == "all" ? "All" : category?.name || ""}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Articles */}
            {Array.isArray(displayPosts)
              ? displayPosts.map((article: CardProps) => (
                  <div
                    key={article._id}
                    className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={article?.image?.url}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {article.category && (
                          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                            {article.category.name}
                          </span>
                        )}
                      </div>
                      <Link to={`/single-post/${article._id}`}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-pink-600 cursor-pointer transition-colors">
                          {article.title}
                        </h2>
                      </Link>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <span className="text-pink-600">👤</span> Author
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-pink-600">📅</span>{" "}
                          <DateFormatter date={article.createdAt} />
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-2">
                        <PostContent content={article.content} />
                      </p>
                      <Link to={`/single-post/${article._id}`}>
                        <button className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                          Continue Reading →
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              : displayPosts?.posts?.map((article: CardProps) => (
                  <div
                    key={article._id}
                    className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={article?.image?.url}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {article.category && (
                          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                            {article.category.name}
                          </span>
                        )}
                      </div>
                      <Link to={`/single-post/${article._id}`}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-pink-600 cursor-pointer transition-colors">
                          {article.title}
                        </h2>
                      </Link>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <span className="text-pink-600">👤</span> Author
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-pink-600">📅</span>{" "}
                          <DateFormatter date={article.createdAt} />
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-2">
                        <PostContent content={article.content} />
                      </p>

                      <Link to={`/single-post/${article._id}`}>
                        <button className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                          Continue Reading →
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search Box */}
            {/* <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
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
            </div> */}

            {/* Recent Posts */}
            {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Recent Posts
              </h3>
              <ul className="space-y-3">
                {posts?.slice(0, 10).map((post: CardProps, index: number) => (
                  <li
                    key={index}
                    className="text-gray-700 hover:text-pink-600 cursor-pointer transition-colors text-sm"
                  >
                    <Link to={`/single-post/${post._id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div> */}
            <RecentPost />

            {/* Recent Comments */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Recent Comments
              </h3>
              <p className="text-gray-600 text-sm">No comments to show.</p>
            </div>

            {/* Categories */}
            <div className="">
              <CategoriesCard categories={CategoriesList || []} />
            </div>

            {/* Newsletter */}
            <Subcribtion />
            <div className="py-6 ">
              <SquareAds />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
