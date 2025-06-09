import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "./ChatListItem";
import { UserProfileData } from "@/types/user";

interface Props {
  data: UserProfileData[];
  current_user: UserProfileData | null;
}

const ChatList = ({ data, current_user }: Props) => {
  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) => (
        <ChatListItem current_user={current_user} data={item} />
      )}
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
