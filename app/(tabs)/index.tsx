import BannerCarousel from "@/components/home/BannerCarousel"
import SearchHeader from "@/components/home/Header"
import NewArrivals from "@/components/home/NewArrivals"
import { ChevronRight, Heart, Shield, Star, Truck } from "lucide-react-native"
import React, { useRef, useState } from "react"
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Montre Élégante",
      price: 99.9,
      originalPrice: 139.9,
      image: {
        uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
      },
      rating: 4.8,
      discount: "29%",
    },
    {
      id: 2,
      name: "Sac Premium",
      price: 69.9,
      originalPrice: 89.9,
      image: {
        uri: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center",
      },
      rating: 4.6,
      discount: "22%",
    },
    {
      id: 3,
      name: "Chaussures Sport",
      price: 149.9,
      originalPrice: 199.9,
      image: {
        uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff7-49a2-9e2b-e1aae53b0c3c/chaussure-jordan-heir-series-pour-pVVlN4.png",
      },
      rating: 4.9,
      discount: "25%",
    },
  ])

  const features = [
    {
      icon: <Truck size={24} color="#FFFFFF" />,
      title: "Livraison gratuite",
      subtitle: "Dès 50€ d'achat",
    },
    {
      icon: <Shield size={24} color="#FFFFFF" />,
      title: "Paiement sécurisé",
      subtitle: "100% sécurisé",
    },
    {
      icon: <Heart size={24} color="#FFFFFF" />,
      title: "Service client",
      subtitle: "7j/7 disponible",
    },
  ]

  const fadeAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BannerCarousel />

        {/* Section caractéristiques */}
        <Animated.View style={[styles.featuresSection, { opacity: fadeAnim }]}>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>{feature.icon}</View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Section produits en vedette */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Offres spéciales</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir tout</Text>
              <ChevronRight size={16} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {featuredProducts.map((item, index) => (
              <View key={item.id} style={styles.featuredCardWrapper}>
                <TouchableOpacity style={styles.featuredCard}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{item.discount}</Text>
                  </View>
                  <Image source={item.image} style={styles.featuredImage} />
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Star size={12} />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>{item.price}€</Text>
                      <Text style={styles.originalPrice}>
                        {item.originalPrice}€
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {index < featuredProducts.length - 1 && (
                  <View style={styles.itemSeparator} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Section nouveautés améliorée */}
        <View style={styles.newArrivalsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nouveautés</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir tout</Text>
              <ChevronRight size={16} />
            </TouchableOpacity>
          </View>
          <NewArrivals />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  // Section caractéristiques
  featuresSection: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  featureCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 11,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 16,
  },
  // Section produits en vedette
  featuredSection: {
    marginBottom: 32,
  },
  featuredList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  featuredCardWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredCard: {
    width: 170,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  itemSeparator: {
    width: 12,
  },
  discountBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#EF4444",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    zIndex: 1,
  },
  discountText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  featuredImage: {
    width: "100%",
    height: 130,
    borderRadius: 16,
    marginBottom: 12,
    resizeMode: "cover",
  },
  featuredContent: {
    flex: 1,
  },
  featuredName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 13,
    color: "#64748B",
    marginLeft: 6,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#3B82F6",
  },
  originalPrice: {
    fontSize: 13,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
    fontWeight: "500",
  },
  // Section nouveautés
  newArrivalsSection: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3B82F6",
    marginRight: 6,
  },
})
