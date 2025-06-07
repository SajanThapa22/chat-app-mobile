import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import {
  Entypo,
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { UserProfileData } from "@/types/user";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  router: ReturnType<typeof useRouter>;
  user: UserProfileData;
}

export default function ChatRoomHeader({ router, user }: Props) {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" color="dodgerblue" size={hp(4)} />
            </TouchableOpacity>

            <View style={styles.userContainer}>
              <Image
                style={styles.userImage}
                source={{ uri: user.profile_url }}
              />
              <Text style={styles.userName}>{user.user_name}</Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Ionicons name="call" size={hp(2.8)} color="dodgerblue" />
            <FontAwesome6 name="video" size={hp(2.8)} color="dodgerblue" />
            <MaterialCommunityIcons
              name="dots-vertical"
              size={hp(2.8)}
              color="gray"
            />
          </View>
        ),
        headerBackButtonMenuEnabled: false,
      }}
    ></Stack.Screen>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    width: "100%",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  userImage: {
    height: hp(5.4),
    borderRadius: 50,
    aspectRatio: 1,
  },
  userName: {
    textTransform: "capitalize",
    fontSize: hp(2.3),
    color: " #4a4a4a",
  },
});
