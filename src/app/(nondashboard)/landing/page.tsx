"use client";
import React from "react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import DiscoverSection from "./DiscoverSection";
import CallToActionSection from "./CallToActionSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <DiscoverSection />
      <CallToActionSection />
    </div>
  );
};

export default page;
