import { getPlayerSubmissionDetailAPI } from "@/api/eventFormApi";
import { useQuery } from "@tanstack/react-query";

export const useGetPlayerSubmissionDetail = (
  eventId: string,
  submissionId: string
) => {
  return useQuery({
    queryKey: ["submission-detail", eventId, submissionId],
    queryFn: () => getPlayerSubmissionDetailAPI(eventId, submissionId),
    enabled: !!eventId && !!submissionId,
  });
};
