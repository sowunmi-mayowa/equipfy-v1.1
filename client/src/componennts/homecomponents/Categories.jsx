import React, { useEffect, useState } from "react";
import {
  cat1,
  cat10,
  cat11,
  cat12,
  cat13,
  cat14,
  cat15,
  cat16,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
} from "../../assets";
import Hr from "../Hr";
import LazyLoad from "../LazyLoad";
import { Link } from "react-router-dom";
import ButtonBlack from "../ButtonBlack";

const Categories = () => {
  const categories = [
    { image: cat1, alt: "Cold Planner", category: "cold-planner" },
    {
      image: cat2,
      alt: "Agricultural Equipment",
      category: "agricultural-equipment",
    },
    { image: cat3, alt: "Aggregate Equipment", category: "aggregate" },
    { image: cat4, alt: "aticulated Equipment", category: "aticulated" },
    { image: cat5, alt: "bulldozers", category: "bulldozers" },
    { image: cat6, alt: "backhoes", category: "backhoes" },
    { image: cat7, alt: "compressors", category: "compressors" },
    {
      image: cat8,
      alt: "compact truck loaders",
      category: "compact-truck-loaders",
    },
    { image: cat9, alt: "cranes", category: "cranes" },
    { image: cat10, alt: "drills", category: "drills" },
    { image: cat11, alt: "bucket truck", category: "bucket truck" },
    { image: cat12, alt: "Dump Trailers", category: "Dump Trailers" },
    { image: cat13, alt: "hau; truck", category: "hau; truck" },
    { image: cat14, alt: "long trailers", category: "long trailers" },
    { image: cat15, alt: "pavers", category: "pavers" },
    { image: cat16, alt: "lifts", category: "lifts" },
  ];
  return (
    <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
      <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
          Browse all Categories
        </h3>
        <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
          Find the right equipment for construction, mining, oil & gas,
          agriculture, aggregate, and quarry.
        </p>
      </div>
      <div className="flex flex-wrap gap-6 md:gap-4 justify-between md:justify-center lg:justify-between items-center">
        {categories.slice(0, 8).map(({ image, alt, category }) => (
          <Link to={`/buy/equipments/${category}`} key={category}>
            <div className="flex gap-2 text-center lg:gap-5 flex-col items-center justify-center p-8 border-[1px] border-[rgba(116, 116, 116, 0.20)] w-[140px] h-[170px] xs:w-[167px] sm:h-[167px] md:w-[200px] md:h-[200px] xl:w-[265px] xl:h-[265px]">
              <LazyLoad image={image} alt={alt} />
              <p className="text-[#121212] font-aeonik text-base md:text-lg font-medium tracking-tighter hover:text-eYellow cursor-pointer capitalize">
                {alt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6 mx-auto">
        <ButtonBlack
          name={"See More"}
          showIcon={true}
          variant="outlined"
          link={"/buy"}
        />
      </div>
      <Hr />
    </div>
  );
};

export default Categories;
