import { getLeases, getPayments } from "@/apis";
import { TAGS } from "@/constants";
import { Lease, Payment } from "@/types/prismaTypes";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetLeasesQuery = () => {
  return useQuery<Lease[], Error>({
    queryKey: [TAGS.GET_LEASES],
    queryFn: () => getLeases(),
    onError: () => {
      toast.error(`Failed to fetch Leases`);
    },
  });
};

export const useGetPaymentsQuery = (
  leaseId: number,
  options: UseQueryOptions<Payment[], Error>
) => {
  return useQuery<Payment[], Error>({
    queryKey: [TAGS.GET_PROPERTY_LEASE],
    queryFn: () => getPayments(leaseId),
    ...options,
    onError: () => {
      toast.error(`Failed to fetch lease payment`);
    },
  });
};
