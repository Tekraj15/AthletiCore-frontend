import { baseFetcher } from "./baseFetcher";
import {
  CREATE_ANNOUNCEMENT_URL,
  GET_ANNOUNCEMENT_URL,
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
