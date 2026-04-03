import React from "react";
import { folderIcon, dollarIcon, ShieldCheck } from "@/assets";

const Confidence = () => {
  const services = [
    {
      title: "Proprietary Diagnostic Reports",
      desc: [
        "Our software catches odometer fraud and engine tampering that human inspections miss.",
        "Verified engine data, hours, and condition scoring in every report.",
        "Download and share the PDF with your technical team before you commit.",
      ],
      icon: folderIcon,
      id: 1,
    },
    {
      title: "Escrow-Protected Payments",
      desc: [
        "Your money is held in escrow until the machine's condition matches the report.",
        "Transport cost included in your quote with no surprise fees.",
        "Pay via bank transfer or approved payment methods.",
      ],
      icon: dollarIcon,
      id: 2,
    },
    {
      title: "Built for West African Jobsites",
      desc: [
        "From quarries in Kano to construction sites in Lagos, every machine is verified for real conditions.",
        "Parts and technician support available from day one.",
        "Post-delivery support so your machine never sits idle.",
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
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold bg-gradient-to-r from-black to-yellow-400 text-transparent bg-clip-text inline-block">
              Buy with confidence
            </h3>
            <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
              Diagnostic verified equipment, escrow protected payments, and post
              delivery support. Get the machine you actually paid for.
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
