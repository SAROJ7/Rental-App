"use client";

import { useGlobalStore } from "@/store/global.store";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { debounce } from "lodash";
import { cleanParams, cn, formatPriceValue } from "@/lib";
import { FiltersState } from "@/types/globalState.type";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
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
      </div>
    </div>
  );
};

export default FiltersBar;
