import { baseFetcher } from "./baseFetcher";
import {
  ICreateEventRequest,
  ICreateEventResponse,
  IEvent,
} from "@/types/event";
import {
  CREATE_EVENT_URL,
  GET_MY_EVENT_URL,
  GET_EVENT_URL,
  GET_EVENT_BY_ID_URL,
  DELETE_EVENT_URL,
  UPDATE_EVENT_URL,
} from "@/constants/url/url";

export const createEventAPI = (data: ICreateEventRequest | FormData) =>
  baseFetcher<ICreateEventResponse>(CREATE_EVENT_URL, {
    method: "POST",
    data,
  });

export const getMyEventsAPI = () => {
  return baseFetcher<IEvent[]>(GET_MY_EVENT_URL, {
    method: "GET",
  });
};

export const getAllEventsAPI = () => {
  return baseFetcher<IEvent[]>(GET_EVENT_URL, {
    method: "GET",
  });
};

export const getEventByIdAPI = async (id: string) => {
  const url = GET_EVENT_BY_ID_URL.replace(":eventId", id);
  return baseFetcher<IEvent>(url, {
    method: "GET",
  });
};
export const deleteEventAPI = (id: string) => {
  const url = DELETE_EVENT_URL.replace(":eventId", id);
  return baseFetcher<IEvent>(url, {
    method: "DELETE",
  });
};

export const updateEventAPI = (
  id: string,
  data: ICreateEventRequest | FormData
) => {
  const url = UPDATE_EVENT_URL.replace(":eventId", id);
  return baseFetcher<ICreateEventResponse>(url, {
    method: "PUT",
    data,
  });
};
