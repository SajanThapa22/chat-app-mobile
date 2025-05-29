import React, { ReactNode } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

interface Props {
  children: ReactNode;
}

const Screen: React.FC<Props> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
