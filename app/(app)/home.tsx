import ChatList from "@/components/home/ChatList";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import SearchIcon from "react-native-vector-icons/MaterialIcons";
import HomeHeader from "@/components/home/HomeHeader";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { usersRef } from "@/services/firebaseConfig";
import { UserProfileData } from "@/types/user";
import NoUserFound from "@/components/home/NoUserFound";

const Home = () => {
  const { user, userProfileData, logout, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    setUsersLoading(true);
    try {
      const q = query(
        usersRef,
        where("user_id", "!=", user?.uid),
        orderBy("user_id")
      );
      const querySnapShot = await getDocs(q);
      let data: UserProfileData[] = [];
      querySnapShot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error instanceof Error) {
        Alert.alert("Fetching users", "Error getting users");
      } else {
        Alert.alert("Fetching users", "Some unknown error occurred");
      }
    } finally {
      setUsersLoading(false);
    }
  };

  const handleImagePress = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        onImagePress={handleImagePress}
        image={userProfileData?.profile_url}
      />

      <View style={styles.inputContainer}>
        <SearchIcon color="#a5a5a5" name="search" size={24} />
        <TextInput style={styles.input} placeholder="Search" />
      </View>

      {usersLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : users.length === 0 ? (
        <NoUserFound />
      ) : (
        <ChatList data={users} />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
    paddingTop: 8,
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
    height: "auto",
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#ffffff",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
