import { useQuery } from "@tanstack/react-query";
import { getLiftAttemptsAPI } from "@/api/liftAttemptApi";

export const useGetLiftAttempt = (userId: string, eventId: string) => {
  return useQuery({
    queryKey: ["lift-attempts", userId, eventId],
    queryFn: () => getLiftAttemptsAPI(userId, eventId),
    enabled: !!userId && !!eventId, // only fetch if both IDs are provided
  });
};
