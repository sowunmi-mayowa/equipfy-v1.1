import React from "react";
import Newsletter from "../componennts/homecomponents/Newsletter";
import Footer from "../componennts/Footer";
import Hr from "../componennts/Hr";
import BuyCard from "../componennts/BuyCard";
import Search from "../componennts/Search";
import { useState } from "react";
import Loader from "../componennts/Loader";
import { useGetAllEquipments, useGetFilterData } from "../api/query";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const filter = searchParams.get("filter");

  // pass the `filter` query param into the hook so it runs only when set
  const {
    data: filterData,
    isLoading: filterDataLoading,
    error: filterDataError,
  } = useGetFilterData(filter);

  const handleUpdate = () => {
    // Update the URL to: /search?query=new-value
    setSearchParams({ category: "new-value" });
  };
  console.log("Buy page category param ->", filter);

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

  // If a quick `filter` is active, prefer server-provided `filterData`.
  // Otherwise use the generic `equiptmentsData` list filtered by category.
  const allEquipments = equiptmentsData || [];
  const filteredEquipmentsBase = categoryFilter
    ? allEquipments.filter((e) => e.category === categoryFilter)
    : allEquipments;

  const displayedEquipments = filter
    ? filterData || []
    : filteredEquipmentsBase;

  const handleSearchResults = (data) => {
    console.log("handleSearchResults received ->", data);
    setSearchResults(Array.isArray(data) ? data : []);
  };

  const isQuickFilterActive = Boolean(filter);
  const isLoading = isQuickFilterActive
    ? filterDataLoading
    : equiptmentsLoading;
  const error = isQuickFilterActive ? filterDataError : equiptmentsError;
  const results = displayedEquipments || [];

  const clearFilter = () => {
    const entries = Array.from(searchParams.entries()).filter(
      ([k]) => k !== "filter",
    );
    setSearchParams(Object.fromEntries(entries));
  };

  return (
    <div>
      <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        <Search onSearch={handleSearchResults} />
        {isQuickFilterActive && (
          <div className="mt-4 mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded flex items-center justify-between">
            <div className="text-sm text-gray-800">
              Quick filter active:{" "}
              <strong className="capitalize">{filter}</strong>
            </div>
            <button
              onClick={clearFilter}
              className="text-sm text-blue-600 underline"
            >
              Clear
            </button>
          </div>
        )}
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
          <div className="flex-1 mt-4 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {error ? (
              <div className="flex items-center justify-center w-full text-center">
                <p className="text-red-400 font-aeonik">{String(error)}</p>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center w-full text-center min-h-[60vh]">
                <div>
                  <Loader />
                  <p className="text-gray-500 font-aeonik mt-2">
                    Loading equipments...
                  </p>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="flex items-center flex-col justify-center w-full text-center">
                <MdOutlineDoNotDisturb className="text-[150px] text-eYellow mb-2" />
                <p className="text-gray-500 font-aeonik">
                  No equipment found matching your criteria.
                </p>
              </div>
            ) : (
              results.map((equiptment) => (
                <div key={equiptment._id} className="h-full">
                  <BuyCard equipment={equiptment} />
                </div>
              ))
            )}
          </div>
        </div>
        <Hr />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Buy;
