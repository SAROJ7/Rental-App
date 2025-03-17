"use client";

import { getAuthUser } from "@/apis/auth.api";
import { TAGS } from "@/constants";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useGetAuth = () => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const authQuery = useQuery({
    queryKey: [TAGS.GET_AUTH_USER],
    queryFn: getAuthUser,
    onSuccess: (response) => {
      if (response?.data) {
        setAuthUser(response.data);
      }
    },
  });

  return authQuery;
};
