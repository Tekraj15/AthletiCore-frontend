// api/eventFormApi.ts
import { baseFetcher } from "./baseFetcher";
import {
  ICreateEventFormRequest,
  ICreateEventFormResponse,
} from "@/types/eventForm";
import { CREATE_EVENT_FORM_URL } from "@/constants/url/url";

export const createEventFormAPI = ({
  eventId,
  fields,
}: ICreateEventFormRequest) => {
  const url = CREATE_EVENT_FORM_URL.replace(":eventId", eventId);
  return baseFetcher<ICreateEventFormResponse>(url, {
    method: "POST",
    data: { fields },
  });
};

export const getEventFormAPI = (eventId: string) => {
  const url = CREATE_EVENT_FORM_URL.replace(":eventId", eventId);
  return baseFetcher<ICreateEventFormResponse>(url, {
    method: "GET",
  });
};
