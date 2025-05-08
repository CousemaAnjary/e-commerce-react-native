import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const banners = [
  {
    id: '1',
    title: 'Jordan Series',
    subtitle: 'Limited editions just dropped',
    image: require('@/assets/images/basket/text.png'),
    color: '#F3F4F6',
    textColor: '#111827',
    discount: '-30%',
  },
  {
    id: '2',
    title: 'Nike Air Zoom',
    subtitle: 'Boost your game',
    image:
      'https://images.pexels.com/photos/12348538/pexels-photo-12348538.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#E0F2FE',
    textColor: '#0369A1',
    discount: '-25%',
  },
  {
    id: '3',
    title: 'Adidas Harden Vol.6',
    subtitle: 'Style & speed',
    image:
      'https://images.pexels.com/photos/11244664/pexels-photo-11244664.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#FCE7F3',
    textColor: '#9D174D',
    discount: '-40%',
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
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <View style={[styles.bannerItem, { backgroundColor: item.color }]}>
            <View style={styles.bannerContent}>
              <View style={{ flex: 1 }}>
                {/* Tag promo */}
                <View style={[styles.discountTag, { backgroundColor: item.textColor }]}>
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>

                <Text style={[styles.title, { color: item.textColor }]}>
                  {item.title}
                </Text>
                <Text style={[styles.subtitle, { color: '#6B7280' }]}>
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
                  <Text style={styles.shopNowText}>Shop Now</Text>
                  <ArrowRight size={16} color="#fff" />
                </Pressable>
              </View>
              <Image source={{ uri: item.image }} style={styles.image} />
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
    alignSelf: 'center',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  discountTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 14,
  },
  shopNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 6,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 16,
    marginLeft: 12,
  },
});
