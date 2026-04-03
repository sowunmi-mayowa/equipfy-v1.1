import React from "react";
import Categories from "./homecomponents/Categories";
import Hero from "./homecomponents/Hero";
import Listing from "./homecomponents/Listing";
import Newsletter from "./homecomponents/Newsletter";
import Reviews from "./homecomponents/Reviews";
import Sales from "./homecomponents/Sales";
import Footer from "./Footer";
import Parts from "./homecomponents/Parts";
import Confidence from "./homecomponents/Confidence";
import HowItWorks from "./homecomponents/HowItWorks";
import ByJobsite from "./homecomponents/ByJobsite";

const About = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Categories />
      <Confidence />
      <Parts />
      <Listing />
      <ByJobsite />
      {/* <Sales /> */}
      <Reviews />
      <Newsletter />
    </div>
  );
};

export default About;
