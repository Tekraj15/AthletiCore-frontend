import { useQuery } from "@tanstack/react-query";
import { getAllEventRegistrationFormAPI } from "@/api/eventFormApi";

export const useGetAllEventsRegistration = (eventId: string) => {
  return useQuery({
    queryKey: ["all-submissions", eventId],
    queryFn: () => getAllEventRegistrationFormAPI(eventId),
  });
};
