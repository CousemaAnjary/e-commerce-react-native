import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import { products } from '@/data/products';



const newProducts = products.slice(products.length - 4);

export default function NewArrivals() {
  const renderProduct = ({ item }: { item: typeof products[number] }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image } style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FACC15" fill="#FACC15" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
        </View>
        <Text style={styles.price}>{item.price} FMG</Text>
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
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    height: 35,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1E293B',
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 2,
  },
  price: {
    fontFamily: 'Inter-Bold', 
    fontSize: 12,    
    color: '#1E3A8A', 
  },
  
});