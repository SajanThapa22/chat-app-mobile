import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

const ChatLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTitle: () => (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textTransform: "lowercase",
            }}
          >
            chat
          </Text>
        ),
      }}
    ></Stack>
  );
};

export default ChatLayout;
