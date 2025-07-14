// hooks/useEventForm.ts
import { useQuery } from "@tanstack/react-query";
import { getEventFormAPI } from "@/api/eventFormApi";

export const useGetEventForm = (eventId: string) => {
  return useQuery({
    queryKey: ["event-form", eventId],
    queryFn: () => getEventFormAPI(eventId),
    enabled: !!eventId, // only fetch if eventId is truthy
  });
};
