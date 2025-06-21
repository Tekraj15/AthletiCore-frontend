import { useQuery } from "@tanstack/react-query";
import { getALllAnnouncementAPI } from "@/api/announcementApi";

export const usegetAllAnnouncementAPI = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: getALllAnnouncementAPI,
  });
};
