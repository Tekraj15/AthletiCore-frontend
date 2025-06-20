// hooks/useRegister.ts

import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "@/api/authApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerAPI,
  });
};
