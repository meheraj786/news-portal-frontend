import { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to="/">
      <div
        className="inline-flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon/Symbol */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/50 transition-all duration-300">
            {/* Stylized 'N' made of lines representing news/text */}
            <div className="relative w-6 h-6">
              {/* Animated lines */}
              <div
                className={`absolute left-0 top-0 w-0.5 h-6 bg-white rounded-full transition-all duration-300 ${
                  isHovered ? "h-7 -top-0.5" : ""
                }`}
              ></div>
              <div
                className={`absolute left-0 top-0 w-6 h-0.5 bg-white rounded-full origin-left transform rotate-[135deg] transition-all duration-300 ${
                  isHovered ? "w-7" : ""
                }`}
              ></div>
              <div
                className={`absolute right-0 top-0 w-0.5 h-6 bg-white rounded-full transition-all duration-300 ${
                  isHovered ? "h-7 -top-0.5" : ""
                }`}
              ></div>

              {/* Pulse effect */}
              {isHovered && (
                <div className="absolute inset-0 bg-white rounded-lg animate-ping opacity-20"></div>
              )}
            </div>
          </div>

          {/* Live indicator dot */}
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Text */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            News
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Portal
            </span>
          </h1>
          <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-0.5">
            Stay Informed
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
