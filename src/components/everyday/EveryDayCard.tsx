import type { CardProps } from "@/types/CardProps";
import { Clock } from "lucide-react";
import { PostContent } from "../post/PostContent";
import { Link } from "react-router";

function EveryDayCard({
  _id,
  image,
  category,
  createdAt,
  title,
  content,
}: CardProps) {
  return (
    <Link to={`/single-post/${_id}`}>
      <div className="w-full h-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer group h-full flex flex-col">
          {/* Image Container */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={image?.url || "/placeholder.jpg"}
              alt={title}
            />
            {/* Tag Overlay */}
            <div className="absolute top-3 left-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full shadow-md">
                {category?.name}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col flex-1">
            {/* Time Badge */}
            {createdAt && (
              <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{createdAt}</span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-500 transition-colors">
              {title}
            </h3>

            {/* Description */}
            <div className="text-sm text-gray-600 line-clamp-2 flex-1">
              <PostContent content={content ?? ""} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EveryDayCard;
