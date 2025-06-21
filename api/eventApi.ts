import { baseFetcher } from "./baseFetcher";
import { ICreateEventRequest, ICreateEventResponse } from "@/types/event";
import { CREATE_EVENT_URL } from "@/constants/url/url";

export const createEventAPI = (data: ICreateEventRequest | FormData) =>
  baseFetcher<ICreateEventResponse>(CREATE_EVENT_URL, {
    method: "POST",
    data,
  });
