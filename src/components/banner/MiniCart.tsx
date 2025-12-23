
import { Clock } from "lucide-react";
import DateFormatter from "../DateFormatter";

// @/types/CardProps.ts
export interface CardProps {
  _id?: string;
  title: string;
  // image can be the full object from API or just a string URL
  image?: {
    url?: string;
  } | string; 
  // category can be the full object or just a string name
  category?: {
    _id?: string;
    name?: string;
  } | string;
  createdAt?: string;
  content?: string;
}

function MiniCard({ image, category, title, createdAt }: CardProps) {
  // Logic to extract image URL safely
  const imageUrl = typeof image === "string" ? image : image?.url || "";

  // Logic to extract category name safely
  const categoryName = typeof category === "object" ? category?.name : category;

  return (
    <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer group">
      <div className="w-full sm:w-28 md:w-32 h-24 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={title}
        />
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <span className="inline-block text-xs font-medium bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full w-fit mb-2">
          {categoryName || "General"}
        </span>

        <h3 className="text-sm sm:text-base font-semibold leading-snug text-gray-900 line-clamp-2 mb-2 group-hover:text-red-500 transition-colors">
          {title}
        </h3>

        {createdAt && (
          <div className="flex items-center gap-1.5 text-gray-500 mt-auto">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs font-medium">
              <DateFormatter date={createdAt} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniCard;
