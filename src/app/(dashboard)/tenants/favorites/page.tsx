"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
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
  if (isError) return <div>Error Loading Favorites</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="Favorited Properties"
        subtitle="Browse and Manage your saved property listings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProperties.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={true}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!favoriteProperties || favoriteProperties.length === 0) && (
        <p>You don&lsquo;t have any favorited properties</p>
      )}
    </div>
  );
};

export default Favorites;
