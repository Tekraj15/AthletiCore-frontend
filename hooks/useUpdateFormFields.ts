import { updateFormFieldsByPlayerAPI } from "@/api/eventFormApi";
import { IUpdateFormFieldsRequest } from "@/types/eventForm";
import { useMutation } from "@tanstack/react-query";

export const useUpdateFormFields = () => {
  return useMutation({
    mutationFn: ({
      submissionId,
      data,
    }: {
      submissionId: string;
      data: IUpdateFormFieldsRequest;
    }) => updateFormFieldsByPlayerAPI(submissionId, data),
  });
};
