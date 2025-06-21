import { useQuery } from "@tanstack/react-query";
import { getAllEventsAPI } from "@/api/eventApi";

export const useGetAllEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getAllEventsAPI,
  });
};
