import React from "react";
import {
  User,
  Calendar,
  Clock,
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Search,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useFetchPostById, useFetchPostsByCategory } from "@/api/hooks/post";
import { useRandomAd } from "@/components/ads/RandomAds";
import DateFormatter from "@/components/DateFormatter";
import Loader from "@/components/Loader/Loader";

// --- Types ---

interface BlogPost {
  title: string;
  date: string;
  image: {
    url: string;
  };
  content: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  tags: {
    name: string;
  };
  category: {
    name: string;
    slug: string;
  };
}

const SIDEBAR_DATA = {
  recentPosts: [
    "ঢাকা-৮ আসনের স্বতন্ত্র প্রার্থী উসমান গনি জলিবিদ্ধ",
    "ব্যাপক বিক্ষোভের মধ্যে পদত্যাগ করলেন বুলগেরিয়ার প্রধানমন্ত্রী রসেন ওলিয়াচকোভ",
    "মিসাইল ও ড্রোন প্রযুক্তির বিনিময়ে ইউক্রেনকে মিগ-২৯ দিবে পোল্যান্ড",
    "বাংলাদেশ-কেরিয়া উন্নয়ন সহযোগিতা আরও জোরদার করতে চায়: প্রধান উপদেষ্টা ড. ইউনূস",
    "ভোলা-বরিশাল সেতুর দাবিতে ২২৫ মেগাওয়াট বিদ্যুৎকেন্দ্র ঘেরাও",
  ],
  archives: [
    "December 2025",
    "November 2025",
    "October 2025",
    "September 2025",
    "August 2025",
    "July 2025",
  ],
  categories: [
    "Uncategorized",
    "অর্থ-বাণিজ্য",
    "অর্থনীতি",
    "আইন-আদালত",
    "খেলাধুলা",
    "জাতীয়",
    "দেশজুড়ে",
    "ধর্ম ও জীবন",
    "প্রবাস",
  ],
  tags: [
    "bangladesh vs srilanka",
    "building",
    "design",
    "fashion",
    "gadget",
    "gaza",
    "lifestyle",
    "Realestate",
    "story",
    "style",
    "আওয়ামী লীগ",
    "আরিফুল ইসলাম খান",
    "কলকাতা",
    "কালীপূজা",
  ],
};

// --- Sub-components ---

const ArticleLayout = ({ post }: { post: BlogPost }) => {
  const {data:relatedPost, isLoading}=useFetchPostsByCategory(post?.category?._id as string)
  console.log(relatedPost, "relatedPost");
  
  const ads = useRandomAd("BANNER");
  return (
    <article className="w-full">
      {
        isLoading && <Loader/>
      }
      {/* Meta Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs md:text-sm text-gray-500 font-medium">
        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-sm font-bold uppercase text-[10px] md:text-xs">
          {post?.category?.name}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> <DateFormatter date={post?.createdAt} />
        </span>
        <span className="flex items-center gap-1">
          <Eye size={14} /> {post?.views}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {post?.title}
      </h1>

      {/* Author and Date Line */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs md:text-sm text-gray-500 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span className="text-gray-700 font-semibold">Author</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>
            <DateFormatter date={post?.createdAt} />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={14} />
          <span>{post?.views}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[450px] bg-gray-100 mb-8 rounded-lg overflow-hidden group">
        <img
          src={post?.image?.url}
          alt="Bengali Culture"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay Text attempting to match the 'Bangali' red text style roughly */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-white/20">
          <h1 className="text-red-600/90 font-bold text-xl drop-shadow-md select-none tracking-tighter">
            {post?.title}
          </h1>
        </div> */}
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none text-gray-700 font-normal leading-relaxed">
        {/* <p className="mb-4">{ARTICLE_CONTENT.intro}</p>
        <p className="mb-8">{ARTICLE_CONTENT.p2}</p> */}

        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-8 mb-8 border-t border-b border-gray-100 py-4">
        <span className="font-bold text-gray-900">Tags:</span>
        <div className="flex flex-wrap gap-2">
          {post?.tags?.map((tag) => (
            <span
              key={tag._id}
              className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {tag?.name}
            </span>
          ))}
        </div>
      </div>

      {/* Author Box */}
      {/* <div className="bg-[#F2F4F8] p-6 md:p-8 rounded-md flex flex-col md:flex-row gap-6 mb-10 items-start">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
             <img src="https://picsum.photos/id/64/200/200" alt="Author" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold">About Author</span>
                    <h3 className="text-xl font-bold text-gray-900">{ARTICLE_CONTENT.author}</h3>
                </div>
                 <button className="hidden md:block text-xs border border-gray-400 text-gray-600 px-3 py-1 hover:bg-white transition-all">
                    View All Articles
                </button>
            </div>
            
            <button className="md:hidden mt-4 text-xs border border-gray-400 text-gray-600 px-3 py-1 w-full hover:bg-white transition-all">
                View All Articles
            </button>
        </div>
      </div>

       <div className="mb-10 bg-gray-50 p-6 rounded border border-gray-100">
          <h4 className="text-sm text-gray-500 mb-4 border-b pb-2">Check latest article from this author</h4>
          <div className="grid grid-cols-1 gap-4">
              {RECENT_ARTICLES_THUMBS.map((post, idx) => (
                  <div key={idx} className="flex gap-4 items-start group cursor-pointer">
                      <div className="w-20 h-16 overflow-hidden rounded-sm flex-shrink-0">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-900 text-sm md:text-base leading-tight group-hover:text-blue-600 transition-colors mb-1">{post.title}</h4>
                          <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                  </div>
              ))}
          </div>
       </div> */}

      {/* Previous/Next Post Navigation */}
      {/* <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
        <div className="flex-1 bg-white border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer flex gap-4 items-center group">
             <div className="w-20 h-16 bg-gray-200 overflow-hidden flex-shrink-0">
                 <img src="https://picsum.photos/id/10/200/200" className="w-full h-full object-cover" alt="prev" />
             </div>
             <div>
                 <span className="text-xs text-gray-400 flex items-center gap-1 mb-1 group-hover:text-blue-500"><ArrowLeft size={12}/> Previous Post</span>
                 <h4 className="text-sm font-bold leading-tight">তিস্তার পানিতে ডুবছে নিম্নাঞ্চল</h4>
             </div>
        </div>
        
        <div className="flex-1 bg-white border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-row-reverse md:flex-row gap-4 items-center justify-end text-right group">
             <div>
                 <span className="text-xs text-gray-400 flex items-center justify-end gap-1 mb-1 group-hover:text-blue-500">Next Post <ArrowRight size={12}/></span>
                 <h4 className="text-sm font-bold leading-tight">নির্ধারিত ছয় মাসের আগেই নতুন বেতন কাঠামো...</h4>
             </div>
             <div className="w-20 h-16 bg-gray-200 overflow-hidden flex-shrink-0">
                 <img src="https://picsum.photos/id/20/200/200" className="w-full h-full object-cover" alt="next" />
             </div>
        </div>
      </div> */}

      {/* Leave a Reply */}
      {/* <div className="bg-gray-50 p-6 md:p-8 rounded border border-gray-100">
        <h3 className="text-xl font-bold mb-6">Leave a Reply</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Enter Name" className="w-full p-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 bg-white" />
            <input type="email" placeholder="Enter Email" className="w-full p-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 bg-white" />
          </div>
          <input type="text" placeholder="Enter Website" className="w-full p-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 bg-white" />
          <textarea placeholder="Enter Comment" rows={6} className="w-full p-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 bg-white resize-none"></textarea>
          
          <button type="button" className="px-6 py-2 border border-gray-400 text-gray-600 text-sm hover:bg-gray-800 hover:text-white transition-all uppercase tracking-wide">
            Post Comment
          </button>
        </form>
      </div> */}

      {/* Related Posts Bottom Section */}
      {/* Title */}
      {/* <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {post?.title}
      </h1> */}

      {/* Meta Header, Author and Hero Image ... (Eshob thik thakbe) */}

      {/* <div className="relative w-full h-[300px] md:h-[450px] bg-gray-100 mb-8 rounded-lg overflow-hidden group">
        <img
          src={post?.image?.url}
          alt={post?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div> */}

      {/* Article Body */}
      {/* <div className="prose prose-lg max-w-none text-gray-700 font-normal leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </div> */}

      {/* Tags Section ... (thik thakbe) */}

      {/* Related Posts Bottom Section - এখানি ম্যাপিং করা হয়েছে */}
      <div className="mt-12">
        <h3 className="text-lg font-bold mb-6 border-l-4 border-black pl-3 uppercase">
          Related Posts
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {relatedPost && relatedPost.length > 0 ? (
              relatedPost.filter((p) => p?._id !== post?._id).slice(0, 4).map((relPost) => (
                <div
                  key={relPost._id}
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="w-24 h-24 overflow-hidden flex-shrink-0 rounded-sm">
                    <img
                      src={
                        relPost?.image?.url || "https://via.placeholder.com/200"
                      }
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      alt={relPost.title}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 leading-snug mb-2 line-clamp-2">
                      <Link to={`/single-post/${relPost._id}`}>{relPost.title}</Link>
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(relPost.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No related posts found.</p>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full space-y-8">
      {/* Search Widget */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-50 border border-gray-200 pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-gray-400"
        />
        <button className="absolute right-0 top-0 h-full px-3 bg-[#1e293b] text-white hover:bg-gray-700 transition-colors">
          <Search size={16} />
        </button>
      </div>

      {/* Recent Posts */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
        <ul className="space-y-3">
          {SIDEBAR_DATA.recentPosts.map((post, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="text-gray-600 text-[13px] hover:text-blue-600 leading-snug block border-b border-gray-100 pb-2 last:border-0"
              >
                {post}
              </a>
            </li>
          ))}
        </ul>
      </div>



      {/* Archives */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Archives</h3>
        <ul className="space-y-2">
          {SIDEBAR_DATA.archives.map((archive, idx) => (
            <li
              key={idx}
              className="text-gray-600 text-sm border border-gray-200 px-3 py-2 rounded-sm hover:bg-gray-50 cursor-pointer flex items-center before:content-['•'] before:mr-2 before:text-gray-400"
            >
              {archive}
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          {SIDEBAR_DATA.categories.map((cat, idx) => (
            <li
              key={idx}
              className="text-gray-600 text-sm border border-gray-200 px-3 py-2 rounded-sm hover:bg-gray-50 cursor-pointer flex items-center before:content-['•'] before:mr-2 before:text-gray-400"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* About Me */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">About Me</h3>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 p-4 rounded text-center">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed text-left">
              Hello ! I am Richard Y. Lim
              <br />
              <br />
              Upon migration to Medina, the direction of the Qibla continued to
              be Jerusalem, although it was then physically impossible for one
              to also face the Ka'ba, as Medina is north of Makkah.
            </p>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Follow Me
              </span>
              <div className="flex gap-2">
                <Facebook
                  size={14}
                  className="text-gray-600 cursor-pointer hover:text-blue-600"
                />
                <Twitter
                  size={14}
                  className="text-gray-600 cursor-pointer hover:text-blue-400"
                />
                <Linkedin
                  size={14}
                  className="text-gray-600 cursor-pointer hover:text-blue-700"
                />
                <Instagram
                  size={14}
                  className="text-gray-600 cursor-pointer hover:text-pink-600"
                />
              </div>
            </div>
          </div>
          <img
            src="https://picsum.photos/id/338/300/100"
            className="w-full h-24 object-cover object-top opacity-80"
            alt="signature placeholder"
          />
        </div>
      </div>

      {/* Recent Articles with Images */}
      {/* <div className="widget">
        <h3 className="text-lg font-bold mb-4">Recent Article</h3>
         <div className="space-y-4">
              {RECENT_ARTICLES_THUMBS.map((post, idx) => (
                  <div key={idx} className="flex gap-4 items-center group cursor-pointer border-b border-gray-100 pb-3 last:border-0">
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                          <img src={post?.image?.url} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-800 text-xs md:text-sm leading-tight group-hover:text-blue-600 transition-colors mb-1">{post.title}</h4>
                          <div className="flex items-center gap-1 text-[10px] text-gray-400">
                             <span>DainikBangali@Gmail.com</span>
                             <span>•</span>
                             <span>{post.date}</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div> */}

      {/* Newsletter */}
      <div className="widget bg-linear-to-r from-red-600 via-red-500 to-green-700 p-6 text-white text-center rounded-sm">
        <h3 className="text-xl font-bold mb-2">Subscribe To Our Newsletter</h3>
        <p className="text-xs text-white mb-6">
          No spam, notifications only about new stories and updates.
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full py-2 px-3 text-sm text-white rounded-sm focus:outline-none"
          />
          <button className="w-full bg-[#ff6b6b] hover:bg-[#fa5252] text-white font-bold py-2 text-sm rounded-sm uppercase tracking-wider transition-colors">
            Sign Up
          </button>
        </div>
      </div>

      {/* Categories / Tags Cloud */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <div className="flex flex-col space-y-2">
          {SIDEBAR_DATA.categories.slice(0, 5).map((cat, idx) => (
            <div
              key={idx}
              className="text-sm text-gray-600 border border-gray-200 p-2 rounded hover:bg-gray-50 cursor-pointer flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Tags Cloud</h3>
        <div className="flex flex-wrap gap-2">
          {SIDEBAR_DATA.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white border border-gray-200 text-gray-500 text-xs hover:bg-[#1e293b] hover:text-white transition-colors cursor-pointer capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

// --- Main App Component ---

export default function BlogSinglePost() {
  const { id } = useParams();
  const { data: post } = useFetchPostById(id);
  return (
    <div className="min-h-screen pt-30 bg-white">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Article */}
          <main className="w-full lg:w-[70%]">
            <ArticleLayout post={post} />
          </main>

          {/* Right Column: Sidebar */}
          <aside className="w-full lg:w-[30%]">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
