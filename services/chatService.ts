import {
  collection,
  doc,
  query,
  Timestamp,
  orderBy,
  onSnapshot,
  DocumentData,
  Unsubscribe,
  OrderByDirection,
} from "firebase/firestore";
import databaseService from "./databaseService";
import { db } from "./firebaseConfig";
import { Alert } from "react-native";
import { MessageType } from "@/types/chat";
import { UserProfileData } from "@/types/user";

const chatService = {
  //Get currently logged in user data
  async getUserData(userId: string): Promise<UserProfileData | null> {
    const docSnapData = await databaseService.get("users", userId);

    if (docSnapData) {
      return docSnapData;
    } else {
      console.warn("No such user!");
      return null;
    }
  },
  //Create a chat room
  async createRoom(roomId: string) {
    try {
      const response = await databaseService.set("rooms", roomId, {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });

      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  },

  //Get room id
  getRoomId(userId1: string | undefined, userId2: string | string[]) {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join("-");
    return roomId;
  },

  //Send message
  async sendMessage(roomId: string, userData: MessageType) {
    if (!userData) return;
    try {
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");

      const newDoc = await databaseService.add(messagesRef, userData);
      return newDoc;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Message", error.message);
      }
    }
  },

  //Get Messages
  async getMessages(
    roomId: string,
    callback: (messages: DocumentData[]) => void,
    order?: OrderByDirection
  ): Promise<Unsubscribe | undefined> {
    try {
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy("createdAt", order || "asc"));

      const unsub = onSnapshot(q, (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(allMessages);
      });

      return unsub;
    } catch (error) {
      console.error("Error getting messages:", error);
      return undefined;
    }
  },
  formatDate(date: Date): string {
    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const isSameDay =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isSameDay) {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm}`;
    }

    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / oneDayMs);

    if (diffInDays < 7) {
      return dayNames[date.getDay()];
    }

    const isSameYear = date.getFullYear() === now.getFullYear();

    if (!isSameYear) {
      return `${date.getDate()} ${
        monthNames[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  },
};

export default chatService;
