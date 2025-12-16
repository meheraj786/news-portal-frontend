import React from "react";
import { Clock } from "lucide-react";

interface CardProps {
  image: string;
  tag: string;
  title: string;
  time?: string;
}

function MiniCard({ image, tag, title, time }: CardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="w-full sm:w-28 md:w-32 h-24 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        {/* Tag */}
        <span className="inline-block text-xs font-medium bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full w-fit mb-2">
          {tag}
        </span>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold leading-snug text-gray-900 line-clamp-2 mb-2 group-hover:text-red-500 transition-colors">
          {title}
        </h3>

        {/* Time */}
        {time && (
          <div className="flex items-center gap-1.5 text-gray-500 mt-auto">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs font-medium">{time}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniCard;
