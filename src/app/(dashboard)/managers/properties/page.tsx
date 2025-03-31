"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useGetAuth } from "@/queries/auth.query";
import { useGetManagerPropertiesQuery } from "@/queries/manager.query";
import React from "react";

const Properties = () => {
  const { data: authUser } = useGetAuth();
  const {
    data: managerProperties,
    isLoading,
    error,
  } = useGetManagerPropertiesQuery(authUser?.data?.cognitoInfo.userId || "", {
    enabled: !!authUser?.data?.cognitoInfo.userId,
  });

  if (isLoading) return <Loading />;
  if (!managerProperties || error)
    return <div>Error Loading Manager Properties</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="My Properties"
        subtitle="View and Manage your property listings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {managerProperties?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/managers/properties/${property.id}`}
          />
        ))}
      </div>
      {(!managerProperties || managerProperties.length === 0) && (
        <p>You don&lsquo;t manage any properties</p>
      )}
    </div>
  );
};

export default Properties;
