"use client";
import Loading from "@/components/Loading";
import { useGetAuth } from "@/queries/auth.query";
import { useGetPropertiesQuery } from "@/queries/property.query";
import { useGetTenantQuery } from "@/queries/tenant.query";
import React from "react";

const Favorites = () => {
  const { data: authUser } = useGetAuth();
  const { data: tenant } = useGetTenantQuery(
    authUser?.data?.cognitoInfo?.userId || "",
    {
      enabled: !!authUser?.data?.cognitoInfo?.userId,
    }
  );

  const {
    data: favoriteProperties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(
    {
      favoriteIds: tenant?.favorites?.map(
        (favorite: { id: number }) => favorite.id
      ),
    },
    {
      enabled: !!tenant?.favorites || tenant?.favorites.length !== 0,
    }
  );

  if (isLoading) return <Loading />;

  return <div>Favorites</div>;
};

export default Favorites;
