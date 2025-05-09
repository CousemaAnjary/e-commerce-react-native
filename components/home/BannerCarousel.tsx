import { ArrowRight } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    title: "Jordan Series",
    subtitle: "Éditions limitées",
    image: require("@/assets/images/basket/1.png"),
    color: "#F3F4F6",
    textColor: "#111827",
    discount: "-30%",
  },
  {
    id: "2",
    title: "Nike Air Zoom",
    subtitle: "Boostez votre jeu",
    image: require("@/assets/images/basket/3.png"),
    color: "#E0F2FE",
    textColor: "#0369A1",
    discount: "-25%",
  },
  {
    id: "3",
    title: "Adidas Harden",
    subtitle: "Style et rapidité",
    image: require("@/assets/images/basket/2.png"),
    color: "#FCE7F3",
    textColor: "#9D174D",
    discount: "-40%",
  },
];

export default function BannerCarousel() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay
        autoPlayInterval={4000}
        data={banners}
        mode="parallax"
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <View style={[styles.bannerItem, { backgroundColor: item.color }]}>
            <View style={styles.bannerContent}>
              <View >
                {/* Tag promo */}
                <View
                  style={[
                    styles.discountTag,
                    { backgroundColor: item.textColor },
                  ]}
                >
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>

                <Text style={[styles.title, { color: item.textColor }]}>
                  {item.title}
                </Text>
                <Text style={[styles.subtitle, { color: "#6B7280" }]}>
                  {item.subtitle}
                </Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.shopNowButton,
                    {
                      backgroundColor: item.textColor,
                      opacity: pressed ? 0.9 : 1,
                    },
                  ]}
                >
                  <Text style={styles.shopNowText}>Acheter maintenant</Text>
                  <ArrowRight size={16} color="#fff" />
                </Pressable>
              </View>

              {/* Image correctement stylée */}
              <View style={styles.imageWrapper}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>

    

    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  bannerItem: {
    width: width * 0.9,
    alignSelf: "center",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  discountTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginBottom: 14,
  },
  shopNowButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  shopNowText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#FFFFFF",
    marginRight: 6,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    marginLeft: 12,
    marginRight: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "124%",
    height: "100%",
  },
});
