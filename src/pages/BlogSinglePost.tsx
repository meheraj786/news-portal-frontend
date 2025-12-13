import React from 'react';
import { User, Calendar, MessageCircle, Clock, Eye, Facebook, Twitter, Linkedin, Instagram, ArrowLeft, ArrowRight, Search } from 'lucide-react';

// --- Types ---

interface BlogPost {
  title: string;
  date: string;
  image: string;
}

// --- Constants ---

const ARTICLE_CONTENT = {
  category: "ইতিহাস",
  readTime: "1 min read",
  views: "86",
  title: "বাংলা জাতিসত্তা: বাংলাদেশ ও পশ্চিমবঙ্গের বাঙালির গর্ব, সংগ্রাম ও পরিচয়",
  author: "Dainikbangali@Gmail.Com",
  date: "September 15, 2025",
  comments: "0",
  intro: "বাংলা মানে শুধু একটি ভাষা নয়, এটি একটি সম্পূর্ণ সভ্যতা। একদিকে বাংলাদেশের বাঙালি, অন্যদিকে ভারতের পশ্চিমবঙ্গের বাঙালি—দু'জনেই এক ভাষায় কথা বলে, এক সংস্কৃতি বহন করে, এক ঐতিহ্যে বেড়ে উঠেছে। ভৌগোলিক সীমারেখা আলাদা হলেও, বাংলা ভাষা আমাদের এক করে রাখে।",
  p2: "১৯৫২ সালের ভাষা আন্দোলন থেকে শুরু করে রবীন্দ্রনাথের নোবেল জয়, নজরুলের বিদ্রোহী কবিতা, কিংবা সুকুমার রায়ের রসিকতা—সবই এই বাঙালি জাতিসত্তার অংশ। তাই বলা যায়, বাংলা ভাষা মানে আমাদের আত্মপরিচয়ের শিকড়, আর বাংলাদেশ ও পশ্চিমবঙ্গ মিলেই হলো বাঙালি জাতির পূর্ণ রূপ।",
  sections: [
    {
      title: "বাঙালি কারা?",
      content: "বাঙালি হলো সেই জাতি যারা বাংলাকে মাতৃভাষা হিসেবে ব্যবহার করে, এবং যাদের সংস্কৃতি, সাহিত্য, সংগীত, খাবার, পোশাক, উৎসব—সবই বাংলা ঐতিহ্যের সঙ্গে মিশে আছে।",
      bullets: [
        "বাংলাদেশ: প্রায় ১৭ কোটি মানুষ বাংলা ভাষায় কথা বলে। স্বাধীনতা যুদ্ধ, ভাষা আন্দোলন, এবং সাংস্কৃতিক চেতনা—সবকিছুই এখানে বাংলার মর্যাদা রক্ষায় ভূমিকা রেখেছে।",
        "পশ্চিমবঙ্গ (ভারত): প্রায় ১০ কোটি মানুষ বাংলা ভাষায় কথা বলে। কলকাতা, শান্তিনিকেতন, দার্জিলিং থেকে সুন্দরবন—সবখানেই বাংলা সংস্কৃতির ছাপ পাওয়া যায়।"
      ]
    },
    {
      title: "কেন হিন্দিভাষীরা বাংলার বিরোধিতা করে?",
      content: "ভারতের রাষ্ট্রভাষা হিসেবে হিন্দির আধিপত্য চাপিয়ে দেওয়ার প্রচেষ্টা দীর্ঘদিন ধরে চলছে। ফলে পশ্চিমবঙ্গের বাঙালিরা বহুবার প্রতিবাদ করেছে। অনেক হিন্দিভাষী মানুষ মনে করেন, হিন্দিই ভারতের একমাত্র পরিচয় হওয়া উচিত।",
      extra: "কিন্তু বাস্তব হলো, ভারত বহুভাষী দেশ, এবং বাংলা ভারতের অন্যতম প্রাচীন ও সমৃদ্ধ ভাষা। তাই যখন বাংলাকে অবহেলা করা হয়, তখন বাঙালি হিন্দি আধিপত্যকে মেনে নেয় না।"
    },
    {
      title: "বাংলা ভাষার গৌরব",
      list: [
        "ভাষা আন্দোলন (১৯৫২, বাংলাদেশ): পৃথিবীর একমাত্র জাতি যারা ভাষার জন্য জীবন দিয়েছে। সালাম, রফিক, বরকত, জব্বাররা প্রমাণ করেছিলেন—ভাষা পরিচয়ের চেয়ে বড় কিছু নেই।",
        "সাহিত্য: রবীন্দ্রনাথ ঠাকুর (নোবেলজয়ী কবি), কাজী নজরুল ইসলাম (জাতীয় কবি), জীবনানন্দ দাশ—সবাই বাংলাকে সমৃদ্ধ করেছেন।"
      ]
    }
  ],
  conclusion: "বাংলা জাতিসত্তা শুধু একটি স্লোগান নয়, এটি বাংলাদেশ ও পশ্চিমবঙ্গ মিলিয়ে এক অদম্য শক্তি। অন্য ভাষাভাষীরা যখন বাংলাকে ছোট করতে চায়, তখন আমাদের মনে রাখতে হবে—আমরা সেই জাতি যারা ভাষার জন্য জীবন দিয়েছে।",
  tags: ["বাঙালি", "বাংলা", "বাংলা জাতিসত্তা"]
};

const SIDEBAR_DATA = {
  recentPosts: [
    "ঢাকা-৮ আসনের স্বতন্ত্র প্রার্থী উসমান গনি জলিবিদ্ধ",
    "ব্যাপক বিক্ষোভের মধ্যে পদত্যাগ করলেন বুলগেরিয়ার প্রধানমন্ত্রী রসেন ওলিয়াচকোভ",
    "মিসাইল ও ড্রোন প্রযুক্তির বিনিময়ে ইউক্রেনকে মিগ-২৯ দিবে পোল্যান্ড",
    "বাংলাদেশ-কেরিয়া উন্নয়ন সহযোগিতা আরও জোরদার করতে চায়: প্রধান উপদেষ্টা ড. ইউনূস",
    "ভোলা-বরিশাল সেতুর দাবিতে ২২৫ মেগাওয়াট বিদ্যুৎকেন্দ্র ঘেরাও"
  ],
  archives: [
    "December 2025", "November 2025", "October 2025", "September 2025", "August 2025", "July 2025"
  ],
  categories: [
    "Uncategorized", "অর্থ-বাণিজ্য", "অর্থনীতি", "আইন-আদালত", "খেলাধুলা", "জাতীয়", "দেশজুড়ে", "ধর্ম ও জীবন", "প্রবাস"
  ],
  tags: [
    "bangladesh vs srilanka", "building", "design", "fashion", "gadget", "gaza", "lifestyle", "Realestate", "story", "style", "আওয়ামী লীগ", "আরিফুল ইসলাম খান", "কলকাতা", "কালীপূজা"
  ]
};

const RECENT_ARTICLES_THUMBS: BlogPost[] = [
  {
    title: "ঢাকা-৮ আসনের স্বতন্ত্র প্রার্থী উসমান গনি জলিবিদ্ধ",
    date: "December 12, 2025",
    image: "https://picsum.photos/id/1015/80/80"
  },
  {
    title: "ব্যাপক বিক্ষোভের মধ্যে পদত্যাগ করলেন বুলগেরিয়ার প্রধানমন্ত্রী",
    date: "December 11, 2025",
    image: "https://picsum.photos/id/1025/80/80"
  },
  {
    title: "মিসাইল ও ড্রোন প্রযুক্তির বিনিময়ে ইউক্রেনকে মিগ-২৯",
    date: "December 11, 2025",
    image: "https://picsum.photos/id/1012/80/80"
  }
];

// --- Sub-components ---

const ArticleLayout: React.FC = () => {
  return (
    <article className="w-full">
      {/* Meta Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs md:text-sm text-gray-500 font-medium">
        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-sm font-bold uppercase text-[10px] md:text-xs">
          {ARTICLE_CONTENT.category}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> {ARTICLE_CONTENT.readTime}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={14} /> {ARTICLE_CONTENT.views}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {ARTICLE_CONTENT.title}
      </h1>

      {/* Author and Date Line */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs md:text-sm text-gray-500 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span className="text-gray-700 font-semibold">{ARTICLE_CONTENT.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{ARTICLE_CONTENT.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle size={14} />
          <span>{ARTICLE_CONTENT.comments}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[450px] bg-gray-100 mb-8 rounded-lg overflow-hidden group">
        <img 
          src="https://picsum.photos/id/1029/1200/600" 
          alt="Bengali Culture" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay Text attempting to match the 'Bangali' red text style roughly */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/20">
             <h1 className="text-red-600/90 font-bold text-6xl md:text-9xl drop-shadow-md select-none tracking-tighter">
                বাঙালি
             </h1>
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none text-gray-700 font-normal leading-relaxed">
        <p className="mb-4">{ARTICLE_CONTENT.intro}</p>
        <p className="mb-8">{ARTICLE_CONTENT.p2}</p>

        {ARTICLE_CONTENT.sections.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            {section.content && <p className="mb-4">{section.content}</p>}
            
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-gray-400">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            )}

             {section.list && (
              <ol className="list-decimal pl-5 space-y-3 mb-4 marker:font-bold marker:text-gray-900">
                {section.list.map((item, lIdx) => (
                  <li key={lIdx}>
                    <span className="font-semibold">{item.split(':')[0]}:</span>
                    {item.split(':')[1]}
                  </li>
                ))}
              </ol>
            )}

            {section.extra && <p className="mb-4">{section.extra}</p>}
          </div>
        ))}

        <div className="bg-gray-50 border-l-4 border-gray-800 p-6 my-8 italic">
            <h3 className="text-xl font-bold mb-2">উপসংহার</h3>
            <p>{ARTICLE_CONTENT.conclusion}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-8 mb-8 border-t border-b border-gray-100 py-4">
        <span className="font-bold text-gray-900">Tags:</span>
        <div className="flex flex-wrap gap-2">
          {ARTICLE_CONTENT.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-100 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author Box */}
      <div className="bg-[#F2F4F8] p-6 md:p-8 rounded-md flex flex-col md:flex-row gap-6 mb-10 items-start">
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

       {/* Check latest article from this author */}
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
       </div>


      {/* Previous/Next Post Navigation */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
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
      </div>

      {/* Leave a Reply */}
      <div className="bg-gray-50 p-6 md:p-8 rounded border border-gray-100">
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
      </div>

       {/* Related Posts Bottom Section */}
       <div className="mt-12">
            <h3 className="text-lg font-bold mb-6 border-l-4 border-black pl-3 uppercase">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="flex gap-4 group cursor-pointer">
                    <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                         <img src="https://picsum.photos/id/55/200/200" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="rel" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 leading-snug mb-2">কলকাতা এক শহরের ভেতরে হাজার গল্প</h4>
                        <span className="text-xs text-gray-500">September 14, 2025</span>
                    </div>
                </div>
                <div className="flex gap-4 group cursor-pointer">
                    <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                         <img src="https://picsum.photos/id/66/200/200" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="rel" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 leading-snug mb-2">Sikkim Travel Guide: A Complete Experience in the Himalayas</h4>
                        <span className="text-xs text-gray-500">September 14, 2025</span>
                    </div>
                </div>
                <div className="flex gap-4 group cursor-pointer">
                    <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                         <img src="https://picsum.photos/id/77/200/200" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="rel" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 leading-snug mb-2">বান্দরবান পাহাড়ের বুকে এক টুকরো স্বর্গ</h4>
                        <span className="text-xs text-gray-500">September 14, 2025</span>
                    </div>
                </div>
            </div>
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
              <a href="#" className="text-gray-600 text-[13px] hover:text-blue-600 leading-snug block border-b border-gray-100 pb-2 last:border-0">
                {post}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Comments */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Recent Comments</h3>
        <p className="text-sm text-gray-500 italic">No comments to show.</p>
      </div>

      {/* Archives */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Archives</h3>
        <ul className="space-y-2">
          {SIDEBAR_DATA.archives.map((archive, idx) => (
            <li key={idx} className="text-gray-600 text-sm border border-gray-200 px-3 py-2 rounded-sm hover:bg-gray-50 cursor-pointer flex items-center before:content-['•'] before:mr-2 before:text-gray-400">
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
                <li key={idx} className="text-gray-600 text-sm border border-gray-200 px-3 py-2 rounded-sm hover:bg-gray-50 cursor-pointer flex items-center before:content-['•'] before:mr-2 before:text-gray-400">
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
                     Hello ! I am Richard Y. Lim<br/><br/>
                     Upon migration to Medina, the direction of the Qibla continued to be Jerusalem, although it was then physically impossible for one to also face the Ka'ba, as Medina is north of Makkah.
                 </p>
                 <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
                     <span className="text-xs font-bold text-gray-500 uppercase">Follow Me</span>
                     <div className="flex gap-2">
                        <Facebook size={14} className="text-gray-600 cursor-pointer hover:text-blue-600" />
                        <Twitter size={14} className="text-gray-600 cursor-pointer hover:text-blue-400" />
                        <Linkedin size={14} className="text-gray-600 cursor-pointer hover:text-blue-700" />
                        <Instagram size={14} className="text-gray-600 cursor-pointer hover:text-pink-600" />
                     </div>
                 </div>
             </div>
             <img src="https://picsum.photos/id/338/300/100" className="w-full h-24 object-cover object-top opacity-80" alt="signature placeholder" />
        </div>
       </div>


      {/* Recent Articles with Images */}
      <div className="widget">
        <h3 className="text-lg font-bold mb-4">Recent Article</h3>
         <div className="space-y-4">
              {RECENT_ARTICLES_THUMBS.map((post, idx) => (
                  <div key={idx} className="flex gap-4 items-center group cursor-pointer border-b border-gray-100 pb-3 last:border-0">
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
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
      </div>

       {/* Newsletter */}
       <div className="widget bg-[#5e6d7a] p-6 text-white text-center rounded-sm">
            <h3 className="text-xl font-bold mb-2">Subscribe To Our Newsletter</h3>
            <p className="text-xs text-gray-300 mb-6">No spam, notifications only about new stories and updates.</p>
            <div className="space-y-2">
                <input type="email" placeholder="Your email address" className="w-full py-2 px-3 text-sm text-gray-800 rounded-sm focus:outline-none" />
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
                     <div key={idx} className="text-sm text-gray-600 border border-gray-200 p-2 rounded hover:bg-gray-50 cursor-pointer flex items-center gap-2">
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
                <span key={idx} className="px-3 py-1 bg-white border border-gray-200 text-gray-500 text-xs hover:bg-[#1e293b] hover:text-white transition-colors cursor-pointer capitalize">
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
  return (
    <div className="min-h-screen pt-30 bg-white">
        
        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Left Column: Article */}
                <main className="w-full lg:w-[70%]">
                    <ArticleLayout />
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