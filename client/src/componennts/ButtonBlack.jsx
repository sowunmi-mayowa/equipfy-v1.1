import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const ButtonBlack = ({ link, name, variant = "solid", showIcon = true }) => {
  const variantStyles = {
    solid: "text-white bg-eBlack",
    outlined: "text-black bg-transparent border border-black",
  };

  return (
    <Link to={link}>
      <button
        className={`font-aeonik text-sm capitalize font-medium px-4 py-2 flex flex-row-reverse gap-4 items-center justify-center w-full ${variantStyles[variant]}`}
      >
        {showIcon && (
          <FiArrowUpRight className="w-6 h-6 hover:scale-x-150 hover:scale-y-[1.5] hidden md:block" />
        )}
        {name}
      </button>
    </Link>
  );
};

export default ButtonBlack;
