import { useState } from "react";
import Container from "../components/container/Container";
import Logo from "../components/logo/Logo";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Date
  // const today = new Date();
  // const options: Intl.DateTimeFormatOptions = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // };
  // const dateString = today.toLocaleDateString("en-US", options);
  type NavItems = {
    name: string;
    path?: string;
  };

  const navItems: NavItems[] = [
    {
      name: "জাতীয়",
      path: "/",
    },
    {
      name: "রাজনীতি",
      path: "/",
    },
    {
      name: "রাজনীতি",
      path: "/",
    },
    {
      name: "বিনোদন",
      path: "/",
    },
    {
      name: "খেলাধুলা",
      path: "/",
    },
    {
      name: "শিক্ষা",
      path: "/",
    },
    {
      name: "ধর্ম ও জীবন",
      path: "/",
    },
    {
      name: "মতামত",
      path: "/",
    },
  ];
  return (
    <header className="w-full bg-white shadow-md  fixed top-9 left-0 z-50 shadow-gray-200">
      <Container>
        {/* Main Header */}

        <div className="w-full ">
          <div className=" mx-auto  py-5 flex justify-between items-center">
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
              {navItems.map((nav, i) =>
                nav.path ? (
                  <Link
                    to={`category/${nav.name}`}
                    key={i}
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    {nav.name}
                  </Link>
                ) : (
                  <span
                    key={i}
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    {nav.name}
                  </span>
                )
              )}
            </div>
            {/* Search - hidden on mobile */}
            <div className="flex-1 mx-4 hidden lg:flex max-w-[250px] md:hidden ">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-md  py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="hidden sm:block">
              <a href="">
                <CiSearch />
              </a>
            </div>

            {/* Hamburger menu - mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <div className="space-y-1">
                  <span
                    className={`block h-0.5 w-6 bg-gray-700 transition-transform ${
                      isOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-gray-700 transition-opacity ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-gray-700 transition-transform ${
                      isOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-200  py-2 grid grid-cols-2 gap-2">
              {navItems.map((nav, i) =>
                nav.path ? (
                  <Link
                    to={`/category/${nav.path}`}
                    key={i}
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    {nav.name}
                  </Link>
                ) : (
                  <span>{nav.name}</span>
                )
              )}
              {/* Mobile search */}
              <input
                type="text"
                placeholder="Search..."
                className="mt-2 border border-gray-300 rounded-md  py-1 focus:outline-none focus:ring-2 focus:ring-red-500 "
              />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
