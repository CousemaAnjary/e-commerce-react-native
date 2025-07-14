import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"

// Prévenir l'auto-masquage du splash screen
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded || error) {
      // Masquer le splash screen une fois que les fonts sont chargées
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    // Garder le splash screen pendant le chargement des fonts
    return null
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right", // Animation plus rapide
              animationDuration: 200, // Réduire le temps d'animation
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/login"
              options={{
                headerShown: false,
                presentation: "modal", // Modal plus rapide pour l'auth
              }}
            />
            <Stack.Screen
              name="auth/register"
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />
            <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
          </Stack>
          <StatusBar style="auto" />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
