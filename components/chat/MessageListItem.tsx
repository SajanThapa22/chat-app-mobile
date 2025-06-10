import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { UserProfileData } from "@/types/user";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DocumentData } from "firebase/firestore";

interface Message {
  message: DocumentData;
  current_user: UserProfileData | null;
}

const MessageListItem: React.FC<Message> = ({ message, current_user }) => {
  const isCurrentUser = current_user?.user_id === message?.user_id;
  const sending = message?.pending;

  return (
    <>
      {isCurrentUser ? (
        <View
          style={[
            styles.container,
            { justifyContent: "flex-end", marginRight: 12 },
          ]}
        >
          <View style={{ width: wp(80) }}>
            <View style={styles.messageWrapper}>
              <View
                style={[
                  styles.messageContainer,
                  { backgroundColor: "dodgerblue", alignSelf: "flex-end" },
                ]}
              >
                <Text style={styles.messageText}>{message?.text}</Text>
              </View>
              {sending && (
                <View style={styles.loadingIndicator}>
                  <ActivityIndicator size="small" color="dodgerblue" />
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { justifyContent: "flex-start", marginLeft: 12 },
          ]}
        >
          <View style={{ width: wp(80) }}>
            <View
              style={[
                styles.messageContainer,
                { backgroundColor: "#c7c7cc", alignSelf: "flex-start" },
              ]}
            >
              <Text style={styles.messageText}>{message?.text}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default MessageListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 5,
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  messageContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 14,
  },
  messageText: {
    fontSize: hp(1.9),
    color: "#ffffff",
  },
  loadingIndicator: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
