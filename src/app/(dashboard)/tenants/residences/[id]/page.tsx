"use client";
import Loading from "@/components/Loading";
import { useGetLeasesQuery, useGetPaymentsQuery } from "@/queries";
import { useGetAuth } from "@/queries/auth.query";
import { useGetPropertyQuery } from "@/queries/property.query";
import { useParams } from "next/navigation";
import React from "react";

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

  return <div>Residence</div>;
};

export default Residence;
