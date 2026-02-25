import React from "react";
import Newsletter from "../componennts/homecomponents/Newsletter";
import Footer from "../componennts/Footer";
import Hr from "../componennts/Hr";
import BuyCard from "../componennts/BuyCard";
import Search from "../componennts/Search";
import { useState } from "react";
import Loader from "../componennts/Loader";
import { useGetAllEquipments } from "../api/query";
import { useParams } from "react-router-dom";
import Filter from "@/componennts/Filter";
import { MdOutlineDoNotDisturb } from "react-icons/md";

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const Buy = () => {
  const { category } = useParams();

  // filter state (lifted into Buy and passed to `Filter`)
  const [categorySort, setCategorySort] = useState();
  const [manufacturerSort, setManufacturerSort] = useState();
  const [minHours, setMinHours] = useState();
  const [maxHours, setMaxHours] = useState();
  const [minWeight, setMinWeight] = useState();
  const [maxWeight, setMaxWeight] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minYear, setMinYear] = useState();
  const [maxYear, setMaxYear] = useState();

  // prefer explicit selection (`categorySort`) but fall back to URL param
  const [searchResults, setSearchResults] = useState([]);
  const categoryFilter = categorySort || category || undefined;

  const {
    data: equiptmentsData,
    isLoading: equiptmentsLoading,
    error: equiptmentsError,
  } = useGetAllEquipments({
    category: categoryFilter,
    manufacturer: manufacturerSort,
    minHours: minHours,
    maxHours: maxHours,
    minWeight: minWeight,
    maxWeight: maxWeight,
    minPrice: minPrice,
    minYear: minYear,
    maxYear: maxYear,
  });

  const allEquipments = equiptmentsData || [];
  const filteredEquipments = categoryFilter
    ? allEquipments.filter((e) => e.category === categoryFilter)
    : allEquipments;

  const handleSearchResults = (data) => {
    console.log("handleSearchResults received ->", data);
    setSearchResults(Array.isArray(data) ? data : []);
  };

  return (
    <div>
      <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        <Search onSearch={handleSearchResults} />
        <div className="flex flex-col lg:flex-row gap-6 items-start mt-6">
          <Filter
            categorySort={categorySort}
            setCategorySort={setCategorySort}
            manufacturerSort={manufacturerSort}
            setManufacturerSort={setManufacturerSort}
            minHours={minHours}
            setMinHours={setMinHours}
            maxHours={maxHours}
            setMaxHours={setMaxHours}
            minWeight={minWeight}
            setMinWeight={setMinWeight}
            maxWeight={maxWeight}
            setMaxWeight={setMaxWeight}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minYear={minYear}
            setMinYear={setMinYear}
            maxYear={maxYear}
            setMaxYear={setMaxYear}
          />
          {equiptmentsData?.length === 0 ? (
            <div className="flex items-center flex-col justify-center w-full text-center">
              <MdOutlineDoNotDisturb className="text-[150px] text-eYellow mb-2" />
              <p className="text-gray-500 font-aeonik">
                No equipment found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="flex-1 mt-4 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {equiptmentsError ? (
                <div className="flex items-center justify-center w-full text-center">
                  <p className="text-red-400 font-aeonik">{equiptmentsError}</p>
                </div>
              ) : equiptmentsLoading ? (
                <div className="flex items-center justify-center w-full text-center">
                  <Loader />
                </div>
              ) : (
                equiptmentsData?.map((equiptment) => (
                  <div key={equiptment._id} className="h-full">
                    <BuyCard equipment={equiptment} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <Hr />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Buy;
