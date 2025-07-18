import { useMutation } from "@tanstack/react-query";
import { initializeLiftAttemptsAPI } from "@/api/liftAttemptApi";

export const useInitializeLiftAttempt = () => {
  return useMutation({
    mutationFn: initializeLiftAttemptsAPI,
  });
};
