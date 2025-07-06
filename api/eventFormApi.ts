// api/eventFormApi.ts
import { baseFetcher } from "./baseFetcher";
import {
  ICreateEventFormRequest,
  ICreateEventFormResponse,
  IPlayerSubmissionDetailResponse,
  ISubmitEventFormRequest,
  ISubmitEventFormResponse,
  IPlayerSubmission,
  IUpdateFinalStatsRequest,
  IUpdateFinalStatsResponse,
  IUpdateFormFieldsRequest,
  IUpdateFormFieldsResponse,
} from "@/types/eventForm";
import {
  CREATE_EVENT_FORM_URL,
  GET_ALL_EVENT_REGISTRATION_FORM_URL,
  SUBMIT_EVENT_FORM_URL,
} from "@/constants/url/url";

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

export const submitEventFormAPI = ({
  eventId,
  formFields,
}: ISubmitEventFormRequest) => {
  const url = SUBMIT_EVENT_FORM_URL.replace(":eventId", eventId);
  return baseFetcher<ISubmitEventFormResponse>(url, {
    method: "POST",
    data: { formFields },
  });
};

export const getAllEventRegistrationFormAPI = (eventId: string) => {
  const url = GET_ALL_EVENT_REGISTRATION_FORM_URL.replace(":eventId", eventId);
  return baseFetcher<IPlayerSubmission>(url, {
    method: "GET",
  });
};

export const updateFinalStatsByOfficialAPI = (
  submissionId: string,
  data: IUpdateFinalStatsRequest
) => {
  const url = `/submissions/${submissionId}/stats`; // replace with your actual API base
  return baseFetcher<IUpdateFinalStatsResponse>(url, {
    method: "PATCH",
    data,
  });
};

export const updateFormFieldsByPlayerAPI = (
  submissionId: string,
  data: IUpdateFormFieldsRequest
) => {
  const url = `/submissions/${submissionId}`; // replace with full API URL if needed
  return baseFetcher<IUpdateFormFieldsResponse>(url, {
    method: "PATCH",
    data,
  });
};

export const getPlayerSubmissionDetailAPI = (
  eventId: string,
  submissionId: string
) => {
  const url = `/form-events/${eventId}/submissions/${submissionId}`; // adjust path if your base URL differs
  return baseFetcher<IPlayerSubmissionDetailResponse>(url, {
    method: "GET",
  });
};
