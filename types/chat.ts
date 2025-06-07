import { Timestamp } from "firebase/firestore";
import { ImageSourcePropType } from "react-native";

export interface chatListItem {
  profile_url: string;
  user_name: string;
  last_message: string;
  last_message_time: string;
}

export interface SendMessage {
  user_id: string;
  text: string;
  profile_url: string;
  sender_name: string;
  createdAt: Timestamp;
}
