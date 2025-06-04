import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { chatLogo } from "@/assets/images";
import Screen from "@/components/shared/Screen";
import { Href, useRouter } from "expo-router";
import Loading from "@/components/shared/Loading";
import Feather from "@expo/vector-icons/Feather";
import CustomKeyboardView from "@/components/shared/CustomKeyboardView";

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View>
          <View style={styles.imageContainer}>
            <Image source={chatLogo} style={styles.image} />
          </View>

          <View>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputsContainer}>
              <Feather name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                placeholder="Email address"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>

            <View style={styles.inputsContainer}>
              <Feather name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                style={styles.input}
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login button */}
            {loading ? (
              <View>
                <Loading />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            )}

            <View style={styles.noAccount}>
              <Text>Don't have an account yet?</Text>
              <TouchableOpacity onPress={redirectToSignUp}>
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
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
    padding: 10,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
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
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
