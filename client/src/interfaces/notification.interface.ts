export interface INotification {
  _id: string;
  type: "friend_request" | "friend_accept" | "system" | "news" | "discount";
  content: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}
