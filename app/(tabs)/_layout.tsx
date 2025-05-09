import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Home, CircleUserRound, ShoppingCart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarInactiveTintColor: '#ffffff',
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
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 63,
    borderRadius: 42,
    backgroundColor: '#0F172A',
    paddingTop: 12,
    marginHorizontal: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
