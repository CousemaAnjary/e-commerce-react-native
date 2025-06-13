import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { ShoppingCart } from "lucide-react-native";

import CartItem from "@/components/shop/CartItem";
import Button from "@/components/Button";


export default function ShopScreen() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ShoppingCart size={80} color="#D1D5DB" />
        <Text style={styles.emptyTitle}>Votre panier est vide</Text>
        <Text style={styles.emptyMessage}>
          On dirait que vous n&apos;avez encore rien ajouté à votre panier.
        </Text>
        <Button
          title="Commencer vos achats"
          onPress={() => router.push("/(tabs)")}
          style={styles.emptyButton}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>Panier</Text>
        <Text
          style={styles.clearButton}
          onPress={() => {
            Alert.alert(
              "Vider le panier",
              "Voulez-vous vraiment supprimer tous les articles de votre panier ?",
              [
                { text: "Annuler", style: "cancel" },
                { text: "Vider", onPress: () => clearCart() },
              ]
            );
          }}
        >
          Tout supprimer
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
          <Text style={styles.summaryLabel}>Sous-total</Text>
          <Text style={styles.summaryValue}>
            {getCartTotal().toFixed(2)} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Livraison</Text>
          <Text style={styles.summaryValue}>0,00 €</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {getCartTotal().toFixed(2)} €
          </Text>
        </View>

        <Button
          title="Passer au paiement"
          onPress={() => Alert.alert("Paiement", "Fonction à implémenter")}
          style={styles.checkoutButton}
          fullWidth
        />
      </View>
    </View>
  );
}

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
});
