import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEventAPI } from "@/api/eventApi";

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEventAPI(id, data),
    onSuccess: () => {
      // Invalidate and refetch events list
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
      queryClient.invalidateQueries({ queryKey: ["all-events"] });
    },
  });
};
