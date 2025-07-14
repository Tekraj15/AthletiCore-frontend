// Add get announcement by ID hook
import { useQuery } from "@tanstack/react-query";
import { getAnnouncementByIdAPI } from "@/api/announcementApi";

export const useGetAnnouncementById = (id: string) => {
  return useQuery({
    queryKey: ["announcement", id],
    queryFn: () => getAnnouncementByIdAPI(id),
    enabled: !!id,
  });
}; 