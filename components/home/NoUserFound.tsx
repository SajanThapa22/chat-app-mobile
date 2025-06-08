import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NoUserFound = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="account-search-outline"
        size={80}
        color="#A5A5A5"
      />
      <Text style={styles.title}>No Users Found</Text>
      <Text style={styles.subtitle}>
        Try changing the filter or search again.
      </Text>
    </View>
  );
};

export default NoUserFound;

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
