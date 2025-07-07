import { useQuery } from "@tanstack/react-query";
import { getMySubmissionsAPI } from "@/api/eventFormApi";

export const useGetMySubmissions = (eventId: string) => {
  return useQuery({
    queryKey: ["my-submissions", eventId],
    queryFn: () => getMySubmissionsAPI(eventId),
    enabled: !!eventId,
  });
};
