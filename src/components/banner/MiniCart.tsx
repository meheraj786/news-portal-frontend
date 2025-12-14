import type { CardProps } from "../../types/CardProps";

function MiniCard({ image, tag, title, time }: CardProps) {
  return (
    <div className="flex flex-row flex-col gap-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer group hover:bg-gray-200 duration-250">
      {/* Image */}
      <div className="w-full sm:w-[45%] rounded-md overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-250"
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col w-full sm:w-[55%] justify-between">
        {/* Tag */}
        <span className="font-primary text-xs bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full text-gray-700 w-fit">
          {tag}
        </span>

        {/* Title */}
        <h3 className="font-primary text-sm font-semibold leading-tight text-gray-800 hover:text-red-600 transition">
          {title}
        </h3>

        {/* Time */}
        <div className="flex font-primary items-center gap-1 text-xs text-gray-500">
          <i className="ri-time-line text-sm"></i>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default MiniCard;
