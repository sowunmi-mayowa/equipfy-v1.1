import React, { useState } from "react";
import {
  UserGroup,
  Plus,
  Emp,
  Affiliate,
  alex,
  XIcon,
  AboutHeroImg,
} from "@/assets";
import Footer from "@/componennts/Footer";
import { FiInstagram } from "react-icons/fi";
import LazyLoad from "@/componennts/LazyLoad";

const NewAbout = () => {
  const AboutCategories = [
    {
      name: "Integrity Over Commission",
      info: "In a market full of middlemen, we choose to be partners. We provide honest valuations and unbiased technical reports. If a machine isn't right for your project, we tell you even if it costs us a sale.",
      id: 1,
      img: Affiliate,
    },
    {
      name: "Boots on the Ground",
      info: "We don’t just operate from behind a screen. To solve African infrastructure challenges, you have to get your hands dirty. Our inspectors are in the yards, on the sites, and at the ports, ensuring that what you see online is exactly what is delivered to your site.",
      id: 2,
      img: UserGroup,
    },
    {
      name: "Solving for Low Trust",
      info: "We recognize the risks of the local market. That’s why we’ve built a Security-First workflow. From escrow payment protection to 150-point physical inspections, we remove the fear factor from heavy equipment trading.",
      id: 3,
      img: Plus,
    },
    {
      name: "Empowering African Growth",
      info: "We aren’t just moving tractors; we’re fueling development. By making verified foreign-used equipment affordable and accessible, we help contractors across Nigeria complete projects on time.",
      id: 4,
      img: Emp,
    },
  ];

  return (
    <div>
      <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        <div className="mb-12 lg:mb-16">
          <h1 className="font-aeonik font-medium text-6xl mt-12">
            About <span className="font-bold italic">eQuipfy</span>
          </h1>
          <p className="font-aeonik text-sm mt-6">
            West Africa's digital dealer for foreign-used equipment, parts, and
            repairs.
          </p>
        </div>
      </div>

      <LazyLoad image={AboutHeroImg} alt={"heroimg"} />

      <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        <div>
          <div className="flex justify-center items-center flex-col mb-8 gap-2 my-12">
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
              The eQuipfy Standard
            </h3>
            <p className="font-light text-gray-500 max-w-3xl md:mt-2 text-center mx-auto">
              Transparency. Fairness. Guarantees. We don't just list machines;
              we verify them. We earn the trust of our partners through a
              "Safety-First" approach, backed by technical data and a commitment
              to secure transactions.
            </p>
          </div>
          <div className="mb-16 mt-12">
            {
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {AboutCategories.map((service) => (
                  <div
                    key={service.id}
                    className="bg-[#F7F7F6] p-4 gap-4flex flex-col justify-between"
                  >
                    <div className="flex gap-2 items-center">
                      <img src={service.img} alt={`${service.name} icon`} />
                      <h3 className="text-xl font-aeonik font-medium">
                        {service.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-base ">{service.info}</p>
                  </div>
                ))}
              </div>
            }
          </div>
          <div className="flex justify-center items-center flex-col mb-8 gap-2 my-12">
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
              The Evolution of eQuipfy
            </h3>
            <p className="font-light text-gray-500 max-w-3xl md:mt-2 text-center mx-auto">
              A message from our founder.
            </p>
          </div>
          <div className="text-center my-4 font-aeonik text-base space-y-4">
            <p className="max-w-3xl mx-auto">
              The industry my father built put me through school. When I came
              back with a computer science degree, I found it broken by the same
              problems: dishonest brokers, tampered machines, and no one to call
              when things broke down. We tried three versions of eQuipfy before
              we got it right. Today, every machine is verified by our
              diagnostic software before it hits the yard, every payment is
              escrow protected, and every buyer gets parts and technician
              support from day one.
            </p>
          </div>
          <details className="text-center my-4 font-aeonik text-base">
            <summary className="cursor-pointer text-eBlack">
              Read the full story
            </summary>
            <div className="mt-4 space-y-4 max-w-3xl mx-auto text-left md:text-center">
              <p>
                The idea for eQuipfy started with a single realization: the
                industry my father spent his life building was broken by a lack
                of trust. Growing up, I watched him manage his heavy equipment
                business in Nigeria and struggle with brokers who were not
                honest and machines that did not live up to their promises. That
                same world put me through school. I went on to study computer
                science and software engineering, and for a long time I asked
                myself how I could bring those skills back into the industry
                that made it possible. I wanted to do more than digitize forms.
                I wanted to drive real efficiency.
              </p>
              <p>
                In 2019, I decided to digitize his legacy. I wanted to take the
                business he built with pen and paper and give it the Uber
                treatment. We started with Version 1, which was just manual
                coordination over WhatsApp and phone calls. It worked, but it
                did not scale. So we built Version 2, a wide open online
                marketplace where anyone could list and buy equipment with a
                click. The reality of the market hit us fast. We learned that in
                a low trust environment, an open marketplace becomes a
                playground for fraud. We saw people tampering with odometers to
                hide years of wear. We saw them painting over deep mechanical
                failures for a quick sale. Worst of all, people used our
                platform to find each other and then took the trade offline to
                avoid fees.
              </p>
              <p>
                We pivoted to Version 3, a fully managed model where we vetted
                every listing and ran the rentals ourselves. We thought that
                being the middleman would fix it. But we quickly realized that
                the Nigerian maintenance culture is still developing. Even with
                our human inspections, machines were breaking down on sites
                because they were not being treated with care. I saw
                multi-million Naira machines parked on job sites for months,
                gathering dust and rotting because the owner could not find the
                right part or a technician they could trust. Whether it is a
                quarry, a mine, or a government project, downtime is the enemy.
              </p>
              <p>
                I realized that to protect our customers, I could not just be an
                app or a middleman. I had to become the source of truth and the
                entire support system for the machine life. That is why eQuipfy
                has evolved again. We built proprietary diagnostic software that
                does what the human eye cannot. It catches the odometer fraud
                and engine tampering that used to slip through the cracks in our
                previous versions.
              </p>
              <p>
                You know how it works with tricycles and cars: people own the
                asset, someone else runs it, and the owner earns. That model is
                everywhere here. We brought it to heavy equipment with Own and
                Earn. And for those who want to run their own fleet, we asked
                why planning should still mean whiteboards and Excel, or losing
                track of where your machines are and when they need service. So
                we added fleet and telematics. One view of your equipment, your
                sites, your utilisation. The same kind of efficiency that
                software has brought to other industries is now in yours.
              </p>
              <p>
                Today we focus on West Africa and on the sectors where demand is
                real and reliability matters most: construction, mining, oil and
                gas, agriculture, aggregate, and quarry. We specialise in
                foreign used equipment that is verified by our diagnostic data
                before it ever hits the yard. We have made it easy to buy used
                equipment, to source parts and tools, and to request service so
                that machines do not rot on site. We offer financing for those
                who want to own and run their own fleet, and Own and Earn for
                those who want to own and earn while we deploy and manage. For
                fleet owners and site managers, we are building the tools to see
                and manage everything in one place: locations, hours,
                utilisation, and maintenance. No more guesswork.
              </p>
              <p>
                We are building for the contractors in Lagos, Kano, Port
                Harcourt, and the Delta who are tired of being cheated and of
                losing money to downtime and disorganisation. eQuipfy is the
                modern platform for heavy equipment in West Africa because we
                have lived the problems we are now solving. We are here so you
                can finally focus on your business and not the machine.
              </p>
            </div>
          </details>

          <div className="flex flex-col justify-center items-center mt-8">
            <img src={alex} alt="founder" className=" rounded-2xl w-[300px]" />
            <h4 className="mt-2 fontbold font-aeonik italic">
              Alexander C. Ovabor
            </h4>
            <p className="text-[#747474] text-sm">Founder & CTO</p>
            <div className="flex gap-2 mt-4 cursor-pointer">
              <img src={XIcon} alt="x" />
              <FiInstagram />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewAbout;
