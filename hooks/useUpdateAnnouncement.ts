// Add update announcement hook
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementAPI } from "@/api/announcementApi";
import { ICreateAnnouncemntRequest } from "@/types/announcement";

export const useUpdateAnnouncement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ICreateAnnouncemntRequest }) =>
      updateAnnouncementAPI(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}; 