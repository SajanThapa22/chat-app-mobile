import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/shared/Screen";

const ChatRoom = () => {
  const item = useLocalSearchParams();
  return (
    <Screen>
      <Text style={{ color: "#000000" }}>{item.user_name}</Text>
      <Text style={{ color: "#000000" }}>ChatRoom</Text>
    </Screen>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
