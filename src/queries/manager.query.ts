"use client";

import { getManagerProperties, updateManagerSettings } from "@/apis";
import { TAGS } from "@/constants";
import { Property } from "@/types/prismaTypes";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateManagerSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TAGS.UPDATE_Manager_SETTINGS],
    mutationFn: updateManagerSettings,
    onSuccess: async () => {
      toast.success("Updated Successfully");
      await queryClient.invalidateQueries({
        queryKey: [TAGS.GET_AUTH_USER],
      });
    },
  });
};

export const useGetManagerPropertiesQuery = (
  cognitoId: string,
  options?: UseQueryOptions<Property[], Error>
) => {
  return useQuery<Property[], Error>({
    queryKey: [TAGS.GET_MANAGER_PROPERTIES],
    queryFn: () => getManagerProperties(cognitoId),
    ...options,
    onError: () => {
      toast.error(`Failed to fail manager properties`);
    },
  });
};
