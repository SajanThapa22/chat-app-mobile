import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: ReactNode;
}

const ios = Platform.OS === "ios";

const CustomKeyboardView: React.FC<Props> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={ios ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.innerContainer}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CustomKeyboardView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start", // or "space-between" if you're using header/footer
  },
});
