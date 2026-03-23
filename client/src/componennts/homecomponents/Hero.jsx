import React, { useEffect } from "react";
import { heroImg, logo1, logo2, lowHeroImg, stroke } from "../../assets";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import LazyLoad from "../LazyLoad";
import ButtonBlack from "../ButtonBlack";

const Hero = () => {
  return (
    <div className="relative">
      <div className="py-4 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl mt-4">
        <div className="relative">
          <h1 className="text-eBlack text-2xl md:text-4xl lg:text-5xl xl:text-7xl md:max-w-lg lg:max-w-[inherit] font-aeonik text-center relative max-w-5xl mx-auto  italic">
            Buy <span className="font-semibold">foreign-used</span> heavy
            <span className="font-semibold"> equipment</span> with peace of
            mind.
          </h1>
          <img
            src={stroke}
            alt="yellow stroke"
            className="absolute top-7 left-24 lg:top-12 md:left-56 lg:left-72 xl:w-auto w-32 xl:top-16 xl:left-[400px] "
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="text-[#747474] text-center text-sm md:text-base font-medium my-4 leading-7 lg:my-8 inline-block max-w-4xl">
            We’re West Africa’s digital dealer for construction, mining, oil &
            gas, agriculture, aggregate, and quarry. We verify every machine
            with diagnostic data, handle secure transactions, and support you
            with parts and service. We also offer financing and fleet management
            so you can own, run, or optimise your equipment.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <ButtonBlack name={"buy equipment"} link={"/buy"} showIcon={false} />
          <ButtonBlack
            name={"request service"}
            variant="outlined"
            showIcon={false}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <LazyLoad
          image={heroImg}
          placeholder={lowHeroImg}
          alt={"Hero background image"}
        />
        {/* <img src={heroImg} alt="equiptments" className='w-full h-full' loading='lazy'/> */}
      </div>
      <div className="bg-eYellow mt-8">
        <div className="py-8 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl flex flex-col items-center">
          <div className="">
            <h3 className="text-xl md:text-xl lg:text-3xl xl:text-4xl font-plex font-bold text-center ">
              High-quality equipment from trusted brands. Durable. Reliable.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 items-center">
            <img
              src={logo1}
              alt="companies logo"
              className="w-full h-[inherit]"
            />
            <img
              src={logo2}
              alt="companies logo"
              className="w-full h-[inherit]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
