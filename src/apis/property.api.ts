import { cleanParams } from "@/lib";
import { axiosInstance } from "@/providers";
import { FiltersState } from "@/types/globalState.type";
import { Property } from "@/types/prismaTypes";

export type GetPropertiesParams = Partial<FiltersState> & {
  favoriteIds?: number[];
};

export const getProperties = async (
  filters: GetPropertiesParams
): Promise<Property[]> => {
  const params = cleanParams({
    location: filters.location,
    priceMin: filters.priceRange?.[0],
    priceMax: filters.priceRange?.[1],
    beds: filters.beds,
    baths: filters.baths,
    propertyType: filters.propertyType,
    squareFeetMin: filters.squareFeet?.[0],
    squareFeetMax: filters.squareFeet?.[1],
    amenities: filters.amenities?.join(","),
    availableFrom: filters.availableFrom,
    favoriteIds: filters.favoriteIds?.join(","),
    latitude: filters.coordinates?.[1],
    longitude: filters.coordinates?.[0],
  });

  const response = await axiosInstance.get("property", { params });
  return response.data;
};

export const getProperty = async (propertyId: number): Property => {
  const response = await axiosInstance.get(`/property/${propertyId}`);
  return response.data;
};
