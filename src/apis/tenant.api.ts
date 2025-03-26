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

export const addFavoriteProperty = async ({
  cognitoId,
  propertyId,
}: {
  cognitoId: string;
  propertyId: number;
}): Tenant => {
  const response = await axiosInstance.patch(
    `/tenants/${cognitoId}/favorites/${propertyId}`
  );
  return response.data;
};

export const removeFavoriteProperty = async ({
  cognitoId,
  propertyId,
}: {
  cognitoId: string;
  propertyId: number;
}): Tenant => {
  const response = await axiosInstance.delete(
    `/tenants/${cognitoId}/favorites/${propertyId}`
  );

  return response.data;
};

export const getTenant = async (cognitoId: string): Tenant => {
  const response = await axiosInstance.get(`/tenants/${cognitoId}`);
  return response.data;
};
