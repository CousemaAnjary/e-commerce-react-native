import { useCart } from "@/context/CartContext"
import { getProductById } from "@/data/products"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react-native"
import React, { useState } from "react"
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ProductScreen() {
  const router = useRouter()
  const { addItem } = useCart()
  const params = useLocalSearchParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedSize, setSelectedSize] = useState("M")
  const fadeAnim = useState(new Animated.Value(0))[0]

  const product = getProductById(id)

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`
  }

  const sizes = ["S", "M", "L", "XL"]
  const features = [
    {
      icon: <Truck size={20} />,
      title: "Livraison gratuite",
      subtitle: "Dès 50€",
    },
    {
      icon: <Shield size={20} />,
      title: "Garantie 2 ans",
      subtitle: "SAV inclus",
    },
    {
      icon: <RotateCcw size={20} />,
      title: "Retour gratuit",
      subtitle: "30 jours",
    },
  ]

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
    )
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    Alert.alert(
      "✅ Produit ajouté !",
      `${product.name} (${quantity}x) a été ajouté à votre panier`,
      [
        { text: "Continuer", style: "cancel" },
        { text: "Voir le panier", onPress: () => router.push("/(tabs)/shop") },
      ]
    )
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    Alert.alert(
      isFavorite ? "💔 Retiré des favoris" : "❤️ Ajouté aux favoris",
      `${product.name} ${isFavorite ? "retiré de" : "ajouté à"} vos favoris`
    )
  }

  const handleShare = () => {
    Alert.alert("Partager", `Partager ${product.name} avec vos amis !`)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header amélioré */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du produit</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={toggleFavorite}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Heart size={22} fill={isFavorite ? "#EF4444" : "transparent"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Share2 size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Image du produit */}
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Badge catégorie */}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>

          {/* Contenu des détails */}
          <View style={styles.detailsContainer}>
            {/* En-tête produit */}
            <View style={styles.productHeader}>
              <View style={styles.titleSection}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} fill="#FACC15" />
                  <Text style={styles.rating}>{product.rating}</Text>
                  <Text style={styles.reviews}>({product.reviews} avis)</Text>
                </View>
              </View>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
            </View>

            {/* Sélecteur de taille (pour les vêtements/chaussures) */}
            {(product.category === "Chaussures" ||
              product.category === "Vêtements") && (
              <View style={styles.sizeSection}>
                <Text style={styles.sectionTitle}>Taille</Text>
                <View style={styles.sizeOptions}>
                  {sizes.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sizeOption,
                        selectedSize === size && styles.selectedSizeOption,
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          selectedSize === size && styles.selectedSizeText,
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            {/* Fonctionnalités/Services */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>Services inclus</Text>
              <View style={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureCard}>
                    <View style={styles.featureIcon}>{feature.icon}</View>
                    <View style={styles.featureContent}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureSubtitle}>
                        {feature.subtitle}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Sélecteur de quantité */}
            <View style={styles.quantitySection}>
              <Text style={styles.sectionTitle}>Quantité</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    quantity <= 1 && styles.disabledButton,
                  ]}
                  onPress={decrementQuantity}
                  disabled={quantity <= 1}
                  activeOpacity={0.7}
                >
                  <Minus
                    size={20}
                    color={quantity <= 1 ? "#D1D5DB" : "#FFFFFF"}
                  />
                </TouchableOpacity>
                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={incrementQuantity}
                  activeOpacity={0.7}
                >
                  <Plus size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Statut du stock */}
            <View style={styles.stockSection}>
              {product.inStock ? (
                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>
                    ✅ En stock - Livraison rapide
                  </Text>
                </View>
              ) : (
                <View style={[styles.stockBadge, styles.outOfStockBadge]}>
                  <Text style={[styles.stockText, styles.outOfStockText]}>
                    ❌ Temporairement indisponible
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bouton d'ajout au panier fixe */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !product.inStock && styles.disabledAddButton,
          ]}
          activeOpacity={0.8}
          disabled={!product.inStock}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>
            {product.inStock ? "Ajouter au panier" : "Indisponible"}
          </Text>
          <Text style={styles.totalPrice}>
            {formatPrice(product.price * quantity)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },

  // Main content
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    backgroundColor: "#F8FAFC",
  },
  image: {
    width: "100%",
    height: 400,
  },
  categoryBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Details container
  detailsContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFFFFF",
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
  },

  // Product header
  productHeader: {
    marginBottom: 24,
  },
  titleSection: {
    marginBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E293B",
    lineHeight: 32,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginLeft: 6,
  },
  reviews: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3B82F6",
  },

  // Size section
  sizeSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  sizeOptions: {
    flexDirection: "row",
    gap: 12,
  },
  sizeOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  selectedSizeOption: {
    borderColor: "#3B82F6",
    backgroundColor: "#3B82F6",
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
  },
  selectedSizeText: {
    color: "#FFFFFF",
  },

  // Description
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#64748B",
  },

  // Features
  featuresSection: {
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },

  // Quantity
  quantitySection: {
    marginBottom: 24,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#E2E8F0",
  },
  quantityDisplay: {
    paddingHorizontal: 20,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },

  // Stock
  stockSection: {
    marginBottom: 24,
  },
  stockBadge: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  outOfStockBadge: {
    backgroundColor: "#FEF2F2",
  },
  stockText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#166534",
  },
  outOfStockText: {
    color: "#DC2626",
  },

  // Bottom section
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  disabledAddButton: {
    backgroundColor: "#9CA3AF",
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  // Not found
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#F9FAFB",
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})
