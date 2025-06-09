import chatService from "@/services/chatService";
import { UserProfileData } from "@/types/user";
import { useRouter } from "expo-router";
import { DocumentData, Unsubscribe } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  data: UserProfileData;
  current_user: UserProfileData | null;
}

const ChatListItem = ({ data, current_user }: Props) => {
  const [lastMessage, setLastMessage] = useState<DocumentData | undefined>(
    undefined
  );

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    const setupChat = async () => {
      unsubscribe = await getMessages();
    };

    setupChat();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });

  const getMessages = async (): Promise<Unsubscribe | undefined> => {
    if (current_user?.user_id && data?.user_id) {
      const roomId = chatService.getRoomId(
        current_user?.user_id,
        data?.user_id
      );
      return await chatService.getMessages(
        roomId,
        (allMessages) => setLastMessage(allMessages[0] ?? null),
        "desc"
      );
    }
    return undefined;
  };

  const router = useRouter();
  const openChatRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: {
        user_id: data.user_id,
        user_name: data.user_name,
        profile_url: data.profile_url,
      },
    });
  };

  const renderTime = () => {
    return "11:11";
  };

  const renderLastMessage = () => {
    if (typeof lastMessage === "undefined") return "Loading...";

    const truncate = (text: string, maxLength: number) =>
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    if (lastMessage) {
      const text = truncate(lastMessage.text, 30);
      if (current_user?.user_id === lastMessage.user_id) return `You: ${text}`;
      return text;
    } else {
      return "Say Hi 👋";
    }
  };

  return (
    <TouchableOpacity onPress={openChatRoom} style={styles.container}>
      <Image style={styles.image} source={{ uri: data.profile_url }} />

      <View style={styles.userNameText}>
        <Text style={styles.userName}>{data.user_name}</Text>
        <Text
          style={styles.userText}
        >{`${renderLastMessage()} . ${renderTime()}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 14,
    marginTop: 20,
  },
  image: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 999,
  },
  userNameText: {
    flexDirection: "column",
    gap: 2,
    justifyContent: "center",
  },
  userName: {
    fontSize: 17,
    color: "#4a4a4a",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  userText: {
    fontSize: 14,
    color: "#808080",
  },
});
