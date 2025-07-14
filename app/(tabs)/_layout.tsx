import { useCart } from "@/context/CartContext"
import { Tabs } from "expo-router"
import { CircleUserRound, Home, ShoppingCart } from "lucide-react-native"
import { StyleSheet, Text, View } from "react-native"

export default function TabLayout() {
  const { items } = useCart()

  // Calculer le nombre total d'articles dans le panier
  const totalItemsCount = items.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  )

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <Home color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <ShoppingCart color={color} size={size} />
              {totalItemsCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItemsCount > 99 ? "99+" : totalItemsCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <CircleUserRound color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 63,
    borderRadius: 42,
    backgroundColor: "#0F172A",
    paddingTop: 12,
    marginHorizontal: 20,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -8,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: "#0F172A",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 14,
  },
})
