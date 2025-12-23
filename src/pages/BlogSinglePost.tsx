import React, { useEffect } from "react";
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
import { useFetchPostById, useFetchPostsByCategory, type SinglePostData } from "@/api/hooks/post";
import { useRandomAd } from "@/components/ads/RandomAds";
import DateFormatter from "@/components/DateFormatter";
import Loader from "@/components/Loader/Loader";
// Removed react-share imports - using custom share buttons

// --- Types ---

interface BlogPost {
  _id: string;
  title: string;
  date: string;
  image: {
    url: string;
  };
  content: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  tags: Array<{
    _id: string;
    name: string;
  }>;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
}

// Custom Hook for Meta Tags (React 19 Compatible)
const useMetaTags = (metaData: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  tags?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}) => {
  useEffect(() => {
    // Update document title
    if (metaData.title) {
      document.title = `${metaData.title} - Dainik Bangali`;
    }

    // Helper function to set meta tag
    const setMetaTag = (property: string, content: string, isName = false) => {
      if (!content) return;

      const attribute = isName ? "name" : "property";
      let element = document.querySelector(
        `meta[${attribute}="${property}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Set all meta tags
    setMetaTag("description", metaData.description || "", true);

    // Open Graph tags
    setMetaTag("og:type", metaData.type || "article");
    setMetaTag("og:url", metaData.url || "");
    setMetaTag("og:title", metaData.title || "");
    setMetaTag("og:description", metaData.description || "");
    setMetaTag("og:image", metaData.image || "");
    setMetaTag("og:image:width", "1200");
    setMetaTag("og:image:height", "630");
    setMetaTag("og:site_name", "Dainik Bangali");

    // Twitter tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:url", metaData.url || "");
    setMetaTag("twitter:title", metaData.title || "");
    setMetaTag("twitter:description", metaData.description || "");
    setMetaTag("twitter:image", metaData.image || "");

    // Article specific tags
    if (metaData.publishedTime) {
      setMetaTag("article:published_time", metaData.publishedTime);
    }
    if (metaData.modifiedTime) {
      setMetaTag("article:modified_time", metaData.modifiedTime);
    }
    if (metaData.section) {
      setMetaTag("article:section", metaData.section);
    }

    // Cleanup function
    return () => {
      document.title = "Dainik Bangali";
    };
  }, [metaData]);
};

const SIDEBAR_DATA = {
  recentPosts: [
    "ঢাকা-৮ আসনের স্বতন্ত্র প্রার্থী উসমান গনি জলিবিদ্ধ",
    "ব্যাপক বিক্ষোভের মধ্যে পদত্যাগ করলেন বুলগেরিয়ার প্রধানমন্ত্রী রসেন ওলিয়াচকোভ",
    "মিসাইল ও ড্রোন প্রযুক্তির বিনিময়ে ইউক্রেনকে মিগ-২৯ দিবে পোল্যান্ড",
    "বাংলাদেশ-কেরিয়া উন্নয়ন সহযোগিতা আরও জোরদার করতে চায়: প্রধান উপদেষ্টা ড. ইউনূস",
    "ভোলা-বরিশাল সেতুর দাবিতে ২২৫ মেগাওয়াট বিদ্যুৎকেন্দ্র ঘেরাও",
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
    "জাতীয়",
    "দেশজুড়ে",
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
    "আওয়ামী লীগ",
    "আরিফুল ইসলাম খান",
    "কলকাতা",
    "কালীপূজা",
  ],
};

// --- Sub-components ---

const ArticleLayout = ({ post }: { post: BlogPost | null }) => {
  // Early return if post is not loaded
  if (!post) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  // Proper URL formatting - Make sure it's the full absolute URL
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareTitle = post?.title || "";
  const shareDescription =
    post?.content?.replace(/<[^>]*>/g, "").substring(0, 200) || "";

  // Log for debugging
  console.log("Share URL:", shareUrl);
  console.log("Share Title:", shareTitle);

  // Share handler functions
  const handleFacebookShare = () => {
    const url = encodeURIComponent(shareUrl);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    // Open in popup
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      fbShareUrl,
      "facebook-share-dialog",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareTitle);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=DainikBangali,News`;

    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      twitterUrl,
      "twitter-share-dialog",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(shareUrl);
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      linkedinUrl,
      "linkedin-share-dialog",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareTitle} - ${shareUrl}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("✓ Link copied to clipboard!");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("✓ Link copied to clipboard!");
    }
  };

  const { data: relatedPost, isLoading } = useFetchPostsByCategory(
    post?.category?._id as string
  );

  return (
    <article className="w-full">
      {isLoading && <Loader />}

      {/* Meta Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs md:text-sm text-gray-500 font-medium">
        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-sm font-bold uppercase text-[10px] md:text-xs">
          {post?.category?.name || "Uncategorized"}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> <DateFormatter date={post?.createdAt} />
        </span>
        <span className="flex items-center gap-1">
          <Eye size={14} /> {post?.views || 0}
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
          <span>{post?.views || 0}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[450px] bg-gray-100 mb-8 rounded-lg overflow-hidden group">
        <img
          src={post?.image?.url || "https://via.placeholder.com/800x450"}
          alt={post?.title || "Blog post image"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none text-gray-700 font-normal leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
      </div>

      {/* Tags and Share Buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-8 mb-8 border-t border-b border-gray-100 py-4">
        <div className="flex items-center gap-2 flex-1">
          <span className="font-bold text-gray-900">Tags:</span>
          <div className="flex flex-wrap gap-2">
            {post?.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
              post.tags.map((tag) => (
                <span
                  key={tag?._id}
                  className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {tag?.name}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">No tags available</span>
            )}
          </div>
        </div>

        {/* Custom Share Buttons with Proper Handlers */}
        <div className="flex gap-3">
          {/* Facebook Share */}
          <button
            onClick={handleFacebookShare}
            className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166FE5] flex items-center justify-center transition-colors"
            title="Share on Facebook"
          >
            <Facebook size={20} className="text-white" />
          </button>

          {/* Twitter Share */}
          <button
            onClick={handleTwitterShare}
            className="w-9 h-9 rounded-full bg-[#1DA1F2] hover:bg-[#1A8CD8] flex items-center justify-center transition-colors"
            title="Share on Twitter"
          >
            <Twitter size={20} className="text-white" />
          </button>

          {/* LinkedIn Share */}
          <button
            onClick={handleLinkedInShare}
            className="w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-[#095196] flex items-center justify-center transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin size={20} className="text-white" />
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20BD5A] flex items-center justify-center transition-colors"
            title="Share on WhatsApp"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-9 h-9 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition-colors"
            title="Copy Link"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Related Posts Bottom Section */}
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
              relatedPost
                .filter((p) => p?._id !== post?._id)
                .slice(0, 4)
                .map((relPost :SinglePostData) => (
                  <div
                    key={relPost._id}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="w-24 h-24 overflow-hidden flex-shrink-0 rounded-sm">
                      <img
                        src={
                          relPost?.image?.url ||
                          "https://via.placeholder.com/200"
                        }
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        alt={relPost.title}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 leading-snug mb-2 line-clamp-2">
                        <Link to={`/single-post/${relPost._id}`}>
                          {relPost.title}
                        </Link>
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

      {/* Newsletter */}
      <div className="widget bg-gradient-to-r from-red-600 via-red-500 to-green-700 p-6 text-white text-center rounded-sm">
        <h3 className="text-xl font-bold mb-2">Subscribe To Our Newsletter</h3>
        <p className="text-xs text-white mb-6">
          No spam, notifications only about new stories and updates.
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full py-2 px-3 text-sm text-gray-800 rounded-sm focus:outline-none"
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
  const { data: post, isLoading } = useFetchPostById(id);

  // Prepare meta data - Use full URL
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareDescription =
    post?.content?.replace(/<[^>]*>/g, "").substring(0, 200) || "";
  const shareImage = post?.image?.url || "https://via.placeholder.com/1200x630";

  // Use custom meta tags hook
  useMetaTags({
    title: post?.title,
    description: shareDescription,
    image: shareImage,
    url: shareUrl,
    type: "article",
    publishedTime: post?.createdAt,
    modifiedTime: post?.updatedAt,
    section: post?.category?.name,
    tags: post?.tags?.map((tag) => tag.name) || [],
  });

  if (isLoading || !post) {
    return (
      <div className="min-h-screen pt-30 bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

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
