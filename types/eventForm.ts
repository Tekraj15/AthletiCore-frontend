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
