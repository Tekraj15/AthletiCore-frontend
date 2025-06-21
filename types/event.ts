export interface ICreateEventRequest {
  title: string;
  venue: string;
  date: string;
  competitionType: "Open" | "Male" | "Female";
  description: string;
  eventImage?: string;
  weightCategories: string[];
  prizes: {
    title: string;
    prize: string;
  }[];
  coordinator: {
    name: string;
    phone: string;
    email: string;
  };
  otherOfficial: {
    name: string;
    phone: string;
    email: string;
  };
}
export interface ICreateEventResponse {
  message: string;
  event: {
    id: string;
    title: string;
    description: string;
    venue: string;
    date: string;
    weightCategories: string[];
    competitionType: "Open" | "Male" | "Female";
    prizes: {
      title: string;
      prize: string;
    }[];
    coordinator: {
      name: string;
      phone: string;
      email: string;
    };
    otherOfficial: {
      name: string;
      phone: string;
      email: string;
    };
    organizerPhoneNumber?: string;
    eventImage?: string;
    createdby: {
      _id: string;
      fullName: string;
    };
    createdAt?: string;
    updatedAt?: string;
  };
}
