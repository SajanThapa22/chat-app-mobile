import { Timestamp } from "firebase/firestore";

export interface chatListItem {
  profile_url: string;
  user_name: string;
  last_message: string;
  last_message_time: string;
}

export interface MessageType {
  user_id: string;
  text: string;
  profile_url: string;
  sender_name: string;
  createdAt: Timestamp;
  sent_timestamp?: Timestamp | null;
  delivered_timestamp?: Timestamp | null;
  seen_timestamp?: Timestamp | null;
}
