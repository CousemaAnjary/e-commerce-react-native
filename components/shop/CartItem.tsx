import { useCart } from "@/context/CartContext"
import { Product } from "@/types/Product"
import { Minus, Plus, Trash2 } from "lucide-react-native"
import React from "react"
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

type CartItemProps = {
  product: Product
  quantity: number
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart()

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1)
    } else {
      removeItem(product.id)
    }
  }

  const handleRemove = () => {
    Alert.alert(
      "Supprimer l'article",
      `Voulez-vous vraiment supprimer "${product.name}" de votre panier ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => removeItem(product.id),
        },
      ]
    )
  }

  // Calculer le prix total pour cet article
  const itemTotal = product.price * quantity

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{product.price.toFixed(2)} €</Text>
          {quantity > 1 && (
            <Text style={styles.itemTotal}>
              Total: {itemTotal.toFixed(2)} €
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity === 1 && styles.quantityButtonDisabled,
              ]}
              onPress={handleDecrease}
              activeOpacity={0.7}
              accessibilityLabel={`Diminuer la quantité de ${product.name}`}
              accessibilityHint={
                quantity === 1
                  ? "Supprimera l'article du panier"
                  : "Diminue la quantité de 1"
              }
            >
              <Minus size={18} />
            </TouchableOpacity>

            <Text
              style={styles.quantity}
              accessibilityLabel={`Quantité: ${quantity}`}
            >
              {quantity}
            </Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrease}
              activeOpacity={0.7}
              accessibilityLabel={`Augmenter la quantité de ${product.name}`}
              accessibilityHint="Augmente la quantité de 1"
            >
              <Plus size={18} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemove}
            activeOpacity={0.7}
            accessibilityLabel={`Supprimer ${product.name} du panier`}
            accessibilityHint="Supprime complètement cet article du panier"
          >
            <Trash2 size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#F8FAFC",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
    lineHeight: 22,
  },
  priceContainer: {
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3B82F6",
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityButtonDisabled: {
    backgroundColor: "#F8FAFC",
    opacity: 0.6,
  },
  quantity: {
    minWidth: 32,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginHorizontal: 8,
  },
  removeButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
})

export default CartItem
