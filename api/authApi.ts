import { LOGIN_URL, LOGOUT_URL } from "@/constants/url/url";
import { baseFetcher } from "./baseFetcher";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ILogoutResponse,
} from "@/types/auth";


export const loginAPI = (data: ILoginRequest) =>
  baseFetcher<ILoginResponse>(LOGIN_URL, {
    method: "POST",
    data,
  });

export const registerAPI = (data: IRegisterRequest) =>
  baseFetcher<IRegisterResponse>("/user/register", {
    method: "POST",
    data,
  });

  export const logoutAPI = () =>
  baseFetcher<ILogoutResponse>(LOGOUT_URL, {
    method: "POST",
  });
