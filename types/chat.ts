import { ImageSourcePropType } from "react-native";

export interface chatListItem {
  image: ImageSourcePropType;
  user_name: string;
  message: string;
  time: string;
}
