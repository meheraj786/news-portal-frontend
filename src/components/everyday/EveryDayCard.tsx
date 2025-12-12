import { MdWatchLater } from "react-icons/md";
import type { CardProps } from "../../types/CardProps";

function EveryDayCard({ image, tag, time, title, description }: CardProps) {
  return (
    <div className="w-full">
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
        {/* Image — fixed ratio */}
        <div className="w-full aspect-16/10 overflow-hidden rounded-lg">
          <img className="w-full h-full object-cover" src={image} alt={title} />
        </div>

        {/* Tag + Time */}
        <div className="flex items-center justify-between mt-3">
          <p className="inline-block font-medium text-xs bg-red-500 text-white px-2 py-1 rounded-full">
            {tag}
          </p>

          {time && (
            <div className="flex items-center gap-x-1 text-sm">
              <MdWatchLater className="text-gray-600" />
              <p>{time}</p>
            </div>
          )}
        </div>

        {/* Title */}
        <h5 className="mt-3 text-[15px] font-semibold leading-snug hover:text-red-600 transition cursor-pointer line-clamp-1">
          {title}
        </h5>
      </div>
    </div>
  );
}

export default EveryDayCard;
