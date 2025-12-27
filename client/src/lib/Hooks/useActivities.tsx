import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";
import useStore from "./useStore";
const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
  const location = useLocation();
  const {activityStore:{filter,startDate}}=useStore();

  const {
    data: activitiesgrp,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<Activity, string>>({
    queryKey: ["activities",filter,startDate],
    queryFn: async ({ pageParam = null }) => {
      const response = await agent.get<PagedList<Activity, string>>(
        "/activities",
        {
          params: {
            cursor: pageParam,
            page: 3,
            filter,
            startDate
          },
        }
      );
      return response.data;
    },
    staleTime:1000*60*5,
    placeholderData:keepPreviousData,
    initialPageParam: null,
    getNextPageParam: (lastpage) => lastpage.nextCursor,
    enabled: !id && location.pathname === "/activities" && !!currentUser,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((activity) => {
          const host = activity.attendees.find(
            (x) => x,
            id === activity.hostId
          );
          return {
            ...activity,
            isHost: currentUser?.id === activity.hostId,
            isGoing: activity.attendees.some((x) => x.id === currentUser?.id),
            hostImageUrl: host?.imageUrl,
          };
        }),
      })),
    }),
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
      //to prevent this query to be executed every single time we cast the id to boolean
      //so that if it exists only then this query executes
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      const host = data.attendees.find((x) => x, id === data.hostId);
      return {
        ...data,
        isHost: currentUser?.id === data.hostId,
        isGoing: data.attendees.some((x) => x.id === currentUser?.id),
        hostImageUrl: host?.imageUrl,
      };
    },
  });
  const updateActivities = useMutation<void, unknown, Activity>({
    mutationFn: async (activity: Activity) => {
      await agent.put("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
  // Create mutation expects a payload without server-generated fields like `id` and `isCancelled`.
  type CreateActivityPayload = Omit<Activity, "id" | "isCancelled">;
  const CreateActivities = useMutation<string, unknown, CreateActivityPayload>({
    mutationFn: async (activity: CreateActivityPayload) => {
      const response = await agent.post("/activities", activity);
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
  //updateattendance
  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/activities/${id}/attend`);
    },
    onMutate: async (activityId: string) => {
      await queryClient.cancelQueries({ queryKey: ["activities", activityId] });
      const prevActivity = queryClient.getQueryData<Activity>([
        "activities",
        activityId,
      ]);
      queryClient.setQueryData<Activity>(
        ["activities", activityId],
        (oldactivity) => {
          if (!oldactivity || !currentUser) {
            return oldactivity;
          }
          const isHost = oldactivity.hostId === currentUser.id;
          const isAttending = oldactivity.attendees.some(
            (x) => x.id === currentUser.id
          );
          return {
            ...oldactivity,
            isCancelled: isHost
              ? !oldactivity.isCancelled
              : oldactivity.isCancelled,
            attendees: isAttending
              ? isHost
                ? oldactivity.attendees
                : oldactivity.attendees.filter((x) => x.id !== currentUser.id)
              : [
                  ...oldactivity.attendees,
                  {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    imageUrl: currentUser.imageUrl,
                    photos: [],
                  },
                ],
          };
        }
      );
      return { prevActivity };
    },
    onError: (error, activityId, context) => {
      console.log(error);
      if (context?.prevActivity) {
        queryClient.setQueryData(
          ["activities", activityId],
          context.prevActivity
        );
      }
    },
  });
  return {
    activitiesgrp,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    updateActivities,
    CreateActivities,
    DeleteActivities,
    activity,
    isLoadingActivity,
    updateAttendance,
  };
};

export default useActivities;
