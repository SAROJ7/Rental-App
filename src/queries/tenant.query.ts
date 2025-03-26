import {
  addFavoriteProperty,
  getTenant,
  removeFavoriteProperty,
  updateTenantSettings,
} from "@/apis";
import { TAGS } from "@/constants";
import { Tenant } from "@/types/prismaTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTenantSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TAGS.UPDATE_TENANT_SETTINGS],
    mutationFn: updateTenantSettings,
    onSuccess: () => {
      toast.success("Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: [TAGS.GET_AUTH_USER],
      });
    },
  });
};

export const useAddFavoritePropertyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TAGS.ADD_FAVORITE_PROPERTY],
    mutationFn: addFavoriteProperty,
    onSuccess: () => {
      toast.success("Added  To Favorites");
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [TAGS.GET_PROPERTIES],
        }),
        queryClient.invalidateQueries({
          queryKey: [TAGS.GET_AUTH_USER],
        }),
      ]);
    },
  });
};

export const useRemoveFavoritePropertyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TAGS.REMOVE_FAVORITE_PROPERTY],
    mutationFn: removeFavoriteProperty,
    onSuccess: () => {
      toast.success(`Removed From Favorites`);
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [TAGS.GET_PROPERTIES],
        }),
        queryClient.invalidateQueries({
          queryKey: [TAGS.GET_AUTH_USER],
        }),
      ]);
    },
  });
};

export const useGetTenantQuery = (cognitoId: string) => {
  return useQuery<Tenant, Error>({
    queryKey: [TAGS.GET_TENANT],
    queryFn: () => getTenant(cognitoId),
    onError: (error) => {
      console.error(error);
      toast.error(`Failed to fetch the tenant`);
    },
  });
};
