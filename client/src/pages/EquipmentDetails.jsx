import React, { useState, useRef, useEffect } from "react";
import { convertEURtoNGN } from "@/utils/currencyConverter";
import { useGetEquipment } from "../api/query";
import { useParams } from "react-router-dom";
import {
  FaPlus,
  FaRegCalendarCheck,
  FaExclamationTriangle,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaAngleUp,
} from "react-icons/fa";
import * as Tabs from "@radix-ui/react-tabs";
import Hr from "../componennts/Hr";
import Footer from "../componennts/Footer";
import PopupForm from "../componennts/PopupForm";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Calendar,
  Weight,
  Clock,
  Location,
  Dimension,
  Condition,
  Keypad,
  VerifiedYellow,
  Check,
} from "@/assets/";
import ButtonBlack from "@/componennts/ButtonBlack";
const EquipmentDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetEquipment(id);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [howOpen, setHowOpen] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Find your next machine",
      description:
        "Browse our catalog using filters or search via the navigation bar. Then carefully check the inspection report and the detailed pictures and videos.",
      icon: Check,
    },
    {
      id: 2,
      title: "Buy Now or Make an Offer",
      description:
        "Submit your price to engage with the seller. We will manage the communication and notify you as soon as there is a reaction.",
      icon: Check,
    },
    {
      id: 3,
      title: "Confirm the order & pay the invoice",
      description:
        "Once we reach an agreement between you and the seller you will receive a summary of your order. Upon confirmation we will send you a proforma invoice to be paid using one of our safe payment methods.",
      icon: Check,
    },
    {
      id: 4,
      title: "Receive your equipment",
      description:
        "Once we receive your payment we will coordinate the pickup with the seller and inform you of the delivery date.",
      icon: Check,
    },
    {
      id: 5,
      title: "Test drive your purchase",
      description:
        "Test your equipment for 5 days or 25 engine hours. Not satisfied? Our Money Back Guarantee covers a full refund of your purchase.",
      icon: Check,
    },
  ];

  // tabs list ref and dragging state (declare hooks before any early returns)
  const tabsListRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const el = tabsListRef.current;
    if (!el) return;
    const prevent = (e) => e.preventDefault();
    el.addEventListener("dragstart", prevent);
    return () => el.removeEventListener("dragstart", prevent);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }

  if (!data?.equipment) {
    return (
      <div className="flex justify-center items-center h-screen">
        Equipment not found
      </div>
    );
  }

  const equipment = data.equipment;
  console.log("Equipment details:", equipment?.dimensions);
  const locationText =
    equipment.seller_location || equipment.sold_from || "Unknown";
  const images = equipment.all_images || [];
  const mainImage = images[selectedImage] || images[0];

  // prepare categories and filter out "All Specs"
  const specCategories = Object.keys(
    equipment.detailed_specifications || {},
  ).filter((k) => k !== "All Specs");

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSpecifications = () => {
    const specs = equipment.detailed_specifications;
    if (!specs) return null;

    return Object.entries(specs).map(([category, items]) => {
      if (typeof items !== "object" || items === null) return null;

      const isExpanded = expandedSections[category];

      return (
        <div key={category} className="border-b border-gray-200">
          <button
            onClick={() => toggleSection(category)}
            className="w-full flex justify-between items-center py-4 px-4 hover:bg-gray-50"
          >
            <h4 className="font-plex font-bold text-sm md:text-base text-eBlack">
              {category}
            </h4>
            <FaPlus
              className={`text-eYellow transition-transform ${
                isExpanded ? "rotate-45" : ""
              }`}
            />
          </button>
          {isExpanded && (
            <div className="px-4 pb-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(items).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-[#747474]">{key}:</span>
                    <span className="font-medium text-eBlack">
                      {typeof value === "boolean"
                        ? value
                          ? "Yes"
                          : "No"
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const scrollByAmount = (amount) => {
    const el = tabsListRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleMouseDown = (e) => {
    const el = tabsListRef.current;
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX;
    scrollLeftRef.current = el.scrollLeft;
    el.classList.add("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const el = tabsListRef.current;
    const x = e.pageX;
    const walk = x - dragStartXRef.current;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    const el = tabsListRef.current;
    isDraggingRef.current = false;
    if (el) el.classList.remove("cursor-grabbing");
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const el = tabsListRef.current;
    isDraggingRef.current = true;
    dragStartXRef.current = touch.pageX;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const x = touch.pageX;
    const el = tabsListRef.current;
    const walk = x - dragStartXRef.current;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className=" py-4 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl ">
        <p className="text-sm text-[#747474] font-aeonik">
          Home {">"} Explore Equipment {">"} {equipment.category} {">"}{" "}
          {equipment.name}
        </p>
      </div>

      <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Images Section */}
          <div className="bg-gray-50 p-4 rounded-lg h-full">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
              <img
                src={mainImage}
                alt={equipment.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`border-2 rounded overflow-hidden transition bg-gray-100 ${
                      selectedImage === idx
                        ? "border-eYellow"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${equipment.name} ${idx + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details Section */}
          <div>
            {/* Title and Price */}
            <h1 className=" text-2xl md:text-3xl font-bold text-eBlack mb-2 font-aeonik">
              {equipment.name}
            </h1>
            <ConvertedPrice
              amount={equipment.average_market_price ?? equipment.price}
              currency={equipment.currency}
            />

            {/* Specs Badges */}
            <div className="grid gap-3 mb-8 border border-dashed border-gray-300 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs items-center">
                <div className="flex items-center gap-2 w-full py-2">
                  <img
                    src={Calendar}
                    alt="Calendar"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p className="truncate">Year {equipment?.year}</p>
                </div>
                <div className="flex items-center gap-2 w-full py-2">
                  <img
                    src={Weight}
                    alt="Weight"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p className="truncate">Weight {equipment?.weight + " kg"}</p>
                </div>
                <div className="flex items-center gap-2 w-full py-2">
                  <img
                    src={Clock}
                    alt="Hours"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p className="truncate">Hours {equipment?.hours || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2 w-full py-2">
                  <img
                    src={Location}
                    alt="Location"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p className="truncate">Location {equipment?.sold_from}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 text-xs">
                <div className="flex items-center gap-2 w-full mb-2 md:mb-0">
                  <img src={Dimension} alt="dimension" className="w-5 h-5" />
                  <p>
                    Dimension{"(L × W × H) "}
                    {equipment?.dimensions?.transport_length_m +
                      " x " +
                      equipment?.dimensions?.transport_width_m +
                      " x " +
                      equipment?.dimensions?.transport_height_m +
                      " m"}
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <img
                    src={Condition}
                    alt="condition icon"
                    className="w-5 h-5"
                  />
                  <p>Condition {equipment?.condition}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 text-xs">
                <div className="flex items-center gap-2 w-full mb-2 md:mb-0">
                  <img src={Keypad} alt="serial_number" className="w-5 h-5" />
                  <p>Serial Number {equipment?.serial_number}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 mt-8">
              <h3 className="font-plex font-bold text-eBlack mb-2">
                Description
              </h3>
              <p className="text-sm text-[#747474] leading-relaxed line-clamp-3">
                {equipment.description}
              </p>
            </div>

            {/* Inspection */}
            <div className="mb-6 border border-eYellow rounded-lg p-4">
              <h3 className="font-plex font-bold text-eBlack mb-2 italic">
                Inspection
              </h3>
              <p className="text-sm text-[#747474] mb-3">
                Click the botton below to Request Machine Inspection or you van
                check the inspection Below
              </p>

              <div className="flex gap-4 flex-col md:flex-row w-full">
                <ButtonBlack
                  name={"Request inspection "}
                  variant={"solid"}
                  showIcon={false}
                />
                <ButtonBlack
                  name={"Vehicle Brochure"}
                  variant={"outlined"}
                  showIcon={false}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Dialog.Root>
                <Dialog.Trigger className="w-full bg-eBlack text-white px-4 py-3 font-aeonik font-bold text-sm rounded hover:bg-gray-900 mb-2">
                  Buy Now
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-sm" />
                  <Dialog.Content>
                    <PopupForm />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <ButtonBlack
                name={"Apply for Loan"}
                variant={"outlined"}
                showIcon={false}
                link={"/loan-form"}
              />
            </div>
          </div>
        </div>

        <div className="border border-spacing-24 border-dashed border-gray-300 px-4 py-2 rounded-lg mt-8">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setHowOpen((s) => !s)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setHowOpen((s) => !s)
            }
            className="flex justify-between cursor-pointer items-center"
            aria-expanded={howOpen}
          >
            <h3 className="font-aeonik font-bold italic text-xl mb-4">
              How it Works
            </h3>

            <FaAngleUp
              className={` w-6 h-6 mb-4 transform transition-transform ${
                howOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {howOpen && (
            <div className="grid md:grid-cols-2 gap-4 font-aeonik mt-4">
              {steps.map((step) => (
                <div
                  className="flex gap-2 border-gray-200 border p-4 rounded-lg mb-4 shadow-sm"
                  key={step.id}
                >
                  <img
                    src={step.icon}
                    alt="check icon"
                    className="w-4 inline-block mr-2"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{step.title}</h4>
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* START HERE */}

        {/* Inspection Tabs (Radix UI) */}
        <div className="mt-12">
          <h3 className="font-plex font-bold text-eBlack mb-3">Inspection</h3>

          <Tabs.Root
            className="tabs-root overflow-x-hidden "
            defaultValue={specCategories[0] || "General"}
          >
            <div className="flex items-center mb-4">
              <button
                onClick={() =>
                  scrollByAmount(
                    -(tabsListRef.current?.clientWidth || 240) * 0.8,
                  )
                }
                className="p-2 rounded-full bg-white border border-gray-200 mr-3 text-gray-500 hover:text-gray-800"
                aria-label="scroll left"
              >
                <FaChevronLeft />
              </button>

              <Tabs.List
                ref={tabsListRef}
                className="flex gap-3 overflow-x-hidden scrollbar-hide"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {specCategories.map((cat) => (
                  <Tabs.Trigger
                    key={cat}
                    value={cat}
                    className="whitespace-nowrap px-4 py-2 rounded-full text-sm bg-gray-100 border border-transparent hover:bg-gray-200 transition data-[state=active]:bg-eBlack data-[state=active]:text-white data-[state=active]:shadow-md"
                  >
                    {cat}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <button
                onClick={() =>
                  scrollByAmount(
                    (tabsListRef.current?.clientWidth || 240) * 0.8,
                  )
                }
                className="p-2 rounded-full bg-white border border-gray-200 ml-3 text-gray-500 hover:text-gray-800"
                aria-label="scroll right"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              {specCategories.map((cat) => {
                const items = equipment.detailed_specifications?.[cat];
                return (
                  <Tabs.Content key={cat} value={cat} className="space-y-4">
                    <h4 className="font-semibold text-lg">{cat}</h4>
                    <div className="divide-y divide-gray-100">
                      {items &&
                        typeof items === "object" &&
                        Object.entries(items).map(([k, v]) => {
                          const isBool = typeof v === "boolean";
                          const text = isBool ? (v ? "Yes" : "No") : String(v);
                          const isIssue =
                            !isBool &&
                            /damage|broken|deform|leak|not functioning|issue|poorly|play/i.test(
                              String(v),
                            );

                          return (
                            <div
                              key={k}
                              className="py-3 flex justify-between items-center"
                            >
                              <div className="text-sm text-[#747474]">{k}</div>
                              <div className="flex items-center gap-3">
                                {isBool ? (
                                  v ? (
                                    <img
                                      src={VerifiedYellow}
                                      alt="check"
                                      className="w-6 h-6"
                                    />
                                  ) : (
                                    <span
                                      className="inline-block w-3 h-3 rounded-full bg-gray-300"
                                      aria-hidden
                                    />
                                  )
                                ) : isIssue ? (
                                  <div className="flex items-center gap-2 text-sm text-red-600">
                                    <FaExclamationTriangle />
                                    <span className="font-medium text-eBlack">
                                      {text}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-medium text-eBlack text-sm">
                                    {text}
                                  </span>
                                )}
                                {/* <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <FaEye />
                                </button> */}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Tabs.Content>
                );
              })}
            </div>
          </Tabs.Root>
        </div>

        <Hr />
      </div>
      <Footer />
    </div>
  );
};

export default EquipmentDetails;

const ConvertedPrice = ({ amount, currency }) => {
  const [price, setPrice] = useState(
    amount ? `${currency} ${Number(amount).toLocaleString()}` : "",
  );

  useEffect(() => {
    let mounted = true;
    const doConvert = async () => {
      if (amount === null || amount === undefined || amount === "") {
        if (mounted) setPrice("");
        return;
      }

      // If the source currency is EUR, convert to NGN; otherwise show native price
      const normalized = String(currency || "").toUpperCase();
      if (normalized === "EUR" || normalized === "€") {
        try {
          const result = await convertEURtoNGN(amount);
          if (mounted) setPrice(result);
        } catch (e) {
          if (mounted)
            setPrice(`${currency} ${Number(amount).toLocaleString()}`);
        }
      } else {
        if (mounted) setPrice(`${currency} ${Number(amount).toLocaleString()}`);
      }
    };

    doConvert();
    return () => {
      mounted = false;
    };
  }, [amount, currency]);

  return (
    <p className="font-aeonik text-2xl font-bold text-eBlack mb-6">{price}</p>
  );
};
