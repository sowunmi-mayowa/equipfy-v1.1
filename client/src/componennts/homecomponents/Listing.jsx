import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiMap } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { listImg1, listImg2 } from "../../assets";
import Hr from "../Hr";
import ButtonBlack from "../ButtonBlack";
import { useGetAllEquipments } from "@/api/query";
import { convertEURtoNGN } from "@/utils/currencyConverter";

const Listing = () => {
  const { data: equipments, isLoading } = useGetAllEquipments();
  const list = equipments || [];
  const firstThree = list.slice(0, 3);
  const first = firstThree[0];
  const rest = firstThree.slice(1);

  const formatPrice = (item) => {
    if (!item) return "";
    if (item.currency && item.price !== undefined)
      return `${item.currency} ${item.price}`;
    return item.price ?? "";
  };

  return (
    <div className="mx-8 overflow-x-auto md:mx-12 xl:mx-auto xl:max-w-6xl">
      <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
          Recently Added Equipment
        </h3>
        <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
          Every machine is physically inspected and includes a downloadable
          180-point PDF report.
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-12 lg:flex-row">
        {/* Left featured card */}
        <div className="font-aeonik bg-[#F7F7F6] py-3 px-6 md:py-9 md:px-16 text-center lg:w-1/2 flex-shrink-0">
          <p className="text-lg font-bold md:text-3xl">
            {first?.name ?? "No listing"}
          </p>
          <p className="py-4 text-base font-bold md:text-xl">
            <ConvertedPrice amount={first?.average_market_price} />
          </p>
          <div className="flex justify-center gap-2 pb-4 md:gap-4">
            <div className="flex gap-[2px] md:gap-4 items-center">
              <HiOutlineLocationMarker className="text-lg lg:text-2xl text-eYellow" />
              <span className="text-base md:text-xl font-medium text-[#313131]">
                {first?.seller_location ?? "-"}
              </span>
            </div>
            <div className="flex gap-[2px] md:gap-4 items-center">
              <FaRegCalendarCheck className="text-lg lg:text-2xl text-eYellow" />
              <span className="text-base md:text-xl font-medium text-[#313131]">
                Available
              </span>
            </div>
          </div>
          {/* Image container with fixed height */}
          <div className="w-full overflow-hidden" style={{ height: "260px" }}>
            <img
              src={first?.all_images?.[0] || listImg1}
              alt={first?.name ?? "listing"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center w-full">
            <button className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-6 text-sm text-white capitalize bg-eBlack font-aeonik md:w-3/4 lg:w-full">
              see all <FiArrowUpRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Right side cards */}
        <div className="flex flex-col gap-4 lg:w-1/2">
          {rest.map((item, idx) => (
            <div
              key={item?._id || idx}
              className="flex gap-4 p-4 flex-col md:flex-row bg-[#F7F7F6] h-[48%]"
            >
              {/* Image wrapper — fixed width so it never squishes the text */}
              <div className="sm:w-[220px] flex-shrink-0 overflow-hidden">
                <img
                  src={item?.all_images?.[0] || listImg2}
                  className="w-full h-full object-cover"
                  alt={item?.name ?? "listing"}
                />
              </div>

              {/* Text + button */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <p className="text-base font-bold font-aeonik md:text-md lg:text-xl leading-tight">
                    {item?.name}
                  </p>
                  <ConvertedPrice amount={item?.average_market_price} />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-[4px] items-center">
                      <HiOutlineLocationMarker className="text-xl text-eYellow flex-shrink-0" />
                      <span className="text-sm font-medium text-[#313131] truncate">
                        {item?.seller_location ?? "-"}
                      </span>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <FaRegCalendarCheck className="sm:text-xl text-eYellow flex-shrink-0" />
                      <span className="text-sm font-medium text-[#313131]">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <ButtonBlack
                    name={"Buy Now"}
                    link={`/equipment/${item?._id}`}
                    showIcon={true}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Hr />
    </div>
  );
};

const ConvertedPrice = ({ amount }) => {
  const [price, setPrice] = useState("₦0.00");

  useEffect(() => {
    let mounted = true;
    const doConvert = async () => {
      if (amount === null || amount === undefined || amount === "") {
        setPrice("₦0.00");
        return;
      }
      try {
        const result = await convertEURtoNGN(amount);
        if (mounted) setPrice(result);
      } catch (e) {
        if (mounted) setPrice("₦0.00");
      }
    };
    doConvert();
    return () => {
      mounted = false;
    };
  }, [amount]);

  return (
    <p className="py-2 text-sm font-bold md:py-4 font-aeonik lg:text-base">
      {price}
    </p>
  );
};

export default Listing;
