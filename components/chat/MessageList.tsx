import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import MessageListItem from "./MessageListItem";
import { UserProfileData } from "@/types/user";
import { DocumentData } from "firebase/firestore";

interface Messages {
  messages: DocumentData[];
  current_user: UserProfileData | null;
}

const MessageList: React.FC<Messages> = ({ messages, current_user }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return (
          <MessageListItem
            key={index}
            message={message}
            current_user={current_user}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessageList;

const styles = StyleSheet.create({});
