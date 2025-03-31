import { axiosInstance } from "@/providers";
import { Lease, Payment } from "@/types/prismaTypes";

export const getLeases = async (): Promise<Lease[]> => {
  const response = await axiosInstance.get(`/leases`);
  return response.data;
};

export const getPayments = async (leaseId: number): Promise<Payment[]> => {
  const response = await axiosInstance.get(`/leases/${leaseId}/payments`);
  return response.data;
};

export const getPropertyLeases = async (
  propertyId: number
): Promise<Lease[]> => {
  const response = await axiosInstance.get(`property/${propertyId}/leases`);
  return response.data;
};
