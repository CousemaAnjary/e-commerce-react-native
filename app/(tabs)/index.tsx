import BannerCarousel from "@/components/home/BannerCarousel";
import SearchHeader from "@/components/home/Header";
import NewArrivals from "@/components/home/NewArrivals";
import { ChevronRight } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <SearchHeader />
      {/* le reste de ta page */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BannerCarousel />

        <View style={styles.newArrivalsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nouveautés</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir tout</Text>
              <ChevronRight size={16} color="#1E3A8A" />
            </TouchableOpacity>
          </View>
          <NewArrivals />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  newArrivalsSection: {
  
    marginBottom: 65,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#1E293B",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#1E3A8A",
    marginRight: 4,
  },
});
