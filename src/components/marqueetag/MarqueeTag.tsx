import React from "react";
import Container from "../container/Container";
import Marquee from "react-fast-marquee";

const MarqueeTag: React.FC = () => {
  return (
    <div className="h-[55px] flex items-center bg-red-500 shadow-md w-full overflow-hidden">
      <Container className="w-full">
        <div className="flex items-center gap-x-3 w-full overflow-hidden">
          {/* LABEL */}
          <div className="shrink-0">
            <p
              className="text-red-500 text-center bg-white font-primary font-bold 
              text-[12px] md:text-[14px] py-1 px-3 rounded"
            >
              Latest News
            </p>
          </div>

          {/* MARQUEE WRAPPER — THE FIX */}
          <div className="flex-1 overflow-hidden">
            <Marquee
              speed={80}
              pauseOnHover={true}
              gradient={false}
              className="text-white text-xs md:text-sm"
            >
              I can be a React component… • Smooth responsive ticker… • Add
              unlimited breaking news!
            </Marquee>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarqueeTag;
