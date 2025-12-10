import React from "react";
interface CardProps {
  image: string;
  tag: string;
  title: string;
}
function FavoriteNewsCard({ image, tag, title }: CardProps) {
  return (
    <div className=" group group-hover:border hover:border-rose-500 bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition hover:-translate-y-[2px] cursor-pointer">
      {/* Image */}
      <div className="w-full h-44 md:h-48 lg:h-52 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-3 group">
        {/* Tag */}
        <span className="text-xs bg-red-500 text-white px-2 py-[2px] rounded-full">
          {tag}
        </span>

        {/* Title */}
        <h3 className=" font-primary   mt-2 font-semibold text-gray-800 hover:text-red-600 leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default FavoriteNewsCard;
