import { chatListItem } from "@/types/chat";
import { UserProfileData } from "@/types/user";
import { UnknownInputParams, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  data: UserProfileData;
}

const ChatListItem = ({ data }: Props) => {
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
  return (
    <TouchableOpacity onPress={openChatRoom} style={styles.container}>
      <Image style={styles.image} source={{ uri: data.profile_url }} />

      <View style={styles.userNameText}>
        <Text style={styles.userName}>{data.user_name}</Text>
        <Text style={styles.userText}>{`Last message . time`}</Text>
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
