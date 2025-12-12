import  { useState } from "react";
import Container from "../components/container/Container";
import Logo from "../components/logo/Logo";

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

  return (
    <header className="w-full bg-white shadow-lg fixed top-9 left-0 z-50 shadow-gray-200">
      <Container>
      {/* Main Header */}

      <div className="w-full ">
        <div className=" mx-auto  py-5 flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Search - hidden on mobile */}
          <div className="flex-1 mx-4 hidden md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md  py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Navigation */}
          <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
            <span className="cursor-pointer hover:text-red-600 transition">
              জাতীয়
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              রাজনীতি
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              বিনোদন
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              খেলাধুলা
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              আন্তর্জাতিক
            </span>
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
          <div className="md:hidden bg-white border-t border-gray-200  py-2 flex flex-col gap-2">
            <span className="cursor-pointer hover:text-red-600 transition">
              জাতীয়
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              রাজনীতি
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              বিনোদন
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              খেলাধুলা
            </span>
            <span className="cursor-pointer hover:text-red-600 transition">
              আন্তর্জাতিক
            </span>
            {/* Mobile search */}
            <input
              type="text"
              placeholder="Search..."
              className="mt-2 border border-gray-300 rounded-md  py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}
      </div>
      </Container>
    </header>
  );
}
