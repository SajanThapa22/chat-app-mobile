import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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

const SignUpScreen = () => {
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/chat" as Href);
    }
  }, [authLoading, isAuthenticated]);

  const redirectToLogin = () => {
    router.push("/login" as Href);
  };

  const handleRegister = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !profileUrl.trim() ||
      !userName.trim()
    ) {
      Alert.alert("Sign Up", "Please fill all the fields");
      return;
    }
    setLoading(true);

    const response = await register(email, password, userName, profileUrl);

    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign Up", response.message);
      return;
    } else {
      router.replace("/login" as Href);
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
                value={userName}
                onChangeText={setUserName}
                placeholder="User name"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>

            <View style={styles.inputsContainer}>
              <Feather name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>

            <View style={styles.inputsContainer}>
              <Feather name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={!passwordVisible}
                style={styles.input}
              />

              {password.trim() !== "" && (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Feather
                    name={passwordVisible ? "eye" : "eye-off"}
                    size={hp(2.3)}
                    color="gray"
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputsContainer}>
              <Feather name="image" size={hp(2.7)} color="gray" />
              <TextInput
                value={profileUrl}
                onChangeText={setProfileUrl}
                placeholder="Profile url"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>

            {/* Login button */}
            {loading ? (
              <View style={styles.loadingContainer}>
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
};

export default SignUpScreen;

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
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "dodgerblue",
    width: "100%",
    padding: 5,
    marginTop: 10,
  },
});
