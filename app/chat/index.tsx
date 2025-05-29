import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import SearchIcon from "react-native-vector-icons/MaterialIcons";

import { userImage } from "@/assets/images";

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchIcon color="#a5a5a5" name="search" size={24} />
        <TextInput style={styles.input} placeholder="Search" />
      </View>

      <View style={styles.userContainer}>
        <Image style={styles.image} source={userImage} />

        <View style={styles.userNameText}>
          <Text style={styles.userName}>Sajan Thapa</Text>
          <Text style={styles.userText}>Reply me . Mon</Text>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    backgroundColor: "#e0e0e0",
    gap: 7,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "transparent",
    flex: 1,
    fontSize: 16,
  },
  userContainer: {
    flexDirection: "row",
    gap: 14,
  },
  image: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 999,
  },
  userNameText: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    color: "#333333",
  },
  userText: {
    fontSize: 14,
    color: "#808080",
  },
});
