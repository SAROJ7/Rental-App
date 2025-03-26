"use client";
import React, { useEffect, useRef } from "react";

// Import Radar from your installed package
import Radar from "radar-sdk-js";
import "maplibre-gl/dist/maplibre-gl.css";
import { useGlobalStore } from "@/store/global.store";
import { useGetPropertiesQuery } from "@/queries/property.query";

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const filters = useGlobalStore((state) => state.filters);

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  useEffect(() => {
    if (isLoading || isError || !properties || !mapContainerRef.current) return;

    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_API_KEY as string);

    const map = Radar.ui.map({
      container: mapContainerRef.current!,
      style: "radar-default-v1",
      center: filters.coordinates || [-74.5, 40],
      zoom: 9,
    });

    // Add markers for each property
    properties.forEach((property) => {
      const marker = Radar.ui
        .marker({
          color: "#000000",
          opacityWhenCovered: "1",
        })
        .setLngLat([
          property.location.coordinates.longitude,
          property.location.coordinates.latitude,
        ])
        .setPopup(
          Radar.ui
            .popup({
              closeButton: false,
            })
            .setHTML(
              `
        <div class="marker-popup">
          <div class="marker-popup-image"></div>
          <div>
            <a href="/search/${property.id}" target="_blank" class="marker-popup-title">${property.name}</a>
            <p class="marker-popup-price">
              $${property.pricePerMonth}
              <span class="marker-popup-price-unit"> / month</span>
            </p>
          </div>
        </div>
        `
            )
        )
        .addTo(map);

      // Create popup for the marker

      // Add popup to marker with closeButton set to false
    });

    // Handle resize event
    const resizeMap = () => {
      if (map) setTimeout(() => map.resize(), 700);
    };
    resizeMap();

    return () => map.remove();
  }, [isLoading, isError, properties, filters.coordinates]);

  return (
    <div className="basis-5/12 grow relative rounded-xl z-0">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default Map;
