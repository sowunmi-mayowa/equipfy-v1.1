import React from "react";
import Newsletter from "../componennts/homecomponents/Newsletter";
import Footer from "../componennts/Footer";
import Hr from "../componennts/Hr";
import {
  buyImg1,
  buyImg10,
  buyImg11,
  buyImg12,
  buyImg2,
  buyImg3,
  buyImg4,
  buyImg5,
  buyImg6,
  buyImg7,
  buyImg8,
  buyImg9,
} from "../assets/index";
import BuyCard from "../componennts/BuyCard";
import Search from "../componennts/Search";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../componennts/Loader";
import { useGetAllEquipments } from "../api/query";

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
  const [categoryData, setCategoryData] = useState([]);
  const [price, setPrice] = useState([]);
  const [hours, setHours] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const {
    data: equiptmentsData,
    isLoading: equiptmentsLoading,
    error: equiptmentsError,
  } = useGetAllEquipments();
  console.log("equips", equiptmentsData);

  const handleSearchResults = (data) => {
    setSearchResults(data);
  };

  return (
    <div>
      <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        <Search onSearch={handleSearchResults} />
        <Hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {equiptmentsError ? (
            <div className="flex items-center justify-center w-full text-center">
              <p className="text-red-400 font-aeonik">{error}</p>
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
        <Hr />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Buy;
