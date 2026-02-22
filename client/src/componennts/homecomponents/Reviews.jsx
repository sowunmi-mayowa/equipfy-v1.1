import React, { useRef, useEffect } from "react";
import { next, prev } from "../../assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Reviews = () => {
  const sliderRefDesktop = useRef(null);
  const sliderRefMobile = useRef(null);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  const mobileSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
  const handleNextClick = () => {
    if (
      sliderRefDesktop.current &&
      typeof sliderRefDesktop.current.slickNext === "function"
    ) {
      sliderRefDesktop.current.slickNext();
    }
    if (
      sliderRefMobile.current &&
      typeof sliderRefMobile.current.slickNext === "function"
    ) {
      sliderRefMobile.current.slickNext();
    }
  };

  const handlePrevClick = () => {
    if (
      sliderRefDesktop.current &&
      typeof sliderRefDesktop.current.slickPrev === "function"
    ) {
      sliderRefDesktop.current.slickPrev();
    }
    if (
      sliderRefMobile.current &&
      typeof sliderRefMobile.current.slickPrev === "function"
    ) {
      sliderRefMobile.current.slickPrev();
    }
  };
  return (
    <div className="mx-8  md:mx-12 xl:mx-auto xl:max-w-6xl">
      <div>
        <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
            What Our Clients are Saying
          </h3>
          <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
            Real stories of transparency and trust from project sites across
            West Africa.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevClick}
            aria-label="Previous review"
            className="p-1"
          >
            <img src={prev} alt="Previous" className="w-8" />
          </button>
          <button
            onClick={handleNextClick}
            aria-label="Next review"
            className="p-1"
          >
            <img src={next} alt="Next" className="w-8" />
          </button>
        </div>
      </div>
      <div className="hidden mt-6 lg:block">
        <div className="items-stretch gap-4">
          <Slider ref={sliderRefDesktop} {...settings}>
            <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[240px] h-full flex flex-col justify-between">
              <p className="font-aeonik text-base text-[#121212]">
                In the South-South, equipment downtime is a project killer. I
                was skeptical about buying a used crane from Lagos, but the
                180-point PDF report from eQuipfy gave my mechanical team the
                confidence we needed. The machine arrived in Port Harcourt
                exactly as described, and the escrow payment gave us total peace
                of mind.
              </p>
              <div className="flex gap-3 pt-4">
                <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
                <div>
                  <p className="font-medium text-base text-[#121212] leading-[30px]">
                    — Chidi K.
                  </p>
                  <p className="text-sm text-[#747474]">Logistics Manager</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[240px] h-full flex flex-col justify-between">
              <p className="font-aeonik text-base text-[#121212]">
                Dealing with 'agents' in Lagos is usually a headache of inflated
                prices and hidden faults. eQuipfy changed that for us. We
                sourced two articulated dump trucks for a site in Lekki, and the
                transparency was world-class. Seeing the functional test videos
                before we even paid a Naira made all the difference.
              </p>
              <div className="flex gap-3 pt-4">
                <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
                <div>
                  <p className="font-medium text-base text-[#121212] leading-[30px]">
                    — Abiola A.
                  </p>
                  <p className="text-sm text-[#747474]">Site Engineer</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[240px] h-full flex flex-col justify-between">
              <p className="font-aeonik text-base text-[#121212]">
                Reliable machinery is hard to find in the North, and parts are
                even harder. We used eQuipfy to buy a refurbished excavator for
                our quarry operations. Not only was the machine in pristine
                condition, but their team's knowledge of the local logistics for
                delivery to Kano was impressive. They are true partners, not
                just brokers.
              </p>
              <div className="flex gap-3 pt-4">
                <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
                <div>
                  <p className="font-medium text-base text-[#121212] leading-[30px]">
                    — Musa B.
                  </p>
                  <p className="text-sm text-[#747474]">Operations Director</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[240px] h-full flex flex-col justify-between">
              <p className="font-aeonik text-base text-[#121212]">
                In the South-South, equipment downtime is a project killer. I
                was skeptical about buying a used crane from Lagos, but the
                180-point PDF report from eQuipfy gave my mechanical team the
                confidence we needed. The machine arrived in Port Harcourt
                exactly as described, and the escrow payment gave us total peace
                of mind.
              </p>
              <div className="flex gap-3 pt-4">
                <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
                <div>
                  <p className="font-medium text-base text-[#121212] leading-[30px]">
                    — Chidi K.
                  </p>
                  <p className="text-sm text-[#747474]">Logistics Manager</p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="mt-4 lg:hidden">
        {" "}
        {/*mobile reviews */}
        <Slider ref={sliderRefMobile} {...mobileSettings}>
          <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[220px] h-full flex flex-col justify-between">
            <p className="font-aeonik text-base text-[#121212]">
              In the South-South, equipment downtime is a project killer. I was
              skeptical about buying a used crane from Lagos, but the 180-point
              PDF report from eQuipfy gave my mechanical team the confidence we
              needed. The machine arrived in Port Harcourt exactly as described,
              and the escrow payment gave us total peace of mind.
            </p>
            <div className="flex gap-3 pt-4">
              <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
              <div>
                <p className="font-medium text-base text-[#121212] leading-[30px]">
                  — Chidi K.
                </p>
                <p className="text-sm text-[#747474]">Logistics Manager</p>
              </div>
            </div>
          </div>
          <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[220px] h-full flex flex-col justify-between">
            <p className="font-aeonik text-base text-[#121212]">
              Dealing with 'agents' in Lagos is usually a headache of inflated
              prices and hidden faults. eQuipfy changed that for us. We sourced
              two articulated dump trucks for a site in Lekki, and the
              transparency was world-class. Seeing the functional test videos
              before we even paid a Naira made all the difference.
            </p>
            <div className="flex gap-3 pt-4">
              <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
              <div>
                <p className="font-medium text-base text-[#121212] leading-[30px]">
                  — Abiola A.
                </p>
                <p className="text-sm text-[#747474]">Site Engineer</p>
              </div>
            </div>
          </div>
          <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[220px] h-full flex flex-col justify-between">
            <p className="font-aeonik text-base text-[#121212]">
              Reliable machinery is hard to find in the North, and parts are
              even harder. We used eQuipfy to buy a refurbished excavator for
              our quarry operations. Not only was the machine in pristine
              condition, but their team's knowledge of the local logistics for
              delivery to Kano was impressive. They are true partners, not just
              brokers.
            </p>
            <div className="flex gap-3 pt-4">
              <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
              <div>
                <p className="font-medium text-base text-[#121212] leading-[30px]">
                  — Musa B.
                </p>
                <p className="text-sm text-[#747474]">Operations Director</p>
              </div>
            </div>
          </div>
          <div className="bg-[#F7F7F6] px-8 py-6 rounded-[4px] min-h-[220px] h-full flex flex-col justify-between">
            <p className="font-aeonik text-base text-[#121212]">
              In the South-South, equipment downtime is a project killer. I was
              skeptical about buying a used crane from Lagos, but the 180-point
              PDF report from eQuipfy gave my mechanical team the confidence we
              needed. The machine arrived in Port Harcourt exactly as described,
              and the escrow payment gave us total peace of mind.
            </p>
            <div className="flex gap-3 pt-4">
              <div className="w-[50px] h-[50px] rounded-full bg-eYellow"></div>
              <div>
                <p className="font-medium text-base text-[#121212] leading-[30px]">
                  — Chidi K.
                </p>
                <p className="text-sm text-[#747474]">Logistics Manager</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;
