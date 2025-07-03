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

// export interface ICreateEventFormResponse {
//   message: string;
//   form: {
//     _id: string;
//     eventId: string;
//     fields: IFormField[];
//     createdBy: string;
//     createdAt?: string;
//   };
// }

export interface ICreateEventFormResponse {
  _id: string;
  eventId: string;
  fields: IFormField[];
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}
