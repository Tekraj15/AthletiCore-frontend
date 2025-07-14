import { updateFinalStatsByOfficialAPI } from "@/api/eventFormApi";
import { IUpdateFinalStatsRequest } from "@/types/eventForm";
import { useMutation } from "@tanstack/react-query";

export const useUpdateFinalStats = () => {
  return useMutation({
    mutationFn: ({
      submissionId,
      data,
    }: {
      submissionId: string;
      data: IUpdateFinalStatsRequest;
    }) => updateFinalStatsByOfficialAPI(submissionId, data),
  });
};
