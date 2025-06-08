import { Href, Slot, useRouter, useSegments } from "expo-router";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isNavigationReady || isAuthenticated === undefined) return;

    const inApp = segments[0] === "(app)";
    const inAuth = segments[0] === "(auth)";

    const navigate = () => {
      if (isAuthenticated && !inApp) {
        router.replace("/home" as Href);
      } else if (!isAuthenticated && !inAuth) {
        router.replace("/(auth)/login" as Href);
      }
    };

    const timeoutId = setTimeout(navigate, 0);
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, isNavigationReady, segments]);

  return (
    <>
      <Slot />
    </>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
