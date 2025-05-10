import { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};