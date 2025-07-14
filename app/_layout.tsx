import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/register"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
          </Stack>
          <StatusBar style="auto" />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
