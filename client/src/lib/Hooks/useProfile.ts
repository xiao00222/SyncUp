import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo, useState } from "react";
import type { editProfileSchema } from "../Schema/editProfileSchema";
import { toast } from "react-toastify";
export const useProfile = (id?: string, predicate?: string) => {
  const [filter, setFilter] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: profile, isLoading: isLoadingProfile } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id && !predicate,
  });
  const { data: userActivities, isLoading: loadinguserActivities } = useQuery({
    queryKey: ["user-activities", filter],
    queryFn: async () => {
      const response = await agent.get<Activity[]>(
        `/profiles/${id}/activities`,
        {
          params: {filter},
        }
      );
      return response.data;
    },
    enabled: !!id && !!filter,
  });
  const { data: photos, isLoading: isLoadingPhotos } = useQuery<Photo[]>({
    queryKey: ["photos", id],
    queryFn: async () => {
      const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
      return response.data;
    },
    enabled: !!id && !predicate,
  });
  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await agent.post(`/profiles/add-photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async (photo: Photo) => {
      await queryClient.invalidateQueries({ queryKey: ["photos", id] });
      queryClient.setQueryData(["user"], (data: User) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url,
        };
      });
      queryClient.setQueryData(["profile", id], (data: Profile) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url,
        };
      });
    },
  });
  const deletePhoto = useMutation({
    mutationFn: async (photoId: string) => {
      await agent.delete(`/profiles/${photoId}/photos`);
    },
    onSuccess: (_, photoId) => {
      queryClient.setQueryData(["photos", id], (photos: Photo[]) => {
        return photos?.filter((x) => x.id !== photoId);
      });
    },
  });
  const setMainPhoto = useMutation({
    mutationFn: async (photo: Photo) => {
      await agent.put(`/profiles/${photo.id}/SetMain`);
    },
    onSuccess: (_, photo) => {
      queryClient.setQueryData(["user"], (userData: User) => {
        if (!userData) return userData;
        return {
          ...userData,
          imageUrl: photo.url,
        };
      });
      queryClient.setQueryData(["profile", id], (profile: Profile) => {
        if (!profile) return profile;
        return {
          ...profile,
          imageUrl: photo.url,
        };
      });
    },
  });
  const editProfile = useMutation({
    mutationFn: async (profile: editProfileSchema) => {
      await agent.put(`/profiles`, profile);
    },
    onSuccess: (_, profile) => {
      queryClient.setQueryData(["profile", id], (data: Profile) => {
        toast.success("Profile updated successfully");
        if (!data) return data;
        return {
          ...data,
          displayName: profile.displayName,
          bio: profile.bio,
        };
      });
      queryClient.setQueryData(["user"], (UserData: User) => {
        if (!UserData) return UserData;
        return {
          ...UserData,
          displayName: profile.displayName,
          bio: profile.bio,
        };
      });
    },
  });
  const updateFollowing = useMutation({
    mutationFn: async () => {
      await agent.post(`/profiles/${id}/follow`);
    },
    onSuccess: () => {
      queryClient.setQueryData(["profile", id], (profile: Profile) => {
        queryClient.invalidateQueries({
          queryKey: ["followings", id, "followers"],
        });
        if (!profile || profile.followerCount === undefined) return profile;
        return {
          ...profile,
          following: !profile.following,
          followerCount: profile.following
            ? profile.followerCount - 1
            : profile.followerCount + 1,
        };
      });
    },
  });
  const { data: followings, isLoading: loadingFollowings } = useQuery<
    Profile[]
  >({
    queryKey: ["followings", id, predicate],
    queryFn: async () => {
      const response = await agent.get<Profile[]>(
        `/profiles/${id}/follow-list?predicate=${predicate}`
      );
      return response.data;
    },
    enabled: !!id && !!predicate,
  });
  const isCurrentUser = useMemo(() => {
    return id === queryClient.getQueryData<User>(["user"])?.id;
  }, [id, queryClient]);
  return {
    profile,
    isLoadingProfile,
    photos,
    isLoadingPhotos,
    isCurrentUser,
    uploadPhoto,
    setMainPhoto,
    deletePhoto,
    editProfile,
    updateFollowing,
    followings,
    loadingFollowings,
    userActivities,
    setFilter,
    filter,
    loadinguserActivities,
  };
};
