import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const banners = [
  {
    id: '1',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off',
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: '#FFEDD5',
    textColor: '#7C2D12',
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Check out the latest',
    image:
      'https://images.pexels.com/photos/5624977/pexels-photo-5624977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: '#DBEAFE',
    textColor: '#1E3A8A',
  },
  {
    id: '3',
    title: 'Flash Deals',
    subtitle: 'Limited time offers',
    image:
      'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: '#DCFCE7',
    textColor: '#14532D',
  },
];

export default function BannerCarousel() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={190}
        autoPlay
        autoPlayInterval={4000}
        data={banners}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <View style={[styles.bannerItem, { backgroundColor: item.color }]}>
            <View style={styles.bannerContent}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: item.textColor }]}>{item.title}</Text>
                <Text style={[styles.subtitle, { color: item.textColor }]}>{item.subtitle}</Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.shopNowButton,
                    { backgroundColor: item.textColor, opacity: pressed ? 0.9 : 1 },
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
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 12,
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
    borderRadius: 12,
    marginLeft: 12,
  },
});
