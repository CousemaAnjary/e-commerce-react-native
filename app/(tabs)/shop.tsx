import { useCart } from "@/context/CartContext"
import { useRouter } from "expo-router"
import { Gift, Percent, ShoppingCart } from "lucide-react-native"
import React, { useCallback, useMemo, useState } from "react"
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import Button from "@/components/Button"
import CartItem from "@/components/shop/CartItem"
import PromoCodeHint from "@/components/shop/PromoCodeHint"

export default function ShopScreen() {
  const router = useRouter()
  const { items, getCartTotal, clearCart, getItemsCount } = useCart()

  // États locaux pour les fonctionnalités améliorées
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Animation pour le panier vide
  const fadeAnim = useMemo(() => new Animated.Value(0), [])

  // Codes promotionnels simulés
  const promoCodes = useMemo(
    (): Record<string, number> => ({
      WELCOME10: 0.1,
      SAVE20: 0.2,
      FIRST15: 0.15,
    }),
    []
  )

  // Calculer les totaux avec réduction
  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 5.99
  const discount = subtotal * promoDiscount
  const total = subtotal - discount + shipping

  // Gestion du refresh
  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }, [])

  // Application du code promo
  const applyPromoCode = useCallback(() => {
    const upperCode = promoCode.toUpperCase()
    if (promoCodes[upperCode]) {
      setPromoDiscount(promoCodes[upperCode])
      Alert.alert(
        "Code promo appliqué !",
        `Vous économisez ${(promoCodes[upperCode] * 100).toFixed(
          0
        )}% sur votre commande`
      )
    } else {
      Alert.alert(
        "Code invalide",
        "Ce code promotionnel n'existe pas ou a expiré"
      )
    }
  }, [promoCode, promoCodes])

  // Suppression du code promo
  const removePromoCode = useCallback(() => {
    setPromoCode("")
    setPromoDiscount(0)
  }, [])

  // Gestion du checkout
  const handleCheckout = useCallback(async () => {
    setIsCheckingOut(true)
    try {
      // Simulation d'une API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      Alert.alert(
        "Commande confirmée !",
        "Votre commande a été passée avec succès. Vous recevrez un email de confirmation.",
        [{ text: "OK", onPress: () => router.push("/(tabs)") }]
      )
      clearCart()
    } catch (error) {
      console.error("Checkout error:", error)
      Alert.alert("Erreur", "Une erreur est survenue lors du paiement")
    } finally {
      setIsCheckingOut(false)
    }
  }, [router, clearCart])

  // Animation d'entrée pour le panier vide
  React.useEffect(() => {
    if (items.length === 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start()
    }
  }, [items.length, fadeAnim])

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Animated.View style={[styles.emptyContent, { opacity: fadeAnim }]}>
          <View style={styles.emptyIconContainer}>
            <ShoppingCart size={80} />
          </View>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptyMessage}>
            Découvrez notre sélection de produits et ajoutez vos articles
            favoris à votre panier.
          </Text>
          <Button
            title="Découvrir nos produits"
            onPress={() => router.push("/(tabs)")}
            style={styles.emptyButton}
          />
        </Animated.View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* En-tête amélioré */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Panier</Text>
          <Text style={styles.itemCount}>
            {getItemsCount()} article{getItemsCount() > 1 ? "s" : ""}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            Alert.alert(
              "Vider le panier",
              "Voulez-vous vraiment supprimer tous les articles de votre panier ?",
              [
                { text: "Annuler", style: "cancel" },
                {
                  text: "Vider",
                  style: "destructive",
                  onPress: () => clearCart(),
                },
              ]
            )
          }}
          accessibilityLabel="Vider le panier"
          accessibilityHint="Supprime tous les articles du panier"
        >
          <Text style={styles.clearButtonText}>Tout supprimer</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des articles avec refresh */}
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <Animated.View
            style={[
              styles.cartItemContainer,
              {
                opacity: 1,
                transform: [
                  {
                    translateY: new Animated.Value(50).interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <CartItem product={item.product} quantity={item.quantity} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.cartItems}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
            colors={["#3B82F6"]}
          />
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />

      {/* Section code promo */}
      <View style={styles.promoSection}>
        <View style={styles.promoHeader}>
          <Gift size={20} />
          <Text style={styles.promoTitle}>Code promotionnel</Text>
        </View>

        {promoDiscount > 0 ? (
          <View style={styles.appliedPromoContainer}>
            <View style={styles.appliedPromoInfo}>
              <Percent size={16} />
              <Text style={styles.appliedPromoText}>
                {promoCode} (-{(promoDiscount * 100).toFixed(0)}%)
              </Text>
            </View>
            <TouchableOpacity onPress={removePromoCode}>
              <Text style={styles.removePromoText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.promoInputContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Entrez votre code"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
              returnKeyType="done"
              onSubmitEditing={applyPromoCode}
            />
            <TouchableOpacity
              style={[
                styles.applyPromoButton,
                !promoCode.trim() && styles.applyPromoButtonDisabled,
              ]}
              onPress={applyPromoCode}
              disabled={!promoCode.trim()}
            >
              <Text
                style={[
                  styles.applyPromoButtonText,
                  !promoCode.trim() && styles.applyPromoButtonTextDisabled,
                ]}
              >
                Appliquer
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <PromoCodeHint onCodeSelect={setPromoCode} />
      </View>

      {/* Résumé détaillé */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sous-total</Text>
          <Text style={styles.summaryValue}>{subtotal.toFixed(2)} €</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Livraison {subtotal > 50 && "(Gratuite dès 50€)"}
          </Text>
          <Text
            style={[styles.summaryValue, shipping === 0 && styles.freeShipping]}
          >
            {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}
          </Text>
        </View>

        {promoDiscount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Réduction</Text>
            <Text style={styles.discountValue}>-{discount.toFixed(2)} €</Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
        </View>

        <Button
          title={isCheckingOut ? "Traitement..." : "Passer au paiement"}
          onPress={handleCheckout}
          style={styles.checkoutButton}
          disabled={isCheckingOut}
          fullWidth
        />

        <Text style={styles.securePaymentText}>🔒 Paiement 100% sécurisé</Text>
      </View>
    </View>
  )
}

const { width } = Dimensions.get("window")

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
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
  },
  itemCount: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  clearButton: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
  },
  cartItems: {
    padding: 16,
  },
  cartItemContainer: {
    marginBottom: 8,
  },
  promoSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  promoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
  },
  promoInputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  applyPromoButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  applyPromoButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  applyPromoButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  applyPromoButtonTextDisabled: {
    color: "#9CA3AF",
  },
  appliedPromoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  appliedPromoInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  appliedPromoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#166534",
    marginLeft: 6,
  },
  removePromoText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  freeShipping: {
    color: "#10B981",
    fontWeight: "700",
  },
  discountValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#3B82F6",
  },
  checkoutButton: {
    marginTop: 20,
    paddingVertical: 16,
  },
  securePaymentText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#F9FAFB",
  },
  emptyContent: {
    alignItems: "center",
    maxWidth: width * 0.8,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyButton: {
    minWidth: 200,
    paddingVertical: 14,
  },
})
