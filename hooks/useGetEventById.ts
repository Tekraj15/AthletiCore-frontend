import { useQuery } from "@tanstack/react-query";
import { getEventByIdAPI } from "@/api/eventApi";

export const useGetEventById = (id: string) => {
  return useQuery({
    queryKey: ["event-by-id", id],
    queryFn: () => getEventByIdAPI(id),
    enabled: !!id, // Ensures it only runs if `id` is truthy
  });
};
