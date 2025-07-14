import { ArrowRight } from "lucide-react-native"
import React from "react"
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import Carousel from "react-native-reanimated-carousel"

const { width } = Dimensions.get("window")

const banners = [
  {
    id: "1",
    title: "Jordan Collection",
    subtitle: "Éditions limitées exclusives",
    image: {
      uri: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop&crop=center",
    },
    color: "#F8FAFC",
    textColor: "#1E293B",
    discount: "-30%",
  },
  {
    id: "2",
    title: "Tech Premium",
    subtitle: "Montres connectées & Audio",
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
    },
    color: "#EFF6FF",
    textColor: "#1D4ED8",
    discount: "-25%",
  },
  {
    id: "3",
    title: "Style Urbain",
    subtitle: "Accessoires tendance",
    image: {
      uri: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center",
    },
    color: "#FDF2F8",
    textColor: "#BE185D",
    discount: "-40%",
  },
]

export default function BannerCarousel() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={188} // Ajusté pour correspondre à la hauteur de la carte + marges
        autoPlay
        autoPlayInterval={5000}
        data={banners}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={[styles.bannerItem, { backgroundColor: item.color }]}>
            <View style={styles.bannerContent}>
              <View style={styles.textContent}>
                {/* Tag promo amélioré */}
                <View
                  style={[
                    styles.discountTag,
                    { backgroundColor: item.textColor },
                  ]}
                >
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>

                <View style={styles.textWrapper}>
                  <Text
                    style={[styles.title, { color: item.textColor }]}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.subtitle, { color: "#64748B" }]}
                    numberOfLines={2}
                  >
                    {item.subtitle}
                  </Text>

                  <Pressable
                    style={({ pressed }) => [
                      styles.shopNowButton,
                      {
                        backgroundColor: item.textColor,
                        opacity: pressed ? 0.9 : 1,
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                      },
                    ]}
                  >
                    <Text style={styles.shopNowText}>Découvrir</Text>
                    <ArrowRight size={16} color="#fff" />
                  </Pressable>
                </View>
              </View>

              {/* Image avec taille fixe */}
              <View style={styles.imageWrapper}>
                <View style={styles.imageBackground}>
                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      />

      {/* Indicateurs de pagination */}
      <View style={styles.paginationContainer}>
        {banners.map((_, index) => (
          <View key={index} style={styles.paginationDot} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  bannerItem: {
    width: width * 0.92,
    height: 180, // Hauteur fixe pour uniformité
    alignSelf: "center",
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    marginVertical: 4,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%", // Utilise toute la hauteur
  },
  textContent: {
    flex: 1,
    paddingRight: 16,
    height: "100%",
    justifyContent: "flex-start", // Alignement en haut
  },
  textWrapper: {
    flex: 1,
    justifyContent: "space-between", // Distribue le contenu
    paddingVertical: 8,
  },
  discountTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 12,
  },
  shopNowButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    marginTop: 4,
  },
  shopNowText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 6,
    letterSpacing: 0.3,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
  },
})
