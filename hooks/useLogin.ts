import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "@/api/authApi";
import { ILoginResponse } from "@/types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: (data: ILoginResponse) => {
      // ✅ Store both tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // ✅ Store user info
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error("❌ Login failed", error);
    },
  });
};
