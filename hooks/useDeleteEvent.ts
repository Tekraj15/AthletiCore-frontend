import { useMutation } from "@tanstack/react-query";
import { deleteEventAPI } from "@/api/eventApi";

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: deleteEventAPI,
  });
};
