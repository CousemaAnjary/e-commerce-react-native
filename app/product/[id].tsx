
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Produit introuvable</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push("/(tabs)/shop");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 24 }} /> {/* pour équilibrer l'espace à droite */}
      </View>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.header}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>{product.price} FMG</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Star size={18} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviews}>({product.reviews} avis)</Text>
            </View>

            <Text style={styles.description}>{product.description}</Text>

            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantité</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={decrementQuantity}
                  disabled={quantity <= 1}
                  activeOpacity={0.7}
                >
                  <Minus
                    size={20}
                    color={quantity <= 1 ? "#D1D5DB" : "#4B5563"}
                  />
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={incrementQuantity}
                  activeOpacity={0.7}
                >
                  <Plus size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Stock Status */}
            {product.inStock ? (
              <View style={styles.stockBadge}>
                <Text style={styles.stockBadgeText}>🟢 En stock</Text>
              </View>
            ) : (
              <View style={[styles.stockBadge, { backgroundColor: "#FEE2E2" }]}>
                <Text style={[styles.stockBadgeText, { color: "#B91C1C" }]}>
                  🔴 Rupture de stock
                </Text>
              </View>
            )}

            {/* Add to Cart Button */}
            <TouchableOpacity
              style={[
                styles.addToCartButton,
                !product.inStock && { backgroundColor: "#94A3B8" },
              ]}
              activeOpacity={0.8}
              disabled={!product.inStock}
              onPress={handleAddToCart}
            >
              <View style={styles.addToCartContent}>
                <ShoppingCart
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 8 }}
                />
                <Text  style={styles.addToCartText}>Ajouter au panier</Text>
               
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 400,
  },
  detailsContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFFFFF",
    marginTop: -24,
    padding: 24,
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    flex: 1,
    marginRight: 16,
  },
  price: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    color: "#1E3A8A",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4B5563",
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    paddingHorizontal: 12,
  },
  stockBadge: {
    backgroundColor: "#DCFCE7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  stockBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#15803D",
  },
  addToCartButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  goBackButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
  },
  goBackButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
