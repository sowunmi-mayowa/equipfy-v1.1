import React from "react";
import Newsletter from "../componennts/homecomponents/Newsletter";
import Footer from "../componennts/Footer";
import Hr from "../componennts/Hr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BuyCard from "../componennts/BuyCard";
import Search from "../componennts/Search";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../componennts/Loader";
import {
  useGetAllEquipments,
  useGetAllEquipmentsCategories,
  useGetAllEquipmentsManufacturers,
} from "../api/query";
import { useParams } from "react-router-dom";

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
  const [categorySort, setCategorySort] = useState();
  const [manufacturerSort, setManufacturerSort] = useState();
  const [minHours, setMinHours] = useState();
  const [maxHours, setMaxHours] = useState();
  const [minMiles, setMinMiles] = useState();
  const [maxMiles, setMaxMiles] = useState();
  const [minWeight, setMinWeight] = useState();
  const [maxWeight, setMaxWeight] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minYear, setMinYear] = useState();
  const [maxYear, setMaxYear] = useState();
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);

  const { data: equipmentsCategories = [], isLoading: categoriesLoading } =
    useGetAllEquipmentsCategories();

  const { data: manufacturers = [], isLoading: manufacturersLoading } =
    useGetAllEquipmentsManufacturers();

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
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* small-screen filter toggle */}
          <div className="mt-4 w-full lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="px-4 py-2 bg-eYellow text-black rounded-md"
            >
              Filters
            </button>
          </div>
          {/* overlay backdrop for mobile filters */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}
          <aside
            className={
              showFilters
                ? "fixed inset-y-0 left-0 z-50 w-72 p-4 border border-gray-100 rounded-r-md bg-white lg:static lg:w-72 lg:rounded-md lg:p-4"
                : "hidden lg:flex w-full lg:w-72 flex-col gap-4 p-4 border border-gray-100 rounded-md bg-white"
            }
          >
            {/* close button for mobile */}
            <div className="flex items-center justify-between lg:hidden mb-2">
              <h4 className="font-semibold">Filters</h4>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-600"
              >
                Close
              </button>
            </div>
            <div>
              <Select onValueChange={(val) => setCategorySort(val)}>
                <SelectTrigger className="w-full mb-4 lg:mb-0">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {equipmentsCategories?.categories?.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select onValueChange={(val) => setManufacturerSort(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Manufacturers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {manufacturers?.manufacturers?.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* hours */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Hours</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select onValueChange={(val) => setMinHours(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="1000">1000</SelectItem>
                        <SelectItem value="2000">2000</SelectItem>
                        <SelectItem value="3000">3000</SelectItem>
                        <SelectItem value="4000">4000</SelectItem>
                        <SelectItem value="5000">5000</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select onValueChange={(val) => setMaxHours(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="10000">10000</SelectItem>
                        <SelectItem value="15000">15000</SelectItem>
                        <SelectItem value="20000">20000</SelectItem>
                        <SelectItem value="25000">25000</SelectItem>
                        <SelectItem value="30000">30000</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* weight */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Weight</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select onValueChange={(val) => setMinWeight(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="5000">5000</SelectItem>
                        <SelectItem value="10000">10000</SelectItem>
                        <SelectItem value="15000">15000</SelectItem>
                        <SelectItem value="20000">20000</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select onValueChange={(val) => setMaxWeight(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="24000">24000</SelectItem>
                        <SelectItem value="25000">25000</SelectItem>
                        <SelectItem value="27000">27000</SelectItem>
                        <SelectItem value="28000">28000</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* price */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Price</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select onValueChange={(val) => setMinPrice(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="1000">1000</SelectItem>
                        <SelectItem value="2000">2000</SelectItem>
                        <SelectItem value="3000">3000</SelectItem>
                        <SelectItem value="4000">4000</SelectItem>
                        <SelectItem value="5000">5000</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select onValueChange={(val) => setMaxPrice(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="10000">10000</SelectItem>
                        <SelectItem value="15000">15000</SelectItem>
                        <SelectItem value="20000">20000</SelectItem>
                        <SelectItem value="25000">25000</SelectItem>
                        <SelectItem value="30000">30000</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* year */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Year</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select onValueChange={(val) => setMinYear(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 30 }, (_, i) => 1990 + i).map(
                          (year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select onValueChange={(val) => setMaxYear(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 15 }, (_, i) => 2020 + i).map(
                          (year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </aside>
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
        </div>
        <Hr />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Buy;
