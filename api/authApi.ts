import { LOGIN_URL } from "@/constants/url/url";
import { baseFetcher } from "./baseFetcher";
import { ILoginRequest, ILoginResponse } from "@/types/auth";

export const loginAPI = (data: ILoginRequest) =>
  baseFetcher<ILoginResponse>(LOGIN_URL, {
    method: "POST",
    data,
  });
