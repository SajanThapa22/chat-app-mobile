import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import MessageList from "@/components/chat/MessageList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CustomKeyboardView from "@/components/shared/CustomKeyboardView";
import { useAuth } from "@/contexts/AuthContext";
import chatService from "@/services/chatService";
import { DocumentData, Timestamp, Unsubscribe } from "firebase/firestore";
import { MessageType } from "@/types/chat";

const ChatRoom = () => {
  const item = useLocalSearchParams(); //receiver
  const { user, userProfileData } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const textRef = useRef("");
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    const setupChat = async () => {
      await createRoomIfNotExists();
      unsubscribe = await getMessages();
    };

    setupChat();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const createRoomIfNotExists = async () => {
    if (user?.uid && item?.user_id) {
      const roomId = chatService.getRoomId(user.uid, item.user_id);
      await chatService.createRoom(roomId);
    }
  };

  const getMessages = async (): Promise<Unsubscribe | undefined> => {
    if (user?.uid && item?.user_id) {
      const roomId = chatService.getRoomId(user.uid, item.user_id);
      return await chatService.getMessages(roomId, setMessages);
    }
    return undefined;
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
        const data: MessageType = {
          user_id: userProfileData?.user_id,
          text: message,
          profile_url: userProfileData?.profile_url,
          sender_name: userProfileData?.user_name,
          createdAt: Timestamp.fromDate(new Date()),
        };
        const newDoc = await chatService.sendMessage(roomId, data);

        console.log("New message sent: ", newDoc?.id);
      }
      if (inputRef) {
        inputRef?.current?.clear();
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
            <MessageList current_user={userProfileData} messages={messages} />
          </View>

          <View style={styles.bottomContainer}>
            <FontAwesome name="camera" color="dodgerblue" size={22} />
            <FontAwesome6 name="image" color="dodgerblue" size={22} />
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholderTextColor={"#b3b3b3"}
                style={styles.input}
                placeholder="Type message..."
              />
            </View>

            <TouchableOpacity onPress={handleSendMessage}>
              <FontAwesome name="send" color="dodgerblue" size={22} />
            </TouchableOpacity>
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
