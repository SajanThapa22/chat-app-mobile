import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="chatRoom"
        options={{
          headerShadowVisible: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default HomeLayout;
