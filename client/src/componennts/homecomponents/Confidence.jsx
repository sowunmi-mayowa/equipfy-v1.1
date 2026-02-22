import React from "react";
import { folderIcon, dollarIcon, ShieldCheck } from "@/assets";

const Confidence = () => {
  const services = [
    {
      title: "Full Transparency",
      desc: [
        "180-point inspection report",
        "Verified diagnostic data",
        " Download and share the pdf with your technical team before you commit",
      ],
      icon: folderIcon,
      id: 1,
    },
    {
      title: "No hidden cossts",
      desc: [
        "Secure escrow protection",
        "Payment released only when condition matches the report",
        "Clear pricing, no surprise fees",
      ],
      icon: dollarIcon,
      id: 2,
    },
    {
      title: "Quality Assurance",
      desc: [
        "Engine, hydraulics, and condition in every report",
        "All the facts before you commit your capital",
        "Built for West African jobsites",
      ],
      icon: ShieldCheck,
      id: 3,
    },
  ];

  return (
    <div className="my-16 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
      <div className="md:py-8">
        <div className="mb-16">
          <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
              Buy with confidence
            </h3>
            <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
              Whether you're in construction, mining, oil & gas, agriculture,
              aggregate, or quarry, get the machine you actually paid for.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#F7F7F6] p-4  h-full flex flex-col justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img src={service.icon} alt={`${service.title} icon`} />
                  <h3 className="text-xl font-aeonik font-medium">
                    {service.title}
                  </h3>
                </div>
                <ul className="mt-4 text-base list-disc ml-5 space-y-1">
                  {service.desc.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confidence;
