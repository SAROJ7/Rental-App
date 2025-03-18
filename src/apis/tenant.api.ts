import { axiosInstance } from "@/providers/axios-provider";
import { Tenant } from "@/types/prismaTypes";

export const updateTenantSettings = async ({
  cognitoId,
  updateTenant,
}: {
  cognitoId: string;
  updateTenant: Partial<Tenant>;
}) => {
  const response = await axiosInstance.patch(
    `/tenants/${cognitoId}`,
    updateTenant
  );
  return response.data;
};
