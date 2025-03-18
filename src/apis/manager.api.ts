import { axiosInstance } from "@/providers/axios-provider";
import { Manager } from "@/types/prismaTypes";

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
