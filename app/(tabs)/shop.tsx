import { useCart } from "@/context/CartContext"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Alert, FlatList, StyleSheet, Text, View } from "react-native"

import CartItem from "@/components/shop/CartItem"
import { ShoppingCart } from "lucide-react-native"

export default function ShopScreen() {
  const router = useRouter()
  const { items, getCartTotal, clearCart } = useCart()

  const [isCheckingOut] = useState(false)

  // Si panier vide
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ShoppingCart size={80} color="#D1D5DB" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyMessage}>
          Looks like you haven&apos;t added anything to your cart yet.
        </Text>
        <Text style={styles.emptyButton} onPress={() => router.push("/(tabs)")}>
          Start Shopping
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text
          style={styles.clearButton}
          onPress={() => {
            Alert.alert(
              "Clear Cart",
              "Are you sure you want to remove all items from your cart?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Clear", onPress: () => clearCart() },
              ]
            )
          }}
        >
          Clear All
        </Text>
      </View>

      {/* Liste des articles */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem product={item.product} quantity={item.quantity} />
        )}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.cartItems}
        showsVerticalScrollIndicator={false}
      />

      {/* Résumé et bouton de paiement */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${getCartTotal().toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${getCartTotal().toFixed(2)}</Text>
        </View>

        <Button
          title="Checkout"
          size="large"
          loading={isCheckingOut}
          fullWidth
          style={styles.checkoutButton}
        />
      </View>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  clearButton: {
    fontSize: 14,
    color: "#EF4444",
  },
  cartItems: {
    padding: 16,
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3B82F6",
  },
  checkoutButton: {
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  emptyButton: {
    minWidth: 160,
  },
})
