import { userImage } from "@/assets/images";
import { chatListItem } from "@/types/chat";

export const chatListData: chatListItem[] = [
  {
    image: userImage,
    user_name: "John Doe",
    message: "Hey, how are you?",
    time: "10:45",
  },
  {
    image: userImage,
    user_name: "Emily Smith",
    message: "Let’s catch up tomorrow!",
    time: "9:30",
  },
  {
    image: userImage,
    user_name: "Michael Johnson",
    message: "Got the files. Thanks!",
    time: "Tue",
  },
  {
    image: userImage,
    user_name: "Sophia Lee",
    message: "I’ll call you in 5 mins.",
    time: "Sun",
  },
  {
    image: userImage,
    user_name: "David Kim",
    message: "Awesome! Talk soon.",
    time: "Sat",
  },
];
