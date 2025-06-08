import { Href, Slot, useRouter, useSegments } from "expo-router";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  // });
  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  useEffect(() => {
    //check if user is authenticated or not
    if (!isAuthenticated) return;
    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      //redirect to home
      router.replace("/home" as Href);
    } else if (!isAuthenticated) {
      //redirect to login
      router.replace("/login" as Href);
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>

    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    // </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
