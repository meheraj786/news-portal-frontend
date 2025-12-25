import React, { useEffect } from "react";
import {
  User,
  Calendar,
  Clock,
  Eye,
  Facebook,
  Twitter,
  Search,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useFetchPostById, useFetchPostsByCategory } from "@/api/hooks/post";
import DateFormatter from "@/components/DateFormatter";
import Loader from "@/components/Loader/Loader";
import type { CardProps } from "@/types/CardProps";
import RecentPost from "@/components/recentpost/RecentPost";
import SquareAds from "@/components/ads/SquareAds";
import { Helmet } from "react-helmet-async"; // Helmet এখানে ইমপোর্ট করা আছে

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

// Custom Hook for Meta Tags (Optional but kept for safety)
const useMetaTags = (metaData: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
}) => {
  useEffect(() => {
    if (metaData.title) {
      document.title = `${metaData.title} - Dainik Bangali`;
    }
    return () => {
      document.title = "Dainik Bangali";
    };
  }, [metaData]);
};

// --- Sub-components ---
const ArticleLayout = ({ post }: { post: BlogPost | null }) => {
  const categoryId = post?.category?._id || "";
  const { data: relatedPostData, isLoading } =
    useFetchPostsByCategory(categoryId);
  const relatedPosts = (relatedPostData as unknown as CardProps[]) || [];

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title || "";

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "fb-share",
      "width=600,height=400"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareTitle)}`,
      "tw-share",
      "width=600,height=400"
    );
  };

  const handleWhatsAppShare = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareTitle + " - " + shareUrl
      )}`,
      "_blank"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("✓ Link copied to clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <article className="w-full">
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs md:text-sm text-gray-500 font-medium">
        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-sm font-bold uppercase text-[10px] md:text-xs">
          {post.category?.name || "Uncategorized"}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> <DateFormatter date={post.createdAt} />
        </span>
        <span className="flex items-center gap-1">
          <Eye size={14} /> {post.views || 0}
        </span>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs md:text-sm text-gray-500 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span className="text-gray-700 font-semibold">Author</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>
            <DateFormatter date={post.createdAt} />
          </span>
        </div>
      </div>

      <div className="relative w-full h-[300px] md:h-[450px] bg-gray-100 mb-8 rounded-lg overflow-hidden group">
        <img
          src={post.image?.url || "https://via.placeholder.com/800x450"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 font-normal leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-8 mb-8 border-t border-b border-gray-100 py-4">
        <div className="flex items-center gap-2 flex-1">
          <span className="font-bold text-gray-900">Tags:</span>
          <div className="flex wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag?._id}
                className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded"
              >
                {tag?.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleFacebookShare}
            className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center"
          >
            <Facebook size={20} className="text-white" />
          </button>
          <button
            onClick={handleTwitterShare}
            className="w-9 h-9 rounded-full bg-[#1DA1F2] flex items-center justify-center"
          >
            <Twitter size={20} className="text-white" />
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center"
          >
            <Search size={20} className="text-white" />
          </button>
          <button
            onClick={handleCopyLink}
            className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-white"
          >
            🔗
          </button>
        </div>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.length > 0 ? (
              relatedPosts
                .filter((p: CardProps) => p?._id !== post?._id)
                .slice(0, 4)
                .map((relPost: CardProps) => (
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
                        <DateFormatter date={relPost.createdAt} />
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
      <div className="widget">
        <RecentPost />
      </div>
      <div className="widget">
        <SquareAds />
      </div>
    </aside>
  );
};

// --- Main Component ---
export default function BlogSinglePost() {
  const { id } = useParams();
  const { data: post, isLoading } = useFetchPostById(id || "");

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareDescription =
    post?.content?.replace(/<[^>]*>/g, "").substring(0, 160) || "";

  // Custom Hook (Title update-এর জন্য রাখা হলো)
  useMetaTags({
    title: post?.title,
    description: shareDescription,
    image: post?.image?.url,
    url: shareUrl,
    type: "article",
    publishedTime: post?.createdAt,
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
      {/* --- এই যে নিচে Helmet পার্টটা বসালাম --- */}
      <Helmet>
        <title>{post.title} - Dainik Bangali</title>
        <meta name="description" content={shareDescription} />
        <link rel="canonical" href={shareUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:image" content={post.image?.url} />
        <meta property="og:url" content={shareUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={shareDescription} />
        <meta name="twitter:image" content={post.image?.url} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="w-full lg:w-[70%]">
            <ArticleLayout post={post as unknown as BlogPost} />
          </main>
          <aside className="w-full lg:w-[30%]">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
