import { useMutation } from "@tanstack/react-query";
import { submitEventFormAPI } from "@/api/eventFormApi";

export const useSubmitEventForm = () => {
  return useMutation({
    mutationFn: submitEventFormAPI,
  });
};
