import { Product } from "@/types/Product"

export const products: Product[] = [
  {
    id: "1",
    name: "Jordan Heir Series",
    description:
      "Baskets haut de gamme alliant style moderne et confort optimal, idéales pour un usage quotidien ou sportif.",
    price: 99.9,
    image: {
      uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff7-49a2-9e2b-e1aae53b0c3c/chaussure-jordan-heir-series-pour-pVVlN4.png",
    },
    category: "Chaussures",
    rating: 4.7,
    reviews: 245,
    inStock: true,
  },
  {
    id: "2",
    name: "Air Jordan 9 G",
    description:
      "Chaussures de sport inspirées du modèle classique Jordan, conçues pour la performance sur tous types de terrains.",
    price: 79.9,
    image: {
      uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5884b5b2-b1ac-4ef5-87b1-a87dda2a1e8a/chaussure-de-golf-air-jordan-9-g-pour-ZGN3PG.png",
    },
    category: "Chaussures",
    rating: 4.7,
    reviews: 178,
    inStock: true,
  },
  {
    id: "3",
    name: "Air Jordan 4 RM",
    description:
      "Modèle emblématique revisité avec une semelle amortissante et des matériaux respirants pour un confort supérieur.",
    price: 159.9,
    image: {
      uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b5b75719-5b7a-4020-99b8-b8de0e5e5e5e/chaussure-air-jordan-4-rm-pour-QzpLn1.png",
    },
    category: "Chaussures",
    rating: 4.2,
    reviews: 96,
    inStock: true,
  },
  {
    id: "4",
    name: "Air Jordan 1 Low",
    description:
      "Sneakers au design épuré avec une silhouette basse, parfaites pour un look décontracté et tendance.",
    price: 69.9,
    image: {
      uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c57a5d7-7de0-492f-b87b-2e10d2db8c31/chaussure-air-jordan-1-low-pour-LGPmnS.png",
    },
    category: "Chaussures",
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: "5",
    name: "Montre Connectée Pro",
    description:
      "Montre intelligente avec GPS, moniteur cardiaque et étanchéité 50m. Parfaite pour le sport et le quotidien.",
    price: 249.9,
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
    },
    category: "Électronique",
    rating: 4.6,
    reviews: 312,
    inStock: true,
  },
  {
    id: "6",
    name: "Sac à Dos Premium",
    description:
      "Sac à dos en cuir véritable avec compartiment laptop 15 pouces et design minimaliste et élégant.",
    price: 89.9,
    image: {
      uri: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center",
    },
    category: "Accessoires",
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: "7",
    name: "Casque Audio Bluetooth",
    description:
      "Casque sans fil à réduction de bruit active, autonomie 30h et qualité audio studio professionnelle.",
    price: 129.9,
    image: {
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center",
    },
    category: "Électronique",
    rating: 4.8,
    reviews: 189,
    inStock: true,
  },
  {
    id: "8",
    name: "Lunettes de Soleil Pilot",
    description:
      "Lunettes de soleil style aviateur avec verres polarisés UV400 et monture en métal léger et résistant.",
    price: 49.9,
    image: {
      uri: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop&crop=center",
    },
    category: "Accessoires",
    rating: 4.3,
    reviews: 94,
    inStock: true,
  },
  {
    id: "9",
    name: "T-Shirt Premium Coton",
    description:
      "T-shirt en coton bio premium, coupe moderne et couleurs durables. Confort optimal pour tous les jours.",
    price: 29.9,
    image: {
      uri: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center",
    },
    category: "Vêtements",
    rating: 4.4,
    reviews: 67,
    inStock: true,
  },
  {
    id: "10",
    name: "Parfum Homme Élégance",
    description:
      "Fragrance masculine sophistiquée aux notes boisées et épicées. Tenue longue durée 8-10 heures.",
    price: 79.9,
    image: {
      uri: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&crop=center",
    },
    category: "Beauté",
    rating: 4.7,
    reviews: 203,
    inStock: true,
  },
  {
    id: "11",
    name: "Clavier Mécanique RGB",
    description:
      "Clavier gaming mécanique avec switches Cherry MX, rétroéclairage RGB personnalisable et repose-poignet.",
    price: 119.9,
    image: {
      uri: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop&crop=center",
    },
    category: "Électronique",
    rating: 4.6,
    reviews: 145,
    inStock: true,
  },
  {
    id: "12",
    name: "Portefeuille Cuir Italien",
    description:
      "Portefeuille en cuir italien véritable, design minimaliste avec protection RFID et finitions artisanales.",
    price: 59.9,
    image: {
      uri: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop&crop=center",
    },
    category: "Accessoires",
    rating: 4.5,
    reviews: 89,
    inStock: true,
  },
]

export const getProductById = (productId: string): Product | undefined => {
  return products.find((product) => product.id === productId)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category)
}

export const getNewArrivals = (count: number = 6): Product[] => {
  return products.slice(products.length - count)
}

export const getFeaturedProducts = (count: number = 4): Product[] => {
  return products.filter((product) => product.rating >= 4.5).slice(0, count)
}

export const getAvailableProducts = (): Product[] => {
  return products.filter((product) => product.inStock)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  )
}

export const getCategories = (): string[] => {
  return [...new Set(products.map((product) => product.category))]
}

export const getTopRatedProducts = (count: number = 5): Product[] => {
  return products.sort((a, b) => b.rating - a.rating).slice(0, count)
}
