import React from "react";
import { useRandomAd } from "./RandomAds";


const SquareAds: React.FC = () => {
  // ডাটা আনা এবং টাইপ কাস্টিং
  const ad = useRandomAd("SIDEBAR");
  console.log(ad, "ad");
  

  // সেফটি চেক: ডাটা না থাকলে বা টাইপ স্কোয়ার না হলে রেন্ডার হবে না
  if (!ad || !ad.isActive || ad.type !== "square" || !ad.image?.url) {
    return null;
  }

  return (
    <div className="w-full flex justify-center py-4">
      {/* মেইন অ্যাড কন্টেইনার - নিউজপেপার স্টাইল */}
      <div className="w-full max-w-[300px] bg-white border border-gray-200 shadow-sm overflow-hidden">
        {/* অ্যাড লেবেল - নিউজপেপারের মতো ছোট করে উপরে */}
        <div className="bg-gray-50 border-b border-gray-100 px-2 py-1 flex justify-between items-center">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
            বিজ্ঞাপন / Advertisement
          </span>
          <span className="text-[9px] text-blue-500 font-medium cursor-help">
            i
          </span>
        </div>

        {/* ক্লিকেবল অ্যাড এরিয়া */}
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative group"
        >
          {/* ইমেজ কন্টেইনার - ফিক্সড স্কোয়ার সাইজ */}
          <div className="aspect-square w-full bg-gray-100 overflow-hidden">
            <img
              src={ad.image.url}
              alt={ad.title || "Advertisement"}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* ইনসেট বর্ডার ইফেক্ট - যা অ্যাডকে ছবির ভেতর থেকে সুন্দর দেখাবে */}
          <div className="absolute inset-0 border-[6px] border-white/0 group-hover:border-white/10 transition-all duration-300" />

          {/* শিমার এনিমেশন (Pure Tailwind) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </a>

        {/* অ্যাড টাইটেল বা সোর্স (ঐচ্ছিক) */}
        {ad.title && (
          <div className="p-2 bg-white">
            <p className="text-[11px] text-center font-semibold text-gray-600 truncate hover:text-red-600 transition-colors">
              {ad.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquareAds;
