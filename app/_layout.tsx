import { Stack } from "expo-router";
import "react-native-reanimated";

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  // const { isAuthenticated } = useAuth();
  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  // });
  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  // const segments = useSegments();
  // const router = useRouter();

  // useEffect(() => {
  //   //check if user is authenticated or not
  //   if (typeof isAuthenticated === "undefined") return;
  //   const inApp = segments[0] === "(app)";

  //   if (!isAuthenticated && !inApp) {
  //     //redirect to home
  //     router.replace("/home" as Href);
  //   } else if (!isAuthenticated) {
  //     //redirect to login
  //     router.replace("/login" as Href);
  //   }
  // }, [isAuthenticated]);
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>

    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    // </ThemeProvider>
  );
}
