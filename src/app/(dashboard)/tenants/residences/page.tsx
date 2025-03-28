"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useGetAuth } from "@/queries/auth.query";
import {
  useGetCurrentResidencesQuery,
  useGetTenantQuery,
} from "@/queries/tenant.query";
import React from "react";

const Residences = () => {
  const { data: authUser } = useGetAuth();
  const { data: tenant } = useGetTenantQuery(
    authUser?.data?.cognitoInfo.userId || "",
    {
      enabled: !!authUser?.data?.cognitoInfo.userId,
    }
  );

  const {
    data: currentResidences,
    isLoading,
    error,
  } = useGetCurrentResidencesQuery(authUser?.data?.cognitoInfo.userId, {
    enabled: !!authUser?.data?.cognitoInfo.userId,
  });

  console.log({ authUser, tenant, currentResidences });

  if (isLoading) return <Loading />;
  if (error) return <div>Error Fetching Current Residences</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="Current Residences"
        subtitle="View and Manage your current living spaces"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentResidences.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={tenant?.favorites?.includes(property.id) || false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!currentResidences || currentResidences.length === 0) && (
        <p>You don&lsquo;t have any current residences </p>
      )}
    </div>
  );
};

export default Residences;
