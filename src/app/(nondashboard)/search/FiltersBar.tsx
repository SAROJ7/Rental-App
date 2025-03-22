"use client";

import { useGlobalStore } from "@/store/global.store";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { debounce } from "lodash";
import { cleanParams, cn, formatPriceValue, PropertyTypeIcons } from "@/lib";
import { FiltersState } from "@/types/globalState.type";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectContent, SelectValue } from "@radix-ui/react-select";

const FiltersBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const filters = useGlobalStore((state) => state.filters);
  const isFiltersFullOpen = useGlobalStore((state) => state.isFiltersFullOpen);
  const viewMode = useGlobalStore((state) => state.viewMode);
  const setViewMode = useGlobalStore((state) => state.setViewMode);
  const setFilters = useGlobalStore((state) => state.setFilters);
  const toggleFiltersFullOpen = useGlobalStore(
    (state) => state.toggleFiltersFullOpen
  );
  const [searchInput, setSearchInput] = useState(filters.location);
  const updateURL = debounce((newFilters: FiltersState) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();
    Object.entries(cleanFilters).forEach(([key, value]) => {
      updatedSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  });

  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value;
    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      newValue = currentArrayRange;
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const newFilters = { ...filters, [key]: newValue };

    setFilters(newFilters);
    updateURL(newFilters);
  };

  return (
    <div className="flex justify-between items-center w-full py-5">
      {/* Filters */}
      <div className="flex justify-between items-center gap-4 p-2">
        <Button
          variant="outline"
          className={cn(
            "gap-2 rounded-xl border-primary-400 hover:bg-primary-500 hover:text-primary-100",
            isFiltersFullOpen && "bg-primary-700 text-primary-100"
          )}
          onClick={() => {
            toggleFiltersFullOpen();
          }}
        >
          <Filter className="w-4 h-4" />
          <span>All Filters</span>
        </Button>

        {/* Search Location  */}
        <div className="flex items-center">
          <Input
            placeholder="Search Location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-40 rounded-l-xl rounded-r-none border-primary-400 border-r-0"
          />
          <Button
            className={`rounded-r-xl rounded-l-none  border-primary-400 border shadow-none hover:bg-primary-700 hover:text-primary-50`}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Price Range */}
        <div className="inline-flex items-center gap-1">
          {/* Minimum Price Selector */}
          <div className="inline-block">
            <Select
              value={filters.priceRange[0]?.toString() || "any"}
              onValueChange={(value) =>
                handleFilterChange("priceRange", value, true)
              }
            >
              <SelectTrigger className="w-22 rounded-xl border-primary-400">
                <SelectValue>
                  {formatPriceValue(filters.priceRange[0], true)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white p-1 border border-primary-400 rounded-md shadow-lg mt-1">
                <SelectItem value="any">Any Min Price</SelectItem>
                {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
                  <SelectItem key={price} value={price.toString()}>
                    ${price / 1000}k+
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Maximum Price Selector */}
          <div className="inline-block">
            <Select
              value={filters.priceRange[1]?.toString() || "any"}
              onValueChange={(value) =>
                handleFilterChange("priceRange", value, false)
              }
            >
              <SelectTrigger className="w-22 rounded-xl border-primary-400">
                <SelectValue>
                  {formatPriceValue(filters.priceRange[1], false)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white border border-primary-400 rounded-md shadow-lg p-1 mt-1">
                <SelectItem value="any">Any Max Price</SelectItem>
                {[1000, 2000, 3000, 5000, 10000].map((price) => (
                  <SelectItem key={price} value={price.toString()}>
                    &lt;${price / 1000}k
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Beds and Baths */}
        <div className="inline-flex items-center gap-1">
          {/* Bed */}
          <div className="inline-block">
            <Select
              value={filters.beds}
              onValueChange={(value) => handleFilterChange("beds", value, null)}
            >
              <SelectTrigger className="w-26 rounded-xl border-primary-400">
                <SelectValue placeholder="beds" />
              </SelectTrigger>
              <SelectContent className="bg-white p-1 border border-primary-400 rounded-md shadow-lg mt-1">
                <SelectItem value="any">Any Beds</SelectItem>
                <SelectItem value="1">1+ beds</SelectItem>
                <SelectItem value="2">2+ beds</SelectItem>
                <SelectItem value="3">3+ beds</SelectItem>
                <SelectItem value="4">4+ beds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Baths */}
          <div className="inline-block">
            <Select
              value={filters.baths}
              onValueChange={(value) =>
                handleFilterChange("baths", value, null)
              }
            >
              <SelectTrigger className="w-26 rounded-xl border-primary-400">
                <SelectValue placeholder="baths" />
              </SelectTrigger>
              <SelectContent className="bg-white p-1 border border-primary-400 rounded-md shadow-lg mt-1">
                <SelectItem value="any">Any Baths</SelectItem>
                <SelectItem value="1">1+ baths</SelectItem>
                <SelectItem value="2">2+ baths</SelectItem>
                <SelectItem value="3">3+ baths</SelectItem>
                <SelectItem value="4">4+ baths</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={filters.propertyType || "any"}
              onValueChange={(value) =>
                handleFilterChange("propertyType", value, null)
              }
            >
              <SelectTrigger className="w-40 rounded-xl border-primary-400">
                <SelectValue placeholder="Home Type" />
              </SelectTrigger>
              <SelectContent className="bg-white mt-1 border rounded-md p-1 shadow-lg">
                <SelectItem value="any">Any Property Type</SelectItem>
                {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      <span>{type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* View Mode */}
      <div className="flex justify-between items-center gap-4 p-2">
        <div className="flex border rounded-xl">
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-l-xl hover:bg-primary-600 hover:text-primary-50",
              viewMode === "list" ? "bg-primary-700 text-primary-50" : ""
            )}
            onClick={() => setViewMode("list")}
          >
            <List className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-r-xl hover:bg-primary-600 hover:text-primary-50",
              viewMode === "grid" ? "bg-primary-700 text-primary-50" : ""
            )}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
