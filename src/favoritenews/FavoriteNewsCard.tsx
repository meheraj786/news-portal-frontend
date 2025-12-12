import type { CardProps } from "../types/CardProps";

function FavoriteNewsCard({ image, tag, title }: CardProps) {
  return (
    <div className=" group group-hover:border hover:border-rose-500 bg-white rounded-lg border border-transparent overflow-hidden shadow-sm hover:shadow-md duration-300 transition hover:-translate-y-0.5 cursor-pointer">
      {/* Image */}
      <div className="w-full h-44 md:h-48 lg:h-52 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-3 group">
        {/* Tag */}
        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
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
