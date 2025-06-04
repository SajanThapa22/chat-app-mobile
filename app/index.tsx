import { chatLogo } from "@/assets/images";
import Screen from "@/components/shared/Screen";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HomeScreen = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push("/login" as Href);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.intro}>
          <View style={styles.imageContainer}>
            <Image source={chatLogo} style={styles.image} />
          </View>
          <Text style={styles.title}>Welcome to my chat app</Text>
          <Text style={styles.subTitle}>
            Hang out, explore or just talk, Tap below to get started!
          </Text>
        </View>
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
  },
  intro: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    gap: 20,
    marginBottom: 40,
  },
  button: {
    marginTop: 15,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  title: {
    color: "rgb(103, 103, 103)",
    fontWeight: "900",
    fontSize: 30,
    textAlign: "center",
  },
  subTitle: {
    color: "#333333",
    textAlign: "center",
    fontSize: 15,
  },
  buttonText: {
    color: "#ffffff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  image: {
    width: hp(17),
    height: hp(17),
  },
});
