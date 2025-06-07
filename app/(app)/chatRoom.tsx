import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Screen from "@/components/shared/Screen";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import MessageList from "@/components/chat/MessageList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CustomKeyboardView from "@/components/shared/CustomKeyboardView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import chatService from "@/services/chatService";
import { db } from "@/services/firebaseConfig";
import { doc, Timestamp } from "firebase/firestore";
import { SendMessage } from "@/types/chat";

const ChatRoom = () => {
  const item = useLocalSearchParams(); //receiver
  const { user, userProfileData } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const textRef = useRef("");

  // useEffect(() => {
  //   createRoomIfNotExists();
  // }, []);

  const createRoomIfNotExists = async () => {
    if (user?.uid && item?.user_id) {
      await chatService.createRoom(user.uid, item.user_id);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (
        userProfileData?.user_id &&
        userProfileData.profile_url &&
        userProfileData.user_name &&
        item?.user_id
      ) {
        const roomId = chatService.getRoomId(
          userProfileData.user_id,
          item.user_id
        );
        const message = textRef.current.trim();
        const data: SendMessage = {
          user_id: userProfileData?.user_id,
          text: message,
          profile_url: userProfileData?.profile_url,
          sender_name: userProfileData?.user_name,
          createdAt: Timestamp.fromDate(new Date()),
        };
        const newDoc = await chatService.sendMessage(roomId, data);
      }
    } catch (error) {}
  };

  return (
    <CustomKeyboardView>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View style={styles.divider}></View>

        <View style={styles.chatContainer}>
          <View style={styles.messageContainer}>
            <MessageList />
          </View>

          <View style={styles.bottomContainer}>
            <FontAwesome name="camera" color="dodgerblue" size={22} />
            <FontAwesome6 name="image" color="dodgerblue" size={22} />
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(value) => (textRef.current = value)}
                placeholderTextColor={"#b3b3b3"}
                style={styles.input}
                placeholder="Type message..."
              />
            </View>
            <FontAwesome name="send" color="dodgerblue" size={22} />
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  divider: {
    height: 1,
    backgroundColor: "#e6e6e6",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
  },
  messageContainer: {
    flex: 1,
  },
  bottomContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-between",
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    flex: 1,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
});
