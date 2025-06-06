import ChatList from "@/components/chat/ChatList";
import Screen from "@/components/shared/Screen";
import { chatListData } from "@/constants/ChatList";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchIcon from "react-native-vector-icons/MaterialIcons";

const ChatScreen = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>messenger</Text>

        {user && (
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <SearchIcon color="#a5a5a5" name="search" size={24} />
        <TextInput style={styles.input} placeholder="Search" />
      </View>

      <ChatList data={chatListData} />
    </Screen>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 14,
    paddingTop: 20,
  },
  header: {
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#006aff",
    fontSize: 26,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    backgroundColor: "#e0e0e0",
    gap: 7,
  },
  input: {
    backgroundColor: "transparent",
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    borderRadius: 10,
    backgroundColor: "dodgerblue",
    width: "auto",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#ffffff",
    textAlign: "center",
  },
});
