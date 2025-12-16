import { Clock, MessageCircle } from "lucide-react";

interface NewsCardProps {
  image: string;
  title: string;
  date: string;
  comments: number;
  description: string;
}

function NewsCard({
  image,
  title,
  date,
  comments,
  description,
}: NewsCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        {/* Image Section */}
        <div className="w-full  lg:w-50 lg:h-full aspect-video sm:aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          {/* Title */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-red-500 transition-colors duration-200 line-clamp-3">
            {title}
          </h2>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
export default NewsCard;
