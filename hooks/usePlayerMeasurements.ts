import { getPlayerMeasurementsAPI } from "@/api/liveGameApi";
import { useQuery } from "@tanstack/react-query";

export const usePlayerMeasurements = (eventId: string) => {
  return useQuery({
    queryKey: ["player-measurements", eventId],
    queryFn: () => getPlayerMeasurementsAPI(eventId),
    enabled: !!eventId,
  });
};
