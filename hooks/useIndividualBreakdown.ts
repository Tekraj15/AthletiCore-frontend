import { getIndividualBreakdownAPI } from "@/api/liveGameApi";
import { useQuery } from "@tanstack/react-query";

export const useIndividualBreakdown = (eventId: string) => {
  return useQuery({
    queryKey: ["player-breakdown", eventId],
    queryFn: () => getIndividualBreakdownAPI(eventId),
    enabled: !!eventId,
  });
};
