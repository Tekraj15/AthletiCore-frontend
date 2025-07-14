import { baseFetcher } from "./baseFetcher";
import {
  CREATE_ANNOUNCEMENT_URL,
  GET_ANNOUNCEMENT_URL,
  // Add update and delete announcement imports
  UPDATE_ANNOUNCEMENT_URL,
  DELETE_ANNOUNCEMENT_URL,
} from "@/constants/url/url";
import {
  ICreateAnnouncemntRequest,
  ICreateAnnouncementResponse,
  IAnnouncement,
} from "@/types/announcement";

export const createAnnouncementAPI = (data: ICreateAnnouncemntRequest) =>
  baseFetcher<ICreateAnnouncementResponse>(CREATE_ANNOUNCEMENT_URL, {
    method: "POST",
    data,
  });

export const getALllAnnouncementAPI = () => {
  return baseFetcher<IAnnouncement[]>(GET_ANNOUNCEMENT_URL, {
    method: "GET",
  });
};

// Add get announcement by ID API
export const getAnnouncementByIdAPI = (id: string) => {
  return baseFetcher<IAnnouncement>(`${GET_ANNOUNCEMENT_URL}/${id}`, {
    method: "GET",
  });
};

// Add update announcement API
export const updateAnnouncementAPI = (
  id: string,
  data: ICreateAnnouncemntRequest
) =>
  baseFetcher<ICreateAnnouncementResponse>(
    `${UPDATE_ANNOUNCEMENT_URL}/${id}`,
    {
      method: "PATCH",
      data,
    }
  );

// Add delete announcement API
export const deleteAnnouncementAPI = (id: string) =>
  baseFetcher<void>(`${DELETE_ANNOUNCEMENT_URL}/${id}`, {
    method: "DELETE",
  });
