import React, { useEffect } from "react";
import { dollarIcon, folderIcon, shieldIcon } from "../../assets";
import Hr from "../Hr";

const Sales = () => {
  return (
    <div className="mx-8  pt-14 md:mx-12 xl:mx-auto xl:max-w-6xl">
      <div>
        {/* for buyers */}
        <h3 className="font-plex text-xl md:text-2xl lg:text-[40px] capitalize font-semibold lg:mb-4">
          for buyers
        </h3>
        <p className="text-[#747474] font-aeonik font-medium text-sm md:text-base max-w-[200px] md:max-w-lg inline-block md:block">
          Stop gambling with your project capital. Get the machine you actually
          paid for.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 my-8 lg:flex-nowrap lg:gap-10 ">
          <div className="bg-[#F7F7F6] p-4 h-[200px] w-full lg:w-[387px]">
            <div className="flex gap-6">
              <div className="w-20">
                <img src={folderIcon} alt="" className="w-full h-full" />
              </div>
              <p className="text-xl font-semibold font-plex ">
                180-PointInspection Reports
              </p>
            </div>
            <div className="py-4">
              <p className="font-aeonik text-base font-normal text-[#747474]">
                Every machine on eQuipfy undergoes a rigorous technical
                assessment. We provide high-resolution photos, operation videos,
                and a comprehensive PDF inspection report you can download and
                share with your technical team.
              </p>
            </div>
          </div>
          <div className="bg-[#F7F7F6] p-4 h-[200px] w-full lg:w-[387px]">
            <div className="flex gap-6">
              <img src={shieldIcon} alt="" />
              <p className="text-xl font-semibold font-plex ">
                Verified Technical Data
              </p>
            </div>
            <div className="py-4">
              <p className="font-aeonik text-base font-normal text-[#747474]">
                No more guessing about machine health. Our detailed reports
                cover everything from engine performance to hydraulic pressure,
                ensuring you have all the facts before you commit your capital.
              </p>
            </div>
          </div>
          <div className="bg-[#F7F7F6] p-4 h-[200px] w-full lg:w-[387px]">
            <div className="flex gap-6">
              <img src={dollarIcon} alt="" />
              <p className="text-xl font-semibold font-plex ">
                Secure Escrow Protection
              </p>
            </div>
            <div className="py-4">
              <p className="font-aeonik text-base font-normal text-[#747474]">
                Your payment is held safely by eQuipfy and is only released once
                the machine's condition matches the provided inspection report
                at the time of pickup.
              </p>
            </div>
          </div>
        </div>
        {/* FOR SELLLERS */}
        <h3 className="font-plex text-xl md:text-2xl lg:text-[40px] capitalize font-semibold lg:mb-4 mt-12">
          for sellers
        </h3>
        <p className="text-[#747474] font-aeonik font-medium text-sm md:text-base max-w-[200px] md:max-w-lg inline-block md:block">
          Turn your idle fleet into cash without the middleman headache.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 my-8 mb-20 lg:flex-nowrap lg:gap-10">
          <div className="bg-[#F7F7F6] p-4 h-[200px] w-full lg:w-[387px]">
            <div className="flex gap-6">
              <img src={dollarIcon} alt="" />
              <p className="text-xl font-semibold font-plex ">
                Professional Valuations
              </p>
            </div>
            <div className="py-4">
              <p className="font-aeonik text-base font-normal text-[#747474]">
                Get an honest, data-backed price estimate for your machines
                within 24 hours so you don't leave money on the table.
              </p>
            </div>
          </div>
          <div className="bg-[#F7F7F6] p-4 h-[200px] w-full lg:w-[387px]">
            <div className="flex gap-6">
              <img src={shieldIcon} alt="" />
              <p className="text-xl font-semibold font-plex ">
                Vetted, Serious Buyers
              </p>
            </div>
            <div className="py-4">
              <p className="font-aeonik text-base font-normal text-[#747474]">
                We filter out the time-wasters and ghost agents so you only deal
                with verified buyers ready to close a deal.
              </p>
            </div>
          </div>
          <div className="bg-[#F7F7F6] p-4 h-[200px] w-full lg:w-[387px]">
            <div className="flex gap-6">
              <img src={folderIcon} alt="" />
              <p className="text-xl font-semibold font-plex ">
                White-Glove Sales
              </p>
            </div>
            <div className="py-4">
              <p className="font-aeonik text-base font-normal text-[#747474]">
                We handle the marketing, inspections, and final negotiations for
                you so you can stay focused on your business.
              </p>
            </div>
          </div>
        </div>
        <Hr />
      </div>
    </div>
  );
};

export default Sales;
