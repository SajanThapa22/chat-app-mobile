import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { blurhash } from "@/constants/common";

interface Props {
  image: string | undefined;
  onImagePress: () => void;
}

const HomeHeader: React.FC<Props> = ({ image, onImagePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Messenger</Text>

      <TouchableOpacity onPress={onImagePress}>
        <Image
          source={{ uri: image }}
          style={styles.userImage}
          placeholder={blurhash}
          transition={500}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 10,
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
