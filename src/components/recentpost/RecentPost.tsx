import { useFetchAllPosts } from "@/api/hooks/post";
import type { CardProps } from "@/types/CardProps";
import { Link } from "react-router";

const RecentPost = () => {
  const { data: posts } = useFetchAllPosts();
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
      </div>
    </div>
  );
};

export default RecentPost;
