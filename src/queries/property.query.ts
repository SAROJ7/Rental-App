import { getProperties, GetPropertiesParams } from "@/apis/property.api";
import { TAGS } from "@/constants";
import { Property } from "@/types/prismaTypes";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPropertiesQuery = (
  filters: GetPropertiesParams,
  options?: UseQueryOptions<Property[], Error>
) => {
  return useQuery<Property[], Error>({
    queryKey: [TAGS.GET_PROPERTIES, filters],
    queryFn: () => getProperties(filters),
    ...options,
    onError: (error) => {
      toast.error("Failed to fetch property details.");
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
