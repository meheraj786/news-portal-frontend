import Container from "../container/Container";
import { useRandomAd } from "./RandomAds";

const Ads = () => {
  const ad = useRandomAd("BANNER"); // অথবা আপনার ব্যানারের ক্যাটাগরি অনুযায়ী টাইপ দিন

  if (!ad) return null;

  return (
    <div className="py-6">
      <Container>
        {/* ব্যানার কন্টেইনার - চিকন এবং চওড়া (Horizontal) */}
        <div className="relative w-full group overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50">
          {/* ছোট "Ads" লেবেল */}
          <div className="absolute top-0 right-0 z-10">
            <span className="bg-gray-800/20 backdrop-blur-sm text-[8px] font-bold text-white px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">
              Ads
            </span>
          </div>

          {/* ক্লিকেবল এরিয়া */}
          <a
            href={ad?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <div className="relative h-[90px] md:h-[200px] w-full overflow-hidden">
              {/* মেইন ইমেজ */}
              <img
                src={ad?.image?.url}
                alt={ad?.title || "Advertisement"}
                className="w-full h-full object-fill md:object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* হোভার ইফেক্ট (গ্লসি লুক) */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-all" />
            </div>
          </a>
        </div>
      </Container>

      {/* গ্লসি ইফেক্টের জন্য কাস্টম এনিমেশন স্টাইল (যদি আপনার tailwind config এ না থাকে) */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Ads;
