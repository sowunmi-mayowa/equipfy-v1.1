import React, { useState, useEffect, useRef } from "react";
import { FiArrowUpRight, FiMap } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
import LazyLoad from "./LazyLoad";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { flag } from "../assets";
import PopupForm from "./PopupForm";
import * as Dialog from "@radix-ui/react-dialog";

const BuyCard = ({ equipment }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popUpRef = useRef(null);

  if (!equipment) {
    return null;
  }

  const locationText =
    equipment.seller_location || equipment.sold_from || "Unknown";

  const settings = {
    dots: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Link to={`/equipment/${equipment._id}`}>
      <div className="font-aeonik bg-[#F7F7F6] p-4 pb-6">
        <div ref={popUpRef}>
          <div className="max-w-xs">
            <Slider {...settings}>
              {(equipment.all_images || []).map((img, index) => (
                <LazyLoad key={index} image={img} alt={equipment.name} />
              ))}
            </Slider>
          </div>
          <div>
            <div className="my-4 font-aeonik">
              <h3 className="max-w-xs text-base font-bold lg:text-xl">
                {equipment.name}
              </h3>
              <p>{equipment.hours ?? "-"} Hours</p>
              <div className="flex items-end gap-2">
                <p className="mt-4 text-sm font-bold lg:text-base">
                  {equipment.price}
                </p>
                <div className="flex items-end gap-2">
                  <img
                    src={flag}
                    alt="Nigerian flag icon"
                    className="w-4 h-4"
                  />
                  <p className="mt-4 text-sm font-bold lg:text-base"> </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-[4px] items-center">
                <HiOutlineLocationMarker className="text-xl text-eYellow" />{" "}
                <span className="text-sm font-medium text-[#313131]">
                  {locationText}
                </span>
              </div>
              <div className="flex gap-[4px] items-center">
                <FaRegCalendarCheck className="sm:text-xl text-eYellow" />{" "}
                <span className="text-sm font-medium text-[#313131]">
                  Available
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4 lg:flex-row">
              <Dialog.Root>
                <Dialog.Trigger className="w-full mt-2  bg-eBlack text-white px-4 py-2 capitalize font-aeonik text-[10px] sm:text-sm lg:text-base flex gap-1 sm:gap-2 items-center justify-center font-bold ">
                  Buy Now
                  <FiArrowUpRight className="text-lg sm:text-xl" />{" "}
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0  backdrop-filter backdrop-blur-sm" />
                  <Dialog.Content>
                    <PopupForm />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              {/* {isPopupVisible ? (
                    <div className='absolute inset-0 flex items-center justify-center w-screen h-full red-500'>
                        <PopupForm  onClose={closePopup} />
                    </div>
                ): "" }*/}
              <Link to="/loan-form" className="w-full">
                <button className="w-full mt-2 border-[1px] border-eBlack px-4 py-2 capitalize font-aeonik text-[10px] sm:text-sm lg:text-base flex gap-1 sm:gap-2 items-center justify-center font-bold">
                  Apply for Loan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(BuyCard);
