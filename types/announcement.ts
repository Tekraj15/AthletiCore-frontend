export interface IAnnouncement {
  _id: string;
  title: string;
  message: string;
  event?: string; // mongoose.Types.ObjectId serialized as string
  expiryDate?: string; // Dates are serialized as strings in JSON
  attachments?: string[];
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ICreateAnnouncemntRequest {
  title: string;
  message: string;
  event?: string;
  expiryDate?: string;
  attachments?: string[];
}
export interface ICreateAnnouncementResponse {
  message: string;
  announcement: IAnnouncement;
}
