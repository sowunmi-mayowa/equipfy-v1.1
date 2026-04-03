import React, { useState } from "react";
import { FiArrowUpRight, FiMap } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Newsletter = () => {
  const [err, setErr] = useState("");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required("email is required")
      .typeError("email is not valid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    const emails = { email };
    console.log(data);

    const response = await fetch("http://localhost:3000/equipments/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      setErr(json.error);
    }
    if (response.ok) {
      setErr(null);
      console.log("Email added ", json);
      alert("email added");
      reset();
    }
  };
  return (
    <div className="py-24 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
            Get Verified Listings Before{" "}
            <span className="bg-gradient-to-r from-black/90 to-yellow-400 text-transparent bg-clip-text inline-block">
              Anyone Else
            </span>
          </h3>
          <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
            Be first to see new diagnostic reports and equipment drops. Join
            contractors across West Africa who get deals before they hit the
            open market.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col items-center w-full"
        >
          <input
            type="email"
            name="text"
            id="email"
            placeholder="Your Email/Phone Number"
            className="px-4 py-2 bg-[#fafafa] w-full md:w-3/6 my-2 md:mt-6 md:mb-4 border-2 border-eBlack"
            {...register("email")}
          />
          <p className="text-sm text-center text-red-500 font-aeonik">
            {" "}
            {errors.email?.message}{" "}
          </p>
          <button className="mt-2 bg-eBlack text-white px-4 py-2 capitalize font-aeonik text-[10px] sm:text-sm lg:text-base flex gap-1 sm:gap-2 items-center justify-center font-bold">
            Join the List
            <FiArrowUpRight className="text-lg sm:text-xl" />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
