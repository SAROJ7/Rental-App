"use client";

import { updateManagerSettings } from "@/apis";
import { TAGS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
