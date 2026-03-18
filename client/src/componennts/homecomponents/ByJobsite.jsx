import React from "react";
import LazyLoad from "../LazyLoad";
import { cat5, cat3, cat7, cat4, cat6, cat2 } from "@/assets";

const ByJobsite = () => {
  return (
    <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl mb-24">
      <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold ">
          Buy by{" "}
          <span className="bg-gradient-to-r from-black/90 to-yellow-400 text-transparent bg-clip-text inline-block">
            Jobsite
          </span>
        </h3>
        <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
          Find the right equipment for construction, mining, oil & gas,
          agriculture, aggregate, and quarry.
        </p>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="grid md:grid-cols-3 gap-4 w-full">
          <div className="flex gap-2 text-center lg:gap-5 flex-col items-center justify-center p-8 border-[1px] border-[rgba(116, 116, 116, 0.20)] w-full  h-[300px]">
            <div className="max-w-sm">
              <LazyLoad image={cat5} alt={"jobsite image"} />
            </div>
            <p className="text-[#121212] font-aeonik text-base md:text-lg font-medium tracking-tighter hover:text-eYellow cursor-pointer">
              construction
            </p>
          </div>
          <div className="flex gap-2 text-center lg:gap-5 flex-col items-center justify-center p-8 border-[1px] border-[rgba(116, 116, 116, 0.20)] w-full  h-[300px]">
            <div className="max-w-sm">
              <LazyLoad image={cat3} alt={"jobsite image"} />
            </div>
            <p className="text-[#121212] font-aeonik text-base md:text-lg font-medium tracking-tighter hover:text-eYellow cursor-pointer">
              Mining
            </p>
          </div>
          <div className="flex gap-2 text-center lg:gap-5 flex-col items-center justify-center p-8 border-[1px] border-[rgba(116, 116, 116, 0.20)] w-full  h-[300px]">
            <div className="max-w-sm">
              <LazyLoad image={cat7} alt={"jobsite image"} />
            </div>
            <p className="text-[#121212] font-aeonik text-base md:text-lg font-medium tracking-tighter hover:text-eYellow cursor-pointer">
              Oil & Gas
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-4">
        <div className="grid md:grid-cols-3 gap-4 w-full">
          <div className="flex gap-2 text-center lg:gap-5 flex-col items-center justify-center p-8 border-[1px] border-[rgba(116, 116, 116, 0.20)] w-full  h-[300px]">
            <div className="max-w-sm">
              <LazyLoad image={cat2} alt={"jobsite image"} />
            </div>
            <p className="text-[#121212] font-aeonik text-base md:text-lg font-medium tracking-tighter hover:text-eYellow cursor-pointer">
              construction
            </p>
          </div>
          <div className="flex gap-2 text-center lg:gap-5 flex-col items-center justify-center p-8 border-[1px] border-[rgba(116, 116, 116, 0.20)] w-full  h-[300px]">
            <div className="max-w-sm">
              <LazyLoad image={cat4} alt={"jobsite image"} />
            </div>
            <p className="text-[#121212] font-aeonik text-base md:text-lg font-medium tracking-tighter hover:text-eYellow cursor-pointer">
              Mining
            </p>
          </div>
          <div className="flex gap-2 text-center lg:gap-5 flex-col items-center justify-center p-8 border-[1px] border-[rgba(116, 116, 116, 0.20)] w-full  h-[300px]">
            <div className="max-w-sm">
              <LazyLoad image={cat6} alt={"jobsite image"} />
            </div>
            <p className="text-[#121212] font-aeonik text-base md:text-lg font-medium tracking-tighter hover:text-eYellow cursor-pointer">
              Oil & Gas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByJobsite;
