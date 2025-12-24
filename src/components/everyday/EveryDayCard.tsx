import type { CardProps } from "@/types/CardProps";
import { Clock } from "lucide-react";
import { PostContent } from "../post/PostContent";
import { Link } from "react-router";
import DateFormatter from "../DateFormatter";

function EveryDayCard({
  _id,
  image,
  category,
  createdAt,
  title,
  content,
}: CardProps) {
  return (
    // 1. Link-ke 'block h-full' kora hoyeche jate card pura jayga nay
    <Link to={`/single-post/${_id}`} className="block h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer group h-full flex flex-col">
        {/* Image Container - Fixed Aspect Ratio */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={image?.url || "/placeholder.jpg"}
            alt={title}
          />
          {/* Tag Overlay */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-[10px] font-bold bg-red-500 text-white rounded-full shadow-md uppercase tracking-wide">
              {category?.name}
            </span>
          </div>
        </div>

        {/* Content Container - flex-1 use kora hoyeche jate baki jayga shoman bhabe nay */}
        <div className="p-4 flex flex-col flex-1">
          {/* Time Badge */}
          {createdAt && (
            <div className="flex items-center gap-1.5 text-gray-500 mb-2 flex-shrink-0">
              <Clock className="w-3 h-3" />
              <span className="text-[11px] font-medium">
                <DateFormatter date={createdAt} />
              </span>
            </div>
          )}

          {/* Title - Fixed height set kora hoyeche jate 1 line ba 2 line jai hok card boro-choto na hoy */}
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-500 transition-colors leading-snug min-h-[40px] sm:min-h-[44px]">
            {title}
          </h3>

          {/* Description - Content-ke niche push korar jonno flex-grow use kora hoyeche */}
          <div className="text-[13px] h-10 text-gray-600 line-clamp-2 leading-relaxed opacity-80">
            <PostContent content={content ?? ""} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EveryDayCard;
