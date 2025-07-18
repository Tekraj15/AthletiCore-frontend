// data.ts

export interface OfficialContact {
  name: string;
  email: string;
  phone?: string;
}

export interface Prize {
  prizeTitle: string;
  weightCategory?: string;
}

export interface EventItem {
  title: string;
  description: string;
  venue: string;
  date: string;
  weightCategories: string[];
  competitionType: "Male" | "Female" | "Open";
  prizes: Prize[];
  coordinator?: OfficialContact;
  otherOfficial?: OfficialContact;
  organizerPhoneNumber?: string;
  eventImage?: string;
  createdby?: string;
}

export const tabs = ["Events", "Announcements"];
