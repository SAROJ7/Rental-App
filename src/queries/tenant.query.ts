import { updateTenantSettings } from "@/apis";
import { TAGS } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTenantSettingsMutation = () => {
  return useMutation({
    mutationKey: [TAGS.UPDATE_TENANT_SETTINGS],
    mutationFn: updateTenantSettings,
  });
};
