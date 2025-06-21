import { useMutation } from "@tanstack/react-query";
import { createEventAPI } from "@/api/eventApi";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEventAPI,
  });
};
