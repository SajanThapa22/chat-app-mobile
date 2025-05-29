import { chatListItem } from "@/types/chat";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "./ChatListItem";

interface Props {
  data: chatListItem[];
}

const ChatList = ({ data }: Props) => {
  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) => <ChatListItem data={item} />}
    />
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    flex: 1,
  },
});
