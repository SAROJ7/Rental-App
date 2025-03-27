"use client";

import { useGetPropertyQuery } from "@/queries/property.query";
import { PropertyLocationProps } from "@/types";
import React, { useEffect, useRef } from "react";
// Import Radar from your installed package
import Radar from "radar-sdk-js";
import "maplibre-gl/dist/maplibre-gl.css";
import { Compass, MapPin } from "lucide-react";
import Loading from "@/components/Loading";

const PropertyLocation = ({ propertyId }: PropertyLocationProps) => {
  const {
    data: property,
    isLoading,
    isError,
  } = useGetPropertyQuery(propertyId);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || isError || !property || !mapContainerRef.current) return;

    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_API_KEY as string);

    const map = Radar.ui.map({
      container: mapContainerRef.current!,
      style: "radar-default-v1",
      center: [
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ],
      zoom: 14,
    });

    // Add markers for each property
    const marker = Radar.ui
      .marker({
        color: "#000000",
        opacityWhenCovered: "1",
      })
      .setLngLat([
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ])
      .addTo(map);

    return () => map.remove();
  }, [isLoading, isError, property]);

  if (isLoading) return <Loading />;
  if (isError || !property) return <div>Property Not Found</div>;

  return (
    <div className="py-16">
      <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
        Map and Location
      </h3>
      <div className="flex justify-between items-center text-sm text-primary-500 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-gray-700" />
          Property Address:
          <span className="ml-2 font-semibold text-gray-700">
            {property.location?.address || "Address Not Available"}
          </span>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            property.location?.address || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center hover:underline gap-2 text-primary-600"
        >
          <Compass className="w-5 h-5" />
          Get Directions
        </a>
      </div>

      <div
        className="relative mt-4 h-[300px] rounded-lg overflow-hidden"
        ref={mapContainerRef}
      />
    </div>
  );
};

export default PropertyLocation;
