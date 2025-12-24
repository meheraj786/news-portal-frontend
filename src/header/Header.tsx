import { useState } from "react";
import Container from "../components/container/Container";
import Logo from "../components/logo/Logo";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NewsCard from "@/components/newsitems/NewsCard";
import { useFetchNavMenu } from "@/api/hooks/navMenu";
import { useSearchPosts } from "@/api/hooks/post";
import { Loader2 } from "lucide-react";
import Loader from "@/components/Loader/Loader";
import type { CardProps } from "@/types/CardProps";

interface NavItem {
  _id: string;
  name: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: navData, isLoading: loading } = useFetchNavMenu();
  const navItems = navData as unknown as NavItem[];

  // সার্চ এপিআই কল
  const { data: searchResults, isLoading } = useSearchPosts({
    query: searchTerm,
    limit: 5,
  });

  return (
    <header className="w-full bg-white shadow-md fixed top-9 left-0 z-50 shadow-gray-200">
      {loading && <Loader />}
      <Container>
        <div className="w-full">
          <div className="mx-auto py-5 flex justify-between items-center">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
              {Array.isArray(navItems) &&
                navItems.map((nav) => (
                  <Link
                    key={nav._id}
                    to={`/category/${nav._id}`}
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    {nav.name}
                  </Link>
                ))}
            </div>

            {/* Search Section */}
            <div className="mx-4 hidden lg:flex max-w-[250px]">
              <Dialog onOpenChange={(open) => !open && setSearchTerm("")}>
                <DialogTrigger className="ms-auto" asChild>
                  <Button variant="outline" className="size-10">
                    <CiSearch />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[750px] max-h-[90vh] p-7 overflow-y-auto">
                  <DialogHeader>
                    <Label className="text-lg font-semibold">Search News</Label>
                  </DialogHeader>

                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search by title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                    {isLoading && (
                      <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                    )}
                  </div>

                  {/* Search Results Area */}
                  <div className="space-y-4 mt-6">
                    {!isLoading &&
                      searchTerm &&
                      searchResults?.data.length === 0 && (
                        <p className="text-center text-gray-500 py-10">
                          No results found for "{searchTerm}"
                        </p>
                      )}

                    {/* ক্লিক করলে সিঙ্গেল পোস্টে যাবে এবং ডায়ালগ বন্ধ হবে */}
                    {(searchResults?.data as CardProps[])?.map((item) => (
                      <DialogClose asChild key={item._id}>
                        <Link
                          to={`/single-post/${item._id}`}
                          className="block hover:bg-slate-50 transition rounded-xl p-1"
                        >
                          <NewsCard
                            createdAt={item?.createdAt}
                            content={
                              item?.content
                                ?.replace(/<[^>]*>/g, "")
                                .substring(0, 150) + "..."
                            }
                            image={item.image}
                            title={item.title}
                          />
                        </Link>
                      </DialogClose>
                    ))}

                    {!searchTerm && (
                      <p className="text-center text-gray-400 py-10">
                        Type something to search for news...
                      </p>
                    )}
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <div className="space-y-1">
                  <span
                    className={`block h-0.5 w-6 bg-gray-700 transition ${
                      isOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-gray-700 transition ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-gray-700 transition ${
                      isOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-3 grid grid-cols-2 gap-2">
              {Array.isArray(navItems) &&
                navItems.map((nav) => (
                  <Link
                    key={nav._id}
                    to={`/category/${nav._id}`}
                    className="hover:text-red-600 p-2 text-center border rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {nav.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
