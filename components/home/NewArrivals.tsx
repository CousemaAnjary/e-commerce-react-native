import { products } from "@/data/products";
import { useRouter } from "expo-router";
import { ShoppingCart, Star } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const newProducts = products.slice(products.length - 4);

export default function NewArrivals() {
  const router = useRouter();

  const handlePress = (productId: number) => {
    router.push(`/product/${productId}`);
  };





  const renderProduct = ({ item }: { item: (typeof products)[number] }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handlePress(Number(item.id))}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FACC15" fill="#FACC15" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviews})</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{item.price} FMG</Text>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
            <ShoppingCart size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

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
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#1E293B",
    height: 35,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  ratingText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#1E293B",
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#64748B",
    marginLeft: 2,
  },
  price: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    color: "#1E3A8A",
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  
  addButton: {
    backgroundColor: "#1E3A8A",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
