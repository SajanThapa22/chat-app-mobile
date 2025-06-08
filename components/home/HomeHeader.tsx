import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { blurhash } from "@/constants/common";
import { Stack } from "expo-router";

interface Props {
  image: string | undefined;
  onImagePress: () => void;
}

const HomeHeader: React.FC<Props> = ({ image, onImagePress }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>messenger</Text>
          </View>
        ),

        headerRight: () => (
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={onImagePress}>
              <Image
                source={{ uri: image }}
                style={styles.userImage}
                placeholder={blurhash}
                transition={500}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerTitle: {
    color: "#006aff",
    fontSize: 26,
    fontWeight: "bold",
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    aspectRatio: 1,
  },
});
