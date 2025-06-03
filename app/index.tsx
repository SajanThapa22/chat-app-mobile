import Screen from "@/components/shared/Screen";
import { Href, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push("/login" as Href);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.text}>Home page</Text>
        <TouchableOpacity onPress={navigateToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 15,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  text: {
    color: "#333333",
  },
  buttonText: {
    color: "#ffffff",
  },
});
