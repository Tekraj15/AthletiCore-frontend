// hooks/useCreateEventForm.ts
import { useMutation } from "@tanstack/react-query";
import { createEventFormAPI } from "@/api/eventFormApi";

export const useCreateEventForm = () => {
  return useMutation({
    mutationFn: createEventFormAPI,
  });
};
