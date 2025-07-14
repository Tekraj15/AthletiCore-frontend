import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEventAPI } from "@/api/eventApi";

export const useDeleteEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEventAPI(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-events"] }),
  });
};
