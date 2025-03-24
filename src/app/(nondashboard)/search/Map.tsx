"use client";
import React, { useEffect, useRef } from "react";

// Import Radar from your installed package
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import { useGlobalStore } from "@/store/global.store";
import { useGetPropertiesQuery } from "@/queries/property.query";

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const filters = useGlobalStore((state) => state.filters);
  const isFiltersFullOpen = useGlobalStore((state) => state.isFiltersFullOpen);

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  useEffect(() => {
    if (isLoading || isError || !properties || !mapContainerRef.current) return;

    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_API_KEY as string);

    const map = Radar.ui.map({
      container: mapContainerRef.current,
      style: "radar-default-v1",
      center: filters.coordinates || [-74.5, 40],
      zoom: 9,
    });

    // Add markers for each property
    properties.forEach((property) => {
      const marker = Radar.ui
        .marker({ color: "#000000" })
        .setLngLat([
          property.location.coordinates.longitude,
          property.location.coordinates.latitude,
        ])
        .addTo(map);

      // Create popup for the marker
      const popupContent = document.createElement("div");
      popupContent.className = "marker-popup";
      popupContent.innerHTML = `
        <div class="marker-popup-image"></div>
        <div>
          <a href="/search/${property.id}" target="_blank" class="marker-popup-title">${property.name}</a>
          <p class="marker-popup-price">
            $${property.pricePerMonth}
            <span class="marker-popup-price-unit"> / month</span>
          </p>
        </div>
      `;

      // Add popup to marker
      const popup = Radar.ui.popup({}).setDOMContent(popupContent);

      marker.setPopup(popup);
    });

    // Handle resize event
    const resizeMap = () => {
      if (map) setTimeout(() => map.resize(), 700);
    };
    resizeMap();

    return () => map.remove();
  });

  return (
    <div className="basis-5/12 grow relative rounded-xl">
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
