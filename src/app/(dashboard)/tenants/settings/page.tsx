"use client";

import Loading from "@/components/Loading";
import SettingsForm from "@/components/SettingsForm";
import { useGetAuth } from "@/queries/auth.query";
import { useUpdateTenantSettingsMutation } from "@/queries/tenant.query";
import React from "react";

const TenantSettings = () => {
  const { data: authUserInfo, isLoading: authLoading } = useGetAuth();
  const authUser = authUserInfo?.data;

  const { mutateAsync: updateTenantSettings } =
    useUpdateTenantSettingsMutation();

  if (authLoading) return <Loading />;

  const initialData = {
    name: authUser?.userInfo?.name,
    email: authUser?.userInfo?.email,
    phoneNumber: authUser?.userInfo?.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateTenantSettings({
      cognitoId: authUser?.cognitoInfo?.userId,
      updateTenant: data,
    });
  };

  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="tenant"
    />
  );
};

export default TenantSettings;
