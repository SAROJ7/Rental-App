"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/global.store";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const setFilters = useGlobalStore((state) => state.setFilters);
  const router = useRouter();

  const handleLocationSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      const response = await fetch(
        `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(
          trimmedQuery
        )}&fuzzyMatch=true`,
        {
          method: "GET",
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_RADAR_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data.addresses && data.addresses.length > 0) {
        const [lng, lat] = data.addresses[0].geometry.coordinates;
        setFilters({
          location: trimmedQuery,
          coordinates: [lat, lng],
        });
        const params = new URLSearchParams({
          location: trimmedQuery,
          lat: lat.toString(),
          lng: lng,
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("error search location:", error);
    }
  };

  return (
    <div className="relative h-screen ">
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center "
        priority
      />
      <div className="absolute inset-0 bg-opacity-60 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
        >
          <div className="max-w-4xl mx-auto px-16 sm:px-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Start your journey in finding the perfect place to call home
            </h1>
            <p className="text-xl text-white mb-8">
              Explore our wide range of rental properties tailored to fit your
              lifestyle and needs!
            </p>
            <div className="flex justify-center">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search by district, nagarpalika or address"
                className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
              />
              <Button
                onClick={handleLocationSearch}
                className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
