import {
  createApplication,
  getApplications,
  updateApplicationStatus,
} from "@/apis/application.api";
import { TAGS } from "@/constants";
import { Application } from "@/types/prismaTypes";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetApplicationsQuery = (
  {
    userId,
    userType,
  }: {
    userId?: string;
    userType?: string;
  },
  options?: UseQueryOptions<Application[], Error>
) => {
  return useQuery<Application[], Error>({
    queryKey: [TAGS.GET_APPLICATIONS],
    queryFn: () => getApplications({ userId, userType }),
    ...options,
    onError: () => {
      toast.error(`Failed to fetch applications`);
    },
  });
};

export const useUpdateApplicationStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TAGS.UPDATE_APPLICATION_STATUS],
    mutationFn: updateApplicationStatus,
    onSuccess: async () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [TAGS.GET_MANAGER_PROPERTIES],
        }),
        queryClient.invalidateQueries({
          queryKey: [TAGS.GET_PROPERTIES],
        }),
      ]);
    },
    onError: () => {
      toast.error(`Failed to update application status`);
    },
  });
};

export const useCreateApplicationMutation = () => {
  return useMutation({
    mutationKey: [TAGS.CREATE_APPLICATION],
    mutationFn: createApplication,
    onError: () => {
      toast.error(`Failed to create application`);
    },
  });
};
