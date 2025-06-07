import { chatListItem } from "@/types/chat";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import ChatListItem from "./ChatListItem";
import { UserProfileData } from "@/types/user";

interface Props {
  data: UserProfileData[];
  loading: boolean;
}

const ChatList = ({ data, loading }: Props) => {
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
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
