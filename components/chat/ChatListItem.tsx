import { chatListItem } from "@/types/chat";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  data: chatListItem;
}

const ChatListItem = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={data.image} />

      <View style={styles.userNameText}>
        <Text style={styles.userName}>{data.user_name}</Text>
        <Text style={styles.userText}>{`${data.message} . ${data.time}`}</Text>
      </View>
    </View>
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
    gap: 5,
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    color: "#333333",
  },
  userText: {
    fontSize: 14,
    color: "#808080",
  },
});
