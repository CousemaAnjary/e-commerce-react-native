import { Product } from "@/types/Product";

export const products = [
  {
    id: "1",
    name: "Jordan Heir Series",
    description: "Baskets haut de gamme alliant style moderne et confort optimal, idéales pour un usage quotidien ou sportif.",
    price: 129.99,
    image: require("@/assets/images/basket/4.avif"),
    category: "Électronique",
    rating: 4.7,
    reviews: 245,
    inStock: true
  },
  {
    id: "2",
    name: "Air Jordan 9 G",
    description: "Chaussures de sport inspirées du modèle classique Jordan, conçues pour la performance sur tous types de terrains.",
    price: 89.99,
    image: require("@/assets/images/basket/5.avif"),
    category: "Électronique",
    rating: 4.7,
    reviews: 178,
    inStock: false
  },
  {
    id: "3",
    name: "Air Jordan 4 RM",
    description: "Modèle emblématique revisité avec une semelle amortissante et des matériaux respirants pour un confort supérieur.",
    price: 899.99,
    image: require("@/assets/images/basket/6.avif"),
    category: "Électronique",
    rating: 4.2,
    reviews: 96,
    inStock: false
  },
  {
    id: "4",
    name: "Air Jordan 1 Low",
    description: "Sneakers au design épuré avec une silhouette basse, parfaites pour un look décontracté et tendance.",
    price: 79.99,
    image: require("@/assets/images/basket/7.avif"),
    category: "Électronique",
    rating: 4.8,
    reviews: 156,
    inStock: false
  },
];

export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};
