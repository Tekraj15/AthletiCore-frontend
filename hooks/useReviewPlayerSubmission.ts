// src/hooks/useReviewPlayerSubmission.ts
import { useMutation } from "@tanstack/react-query";
import { reviewPlayerSubmissionAPI } from "@/api/eventFormApi";
import { IReviewSubmissionRequest } from "@/types/eventForm";

export const useReviewPlayerSubmission = () => {
  return useMutation({
    mutationFn: ({
      submissionId,
      data,
    }: {
      submissionId: string;
      data: IReviewSubmissionRequest;
    }) => reviewPlayerSubmissionAPI(submissionId, data),
  });
};
