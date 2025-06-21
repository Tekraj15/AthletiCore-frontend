// useMyEvents.ts
import { useQuery } from "@tanstack/react-query";
import { getMyEventsAPI } from "@/api/eventApi";

export const useMyEvents = () => {
  return useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEventsAPI,
  });
};
