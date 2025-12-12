import { MdWatchLater } from "react-icons/md";
import type { CardProps } from "../../types/CardProps";

function EveryDayCard({ image, tag, time, title, description }: CardProps) {
  return (
    <div className="w-full">
      <div className="bg-white p-4 rounded-xl h-[290px] flex flex-col  shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer group hover:bg-gray-200 duration-250">
        {/* Image — FIXED height */}
        <div className="w-full h-[180px] overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-250"
            src={image}
            alt={title}
          />
        </div>

        {/* Tag + Time */}
        <div className="flex items-center justify-between mt-3">
          <p className="inline-block font-medium text-xs bg-red-500 text-white px-2 py-1 rounded-full">
            {tag}
          </p>

          {time && (
            <div className="flex items-center gap-x-1 text-sm text-gray-600">
              <MdWatchLater />
              <p>{time}</p>
            </div>
          )}
        </div>

        {/* Title */}
        <h5 className="mt-3 text-[15px] font-semibold leading-snug line-clamp-2">
          {title}
        </h5>

        {/* Description */}
        <p className="mt-2 text-[13px] text-gray-400 line-clamp-1">
          {description}
        </p>

        {/* Spacer – keeps bottom fixed */}
        <div className="flex-1" />
      </div>
    </div>
  );
}
export default EveryDayCard;
