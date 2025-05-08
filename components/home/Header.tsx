import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, ShoppingCart, Search } from 'lucide-react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      {/* Zone de recherche */}
      <View style={styles.searchBar}>
        <Search size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Rechercher des produits"
          placeholderTextColor="#9CA2AF"
          style={styles.searchInput}
        />
      </View>

      {/* Boutons actions */}
      <TouchableOpacity style={styles.iconButton}>
        <Bell size={20} color="#1F2937" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <ShoppingCart size={20} color="#1F2937" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontFamily: 'Inter-Regular',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});
