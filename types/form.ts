export interface IFormField {
  id: string;
  fieldName: string;
  fieldType: "text" | "number" | "date" | "select";
  required: boolean;
  options?: string[];
  isStatic?: boolean;
  key?: string;
}

export interface IEventForm {
  id: string;
  eventId: string;
  fields: IFormField[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormFieldInput {
  fieldName: string;
  fieldType: "text" | "number" | "date" | "select";
  required: boolean;
  options?: string[];
}
