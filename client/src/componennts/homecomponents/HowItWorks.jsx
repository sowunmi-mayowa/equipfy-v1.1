import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LazyLoad from "../LazyLoad";
import { How1, How2, How3, How4 } from "@/assets";

const tabIds = ["explore", "buy", "confirm", "pickup"];

const AutoTabs = ({ delay = 5000 }) => {
  const [active, setActive] = useState(tabIds[0]);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const i = tabIds.indexOf(prev);
        return tabIds[(i + 1) % tabIds.length];
      });
    }, delay);

    return () => clearInterval(intervalRef.current);
  }, [paused, delay]);

  // Clear interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Tabs value={active} onValueChange={(v) => setActive(v)}>
        <div className="flex justify-center items-center mb-8">
          <TabsList className="flex flex-wrap justify-center gap-3 rounded-full bg-transparent p-1 mb-12 md:mb-0">
            <TabsTrigger
              value="explore"
              className="rounded-full px-5 py-2 text-sm font-semibold border border-yellow-300 bg-white/60 hover:bg-white/80 data-[state=active]:bg-eBlack data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Explore Equipment
            </TabsTrigger>
            <TabsTrigger
              value="buy"
              className="rounded-full px-5 py-2 text-sm font-semibold border border-yellow-300 bg-white/60 hover:bg-white/80 data-[state=active]:bg-eBlack data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Buy Now
            </TabsTrigger>
            <TabsTrigger
              value="confirm"
              className="rounded-full px-5 py-2 text-sm font-semibold border border-yellow-300 bg-white/60 hover:bg-white/80 data-[state=active]:bg-eBlack data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Confirm Order
            </TabsTrigger>
            <TabsTrigger
              value="pickup"
              className="rounded-full px-5 py-2 text-sm font-semibold border border-yellow-300 bg-white/60 hover:bg-white/80 data-[state=active]:bg-eBlack data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Pickup
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="explore">
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            <div className="px-12 w-full md:mx-0 md:w-1/2 min-h-[280px]">
              <LazyLoad
                image={How1}
                alt="How it works"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center p-8 lg:p-12 rounded-2xl">
              <h2 className="text-2xl lg:text-3xl capitalize font-bold font-aeonik mb-4">
                Browse Verified Equipment
              </h2>
              <p className=" font-plex text-lg leading-relaxed">
                Every listing includes a downloadable diagnostic report, not
                just photos but verified engine data, hours, and condition
                scoring. Filter by category, price, or sector.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="buy">
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            <div className="px-12 w-full md:mx-0 md:w-1/2 min-h-[280px]">
              <LazyLoad
                image={How2}
                alt="How it works"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center p-8 lg:p-12 rounded-2xl">
              <h2 className="text-2xl lg:text-3xl capitalize font-bold font-aeonik mb-4">
                Buy, Finance, or Own and Earn
              </h2>
              <p className="font-plex text-lg leading-relaxed">
                Purchase outright, apply for financing, or choose Own and Earn
                where you own the asset and we deploy and manage it. We handle
                the entire transaction.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="confirm">
          <div className="flex flex-col md:flex-row-reverse items-stretch gap-0">
            <div className="px-12 w-full md:mx-0 md:w-1/2 min-h-[280px]">
              <LazyLoad
                image={How3}
                alt="How it works"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center p-8 lg:p-12 rounded-2xl">
              <h2 className="text-2xl lg:text-3xl capitalize font-bold font-aeonik mb-4 max-w-xs">
                Secure Payment
              </h2>
              <p className="font-plex text-lg leading-relaxed">
                Your payment is held in escrow and only released when the
                machine's condition matches the diagnostic report. Pay via bank
                transfer or approved payment methods. No surprises and no hidden
                fees.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pickup">
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            <div className="px-12 w-full md:mx-0 md:w-1/2 min-h-[280px]">
              <LazyLoad
                image={How4}
                alt="How it works"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center p-8 lg:p-12 rounded-2xl">
              <h2 className="text-2xl lg:text-3xl capitalize font-bold font-aeonik mb-4 max-w-xs">
                Delivered to Your Jobsite
              </h2>
              <p className="font-plex text-lg leading-relaxed">
                We coordinate logistics and deliver to your site in Lagos, Kano,
                Port Harcourt, or anywhere across West Africa. Transport cost is
                included in your quote. From day one you get access to parts and
                technician support.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="py-4 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl my-16">
      <div className="flex justify-center items-center flex-col mb-8 gap-2">
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold bg-gradient-to-r from-black to-eYellow text-transparent bg-clip-text inline-block">
          How does it work?
        </h3>
        <p className="font-light text-gray-500 max-w-lg text-center mx-auto">
          Buying in five easy steps
        </p>
      </div>

      <div>
        <AutoTabs />
      </div>
    </div>
  );
};

export default HowItWorks;
