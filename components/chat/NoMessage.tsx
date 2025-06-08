import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  receiver_name: string | string[];
}

const NoMessage: React.FC<Props> = ({ receiver_name }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="chatbubbles" size={80} color="#A5A5A5" />
      <Text style={styles.title}>Send a message</Text>
      <Text
        style={styles.subtitle}
      >{`Start a conversation with ${receiver_name}`}</Text>
    </View>
  );
};

export default NoMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    color: "#333",
    marginTop: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
});
