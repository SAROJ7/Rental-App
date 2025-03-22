export type FiltersState = {
  location: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number, number];
};

export type ViewState = {
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list";
};

export type GlobalState = {
  filters: FiltersState;
} & ViewState;

export type GlobalStateAction = {
  setFilters: (newFilters: Partial<FiltersState>) => void;
  toggleFiltersFullOpen: () => void;
  setViewMode: (mode: "grid" | "list") => void;
  resetFilters: () => void;
};

export type GlobalStore = GlobalState & GlobalStateAction;
