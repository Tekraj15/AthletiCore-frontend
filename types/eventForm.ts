// types/eventForm.ts
import { IFormField } from "@/types/form";
export interface ICreateEventFormRequest {
  eventId: string;
  fields: {
    fieldName: string;
    fieldType: string;
    required: boolean;
    options?: string[];
  }[];
}

export interface ICreateEventFormResponse {
  _id: string;
  eventId: string;
  fields: IFormField[];
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISubmitEventFormRequest {
  eventId: string;
  formFields: {
    key: string;
    value: string;
  }[];
}

export interface ISubmitEventFormResponse {
  message: string;
  submission: {
    _id: string;
    event: string;
    user: string;
    formFields: { key: string; value: string }[];
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
  };
}

export interface IPlayerSubmission {
  _id: string;
  event: string;
  user: {
    _id: string;
    email: string;
    fullName?: string;
  };
  formFields: { key: string; value: string }[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ISubmittedEventFormResponse {
  message: string;
  submissions: IPlayerSubmission[];
}

export interface IUpdateFinalStatsRequest {
  finalHeight?: string;
  finalWeight?: string;
  finalRackHeight?: string;
  status?: "pending" | "approved" | "rejected";
  comments?: string;
}

export interface IUpdateFinalStatsResponse {
  message: string;
  submission: {
    _id: string;
    event: string;
    user: string;
    formFields: { key: string; value: string }[];
    finalHeight?: string;
    finalWeight?: string;
    finalRackHeight?: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUpdateFormFieldsRequest {
  formFields: {
    key: string;
    value: string;
  }[];
}

export interface IUpdateFormFieldsResponse {
  message: string;
  submission: {
    _id: string;
    event: string;
    user: string;
    formFields: { key: string; value: string }[];
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
}

export interface IEventInfo {
  _id: string;
  title: string;
  createdby: string;
}

export interface IPlayerSubmissionDetailResponse {
  submission: {
    _id: string;
    event: IEventInfo | string;
    user: IUserInfo | string;
    formFields: { key: string; value: string }[];
    finalHeight?: string;
    finalWeight?: string;
    finalRackHeight?: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
  };
}
