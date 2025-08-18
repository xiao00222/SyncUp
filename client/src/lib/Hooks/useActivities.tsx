import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
const useActivities = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
  });
  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
      //to prevent this query to be executed every single time we cast the id to boolean
      //so that if it exists only then this query executes
    },
    enabled: !!id,
  });
  const updateActivities = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
  const CreateActivities = useMutation({
    mutationFn: async (activity: Activity) => {
     const response= await agent.post("/activities", activity);
     return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
  const DeleteActivities = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
  return {
    activities,
    isLoading,
    updateActivities,
    CreateActivities,
    DeleteActivities,
    activity,
    isLoadingActivity,
  };
};

export default useActivities;
