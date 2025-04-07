import { axiosInstance } from "@/providers";
import { Application, Lease } from "@/types/prismaTypes";

export const getApplications = async ({
  userId,
  userType,
}: {
  userId?: string;
  userType?: string;
}): Promise<Application[]> => {
  const queryParams = new URLSearchParams();
  if (userId) queryParams.append("userId", userId);
  if (userType) queryParams.append("userType", userType);
  const response = await axiosInstance.get(`/applications?${queryParams}`);
  return response.data;
};

export const updateApplicationStatus = async ({
  id,
  status,
}: {
  id: number;
  status: string;
}): Application & {
  lease?: Lease;
} => {
  const response = await axiosInstance.patch(`/applications/${id}/status`, {
    status,
  });

  return response.data;
};

export const createApplication = async (
  data: Partial<Application>
): Application => {
  const response = await axiosInstance.post(`/applications`, data);
  return response.data;
};
