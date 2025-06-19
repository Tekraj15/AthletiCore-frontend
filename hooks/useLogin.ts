import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "@/api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI,
  });
};
