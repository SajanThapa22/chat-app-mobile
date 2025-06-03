import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { chatLogo } from "@/assets/images";
import Screen from "@/components/shared/Screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Href, useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const redirectToSignUp = () => {
    router.push("/signup" as Href);
  };

  const handleLogin = () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View>
          <View style={styles.imageContainer}>
            <Image source={chatLogo} style={styles.image} />
          </View>

          <View>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputsContainer}>
              <MaterialIcons name="mail-outline" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                placeholder="Email address"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>

            <View style={styles.inputsContainer}>
              <MaterialIcons name="lock-outline" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                placeholder="Password"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.noAccount}>
              <Text>Don't have an account yet?</Text>
              <TouchableOpacity onPress={redirectToSignUp}>
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loginForm: {
    flex: 1,
    gap: 12,
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  image: {
    width: hp(17),
    height: hp(17),
  },
  inputsContainer: {
    height: hp(7),
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 10,
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontWeight: "semibold",
    color: "#333333",
  },
  loginButton: {
    borderRadius: 10,
    backgroundColor: "dodgerblue",
    width: "100%",
    padding: 15,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#3B82F6",
    fontWeight: "semibold",
    textAlign: "right",
  },
  noAccount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  signUpText: {
    color: "#3B82F6",
    fontWeight: "semibold",
  },
});
