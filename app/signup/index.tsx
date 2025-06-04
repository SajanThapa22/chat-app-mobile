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
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpScreen() {
  const { register } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const userNameRef = useRef<string>("");
  const profileRef = useRef<string>("");

  const redirectToLogin = () => {
    router.push("/login" as Href);
  };

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !profileRef.current) {
      Alert.alert("Sign Up", "Please fill all the fields");
      return;
    }
    setLoading(true);

    const response = await register(
      emailRef.current,
      passwordRef.current,
      userNameRef.current,
      profileRef.current
    );

    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign Up", response.message);
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
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputsContainer}>
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (userNameRef.current = value)}
                placeholder="User name"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>

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

            <View style={styles.inputsContainer}>
              <Feather name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                placeholder="Profile url"
                placeholderTextColor="gray"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Login button */}
            {loading ? (
              <View>
                <Loading />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={styles.signUpButton}
              >
                <Text style={styles.signUpButtonText}>Sign up</Text>
              </TouchableOpacity>
            )}

            <View style={styles.accountAlready}>
              <Text>Have an account already?</Text>
              <TouchableOpacity onPress={redirectToLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    </Screen>
  );
}

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
  signUpButton: {
    borderRadius: 10,
    backgroundColor: "dodgerblue",
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  signUpButtonText: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  accountAlready: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  loginText: {
    color: "#3B82F6",
    fontWeight: "semibold",
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
