import React from "react";
import { PartImg1, PartImg2, PartImg3, Notes, Worker, Cubes } from "@/assets";
import { FiArrowUpRight } from "react-icons/fi";

const Parts = () => {
  const categories = [
    {
      name: "Hard Ware",
      info: "Engine, Nuts, Bolts & More",
      id: 1,
      img: PartImg1,
    },
    {
      name: "Electrical",
      info: "Switches, Light & More",
      id: 2,
      img: PartImg2,
    },
    {
      name: "Filters",
      info: "Air filter, Hydraulic filter & More",
      id: 3,
      img: PartImg3,
    },
  ];

  const services = [
    {
      name: "Parts Ordering",
      text: "Simplify parts sourcing for your fleet. We help quarries, mines, and projects get what they need without the usual delays.",
      icon: Notes,
      id: 1,
    },
    {
      name: "Technician Requests",
      text: "Request repair and maintenance through eQuipfy. No more machines rotting on site for want of a technician you can trust.",
      icon: Worker,
      id: 2,
    },
    {
      name: "Uptime Infrastructure",
      text: "We're building the support layer so contractors and operators across West Africa can focus on their business, not the machine.",
      icon: Cubes,
      id: 3,
    },
  ];
  return (
    <div className="my-16 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
      <div className="mb-16">
        <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
            Parts & Serivces
          </h3>
          <p className="font-light text-gray-500 max-w-lg mt-4 text-center mx-auto">
            End downtime. From quarries and mines to oil & gas and construction
            sites, order parts and request trusted technicians when you need
            them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#F7F7F6] p-4 rounded-lg h-full flex flex-col justify-between"
            >
              <div className="flex gap-4 items-center">
                <img src={service.icon} alt={`${service.name} icon`} />
                <h3 className="text-xl font-aeonik font-medium">
                  {service.name}
                </h3>
              </div>
              <p className="mt-4 text-base">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center flex-col mb-8 gap-2">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
            Parts & Categories
          </h3>
          <p className="font-light text-gray-500 max-w-xs mt-4 text-center mx-auto">
            Browse by category. Order parts or request a technician for your
            machine.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div className="max-w-sm relative">
              <img
                src={category.img}
                alt="parts and services"
                className="w-full object-cover "
              />
              <div className="absolute top-4 left-4 right-4">
                <div className="flex justify-between items-center w-full">
                  <p className="text-xs font-semibold px-3 py-1 bg-white  inline-block rounded-full">
                    {category.info}
                  </p>
                  <div className="bg-white  p-2 rounded-md flex items-center justify-center w-8 h-8">
                    <FiArrowUpRight className="text-black w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0">
                <h3 className="text-white font-aeonik font-semibold text-2xl pl-4 pb-12">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parts;
