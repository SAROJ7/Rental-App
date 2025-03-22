import {
  FiltersState,
  GlobalState,
  GlobalStore,
} from "@/types/globalState.type";
import { zustandStore } from "./zustand.store";
import { localStore } from "./local.store";

const initialStore: GlobalState = {
  filters: {
    location: "Los Angeles",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [-118.25, 34.05],
  },
  isFiltersFullOpen: false,
  viewMode: "grid",
};

export const useGlobalStore = zustandStore<GlobalStore>(
  (set) => ({
    ...initialStore,

    setFilters: (newFilters: Partial<FiltersState>) =>
      set((state: GlobalState) => ({
        filters: { ...state.filters, ...newFilters },
      })),

    toggleFiltersFullOpen: (): void =>
      set((state: GlobalState) => ({
        isFiltersFullOpen: !state.isFiltersFullOpen,
      })),

    setViewMode: (mode: "grid" | "list"): void => set({ viewMode: mode }),

    resetFilters: (): void =>
      set({
        filters: initialStore.filters,
      }),
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: "globalStore",
      storage: localStore,
    },
  }
);

//  Optional selectors for performance optimization
// export const useFilters = (): FiltersState =>
//   useGlobalStore((state: GlobalStore) => state.filters);

// export const useFiltersActions = (): {
//   setFilters: (newFilters: Partial<FiltersState>) => void;
//   resetFilters: () => void;
// } =>
//   useGlobalStore((state: GlobalStore) => ({
//     setFilters: state.setFilters,
//     resetFilters: state.resetFilters,
//   }));

// export const useViewMode = (): "grid" | "list" =>
//   useGlobalStore((state: GlobalStore) => state.viewMode);

// export const useFiltersFullOpen = (): boolean =>
//   useGlobalStore((state: GlobalStore) => state.isFiltersFullOpen);
