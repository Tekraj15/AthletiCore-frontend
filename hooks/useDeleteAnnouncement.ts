// Add delete announcement hook
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncementAPI } from "@/api/announcementApi";

export const useDeleteAnnouncement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAnnouncementAPI(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}; 