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

const About = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Confidence />
      {/* <Sales /> */}
      <Categories />
      <Parts />
      <Listing />
      <Reviews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
