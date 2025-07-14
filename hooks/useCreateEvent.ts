import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEventAPI } from "@/api/eventApi";
import { ICreateEventRequest } from "@/types/event";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateEventRequest | FormData) => createEventAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "my-events"] });
    },
  });
};
