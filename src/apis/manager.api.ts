import { axiosInstance } from "@/providers/axios-provider";
import { Manager, Property } from "@/types/prismaTypes";

export const updateManagerSettings = async ({
  cognitoId,
  updateManager,
}: {
  cognitoId: string;
  updateManager: Partial<Manager>;
}) => {
  const response = await axiosInstance.patch(
    `/managers/${cognitoId}`,
    updateManager
  );
  return response.data;
};

export const getManagerProperties = async (
  cognitoId: string
): Promise<Property[]> => {
  const response = await axiosInstance.get(`/managers/${cognitoId}/properties`);
  return response.data;
};
