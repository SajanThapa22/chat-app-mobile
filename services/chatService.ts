import { collection, doc, getDoc, Timestamp } from "firebase/firestore";
import databaseService from "./databaseService";
import { db } from "./firebaseConfig";
import { Alert } from "react-native";
import { SendMessage } from "@/types/chat";
import { UserProfileData } from "@/types/user";

const chatService = {
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
  async createRoom(userId1: string, userId2: string | string[]) {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join("-");
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

  getRoomId(userId1: string, userId2: string | string[]) {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join("-");
    return roomId;
  },

  async sendMessage(roomId: string, userData: SendMessage) {
    if (!userData) return;
    try {
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");

      const newDoc = await databaseService.add(messagesRef, userData);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Message", error.message);
      }
    }
  },
};

export default chatService;
