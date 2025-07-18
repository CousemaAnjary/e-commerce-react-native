import React from "react"
import { Product } from "@/types/Product"
import { Image, StyleSheet, Text, View } from "react-native"


type OrderSummaryItemProps = {
  product: Product
  quantity: number
}


const OrderSummaryItem = ({ product, quantity }: OrderSummaryItemProps) => {

  const itemTotal = product.price * quantity

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.quantity}>Qté: {quantity}</Text>
          <Text style={styles.unitPrice}>
            {product.price.toFixed(2)} € / unité
          </Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.total}>{itemTotal.toFixed(2)} €</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    marginRight: 12,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantity: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  unitPrice: {
    fontSize: 12,
    color: "#6B7280",
  },
  totalContainer: {
    alignItems: "flex-end",
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3B82F6",
  },
})

export default OrderSummaryItem
