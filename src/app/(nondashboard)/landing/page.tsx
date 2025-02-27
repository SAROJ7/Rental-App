"use client";
import React from "react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import DiscoverSection from "./DiscoverSection";
import CallToActionSection from "./CallToActionSection";
import FooterSection from "./FooterSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default page;
