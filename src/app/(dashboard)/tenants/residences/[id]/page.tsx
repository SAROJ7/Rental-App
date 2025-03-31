"use client";
import Loading from "@/components/Loading";
import { useGetLeasesQuery, useGetPaymentsQuery } from "@/queries";
import { useGetAuth } from "@/queries/auth.query";
import { useGetPropertyQuery } from "@/queries/property.query";
import { useParams } from "next/navigation";
import React from "react";
import ResidenceCard from "./ResidenceCard";
import PaymentMethod from "./PaymentMethod";
import BillingHistory from "./BillingHistory";

const Residence = () => {
  const { id } = useParams();
  const { data: authUser } = useGetAuth();
  const {
    data: property,
    isLoading: propertyLoading,
    error: propertyError,
  } = useGetPropertyQuery(Number(id));
  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery();

  const { data: payments, isLoading: paymentLoading } = useGetPaymentsQuery(
    leases?.[0]?.id || 0,
    {
      enabled: !!authUser?.data?.cognitoInfo.userId,
    }
  );

  console.log({ property, leases, payments });

  if (propertyLoading || leasesLoading || paymentLoading) return <Loading />;
  if (!property || propertyError) return <div>Error Loading Property</div>;

  const currentLease = leases?.find(
    (lease) => lease.propertyId === property.id
  );

  return (
    <div className="dashboard-container">
      <div className="w-full mx-auto">
        <div className="md:flex gap-10">
          {currentLease && (
            <ResidenceCard property={property} currentLease={currentLease} />
          )}
          <PaymentMethod />
        </div>
        <BillingHistory payments={payments || []} />
      </div>
    </div>
  );
};

export default Residence;
