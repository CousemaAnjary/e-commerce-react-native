import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"
import { useRouter } from "expo-router"
import { Heart, Plus, Star } from "lucide-react-native"
import React, { useState } from "react"
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const newProducts = products.slice(products.length - 6)

export default function NewArrivals() {
  const router = useRouter()
  const { addItem } = useCart()
  const [favorites, setFavorites] = useState<string[]>([])

  const handlePress = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (product: any) => {
    addItem(product)
    Alert.alert(
      "Produit ajouté !",
      `${product.name} a été ajouté à votre panier`,
      [{ text: "OK" }]
    )
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`
  }

  const renderProduct = ({ item }: { item: (typeof products)[number] }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handlePress(item.id)}
    >
      {/* Badge Nouveau */}
      <View style={styles.newBadge}>
        <Text style={styles.newBadgeText}>NOUVEAU</Text>
      </View>

      {/* Bouton Favoris */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Heart
          size={18}
          fill={favorites.includes(item.id) ? "#EF4444" : "transparent"}
        />
      </TouchableOpacity>

      <Image source={item.image} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.ratingContainer}>
          <Star size={14} fill="#FACC15" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviews})</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={() => handleAddToCart(item)}
          >
            <Plus size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={newProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
    marginBottom: 4,
  },
  newBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#10B981",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 2,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 20,
    marginBottom: 8,
    height: 40,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
    marginLeft: 6,
  },
  reviewCount: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#3B82F6",
  },
  addButton: {
    backgroundColor: "#3B82F6",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
})
