import { useMutation } from "@tanstack/react-query";
import { createAnnouncementAPI } from "@/api/announcementApi";

export const useCreateAnnouncement = () => {
  return useMutation({
    mutationFn: createAnnouncementAPI,
  });
};
