import ChatList from "@/components/chat/ChatList";
import Screen from "@/components/shared/Screen";
import { chatListData } from "@/constants/ChatList";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SearchIcon from "react-native-vector-icons/MaterialIcons";

const index = () => {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>messenger</Text>
      </View>

      <View style={styles.inputContainer}>
        <SearchIcon color="#a5a5a5" name="search" size={24} />
        <TextInput style={styles.input} placeholder="Search" />
      </View>

      <ChatList data={chatListData} />
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 14,
    paddingTop: 20,
  },
  header: {
    paddingBottom: 10,
  },
  headerTitle: {
    color: "#006aff",
    fontSize: 26,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    backgroundColor: "#e0e0e0",
    gap: 7,
  },
  input: {
    backgroundColor: "transparent",
    flex: 1,
    fontSize: 16,
  },
});
