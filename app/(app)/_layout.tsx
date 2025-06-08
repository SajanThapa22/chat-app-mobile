import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
      }}
    ></Stack>
  );
};

export default HomeLayout;
