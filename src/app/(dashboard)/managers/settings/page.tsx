"use client";
import Loading from "@/components/Loading";
import SettingsForm from "@/components/SettingsForm";
import { useGetAuth } from "@/queries/auth.query";
import { useUpdateManagerSettingsMutation } from "@/queries/manager.query";
import React from "react";

const ManagerSettings = () => {
  const { data: authUserInfo, isLoading } = useGetAuth();
  const authUser = authUserInfo?.data;
  const { mutateAsync: updateManagerSettings } =
    useUpdateManagerSettingsMutation();

  if (isLoading) return <Loading />;

  const initialData = {
    name: authUser?.userInfo?.name,
    email: authUser?.userInfo?.email,
    phoneNumber: authUser?.userInfo?.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateManagerSettings({
      cognitoId: authUser?.cognitoInfo?.userId,
      updateManager: data,
    });
  };
  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="manager"
    />
  );
};

export default ManagerSettings;
