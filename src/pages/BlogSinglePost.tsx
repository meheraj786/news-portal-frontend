import Container from "../components/container/Container";
import { Link, useParams } from "react-router";
import CategoriesCard from "../components/categoriescard/CategoriesCard";
import { useFetchAllCategories, useFetchCategoryById } from "@/api/hooks/category";
import { useFetchAllTags } from "@/api/hooks/tag";
import { useFetchAllPosts, useFetchPostsByCategory } from "@/api/hooks/post";
import TagCard from "@/components/tag/tagcard/TagCard";
import DateFormatter from "@/components/DateFormatter";
import { PostContent } from "@/components/post/PostContent";
import type { CardProps } from "@/types/CardProps";

// 1. Define the exact shape of the Post coming from your API
interface RawApiPost {
  _id: string;
  category: {
    _id: string;
    name: string;
  };
  postDetails: {
    title: string;
    content: string;
    image: {
      url: string;
    };
    createdAt: string;
  };
}

// 2. Define the response wrapper (often APIs wrap arrays in a 'data' property)
interface ApiResponseWrapper {
  data: RawApiPost[];
}

const CategoryPage = () => {
  const { id } = useParams();
  
  // Hooks
  const { data: tagsData } = useFetchAllTags();
  const { data: categoriesData } = useFetchAllCategories();
  const { data: allPostsData } = useFetchAllPosts();
  const { data: categoryPostsData } = useFetchPostsByCategory(id as string);
  const { data: categoryDetail } = useFetchCategoryById(id as string);

  // 3. Type-safe extraction of the post list
  // We use 'unknown' as a bridge to cast to our specific RawApiPost structure
  const getPosts = (): CardProps[] => {
    let rawList: RawApiPost[] = [];

    if (id === "all") {
      // Handle the "All Posts" structure (checks if it's wrapped in .data or is a direct array)
      const formatted = allPostsData as unknown as ApiResponseWrapper | RawApiPost[];
      rawList = Array.isArray(formatted) ? formatted : formatted?.data || [];
    } else {
      // Handle the category-specific list
      rawList = (categoryPostsData as unknown as RawApiPost[]) || [];
    }

    // 4. Map the API's nested 'postDetails' into your flat 'CardProps'
    return rawList.map((item) => ({
      _id: item._id,
      title: item.postDetails.title,
      content: item.postDetails.content,
      createdAt: item.postDetails.createdAt,
      image: item.postDetails.image,
      category: {
        name: item.category.name,
      },
    }));
  };

  const posts = getPosts();

  // Safely get category name without 'any'
  const currentCategoryName = id === "all" 
    ? "All" 
    : (categoryDetail as unknown as { name: string })?.name || "";

  return (
    <div className="bg-gray-50 pt-35 min-h-screen">
      <Container>
        <div className="text-center mb-8 bg-white py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Category : <span className="text-pink-600">{currentCategoryName}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Now posts is a real Array, so .length and .map work perfectly */}
            {posts.length > 0 ? (
              posts.map((article: CardProps) => (
                <div
                  key={article._id}
                  className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {article.image?.url && (
                    <img
                      src={article.image.url}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {article.category?.name && (
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
                      <span className="flex items-center gap-1">👤 Author</span>
                      <span className="flex items-center gap-1">
                        📅 <DateFormatter date={article.createdAt} />
                      </span>
                    </div>

                    <div className="text-gray-700 mb-4 leading-relaxed line-clamp-2">
                      <PostContent content={article.content || ""} />
                    </div>

                    <Link to={`/single-post/${article._id}`}>
                      <button className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                        Continue Reading →
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-lg text-gray-500">
                No posts found.
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {/* Sidebar content - casting unknown for safety */}
            <div className="mb-6">
              <CategoriesCard categories={(categoriesData as unknown as []) || []} />
            </div>
            <div className="mb-6">
              <TagCard tags={(tagsData as unknown as []) || []} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;