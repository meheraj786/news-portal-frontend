import Container from "../container/Container";

export default function Topheader() {
  // Get current date
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const dateString = today.toLocaleDateString("en-US", options);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gray-200 border-b border-gray-300">
      <Container className="mx-auto py-2 flex justify-between items-center text-sm font-medium">
        {/* Left */}
        {/* <div className="  text-red-600 font-semibold cursor-pointer">
          Breaking News
        </div> */}

        {/* Center */}
        <div className="text-gray-700">{dateString}</div>

        {/* Right */}
        <div className="flex gap-4 text-gray-600">
          <span className="cursor-pointer hover:text-red-600 transition">
            English
          </span>
          <span className="cursor-pointer hover:text-red-600 transition">
            E-Paper
          </span>
        </div>
      </Container>
    </header>
  );
}
