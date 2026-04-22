import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, StatusBar, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CATEGORIES = [
  { id: 'plumber',     name: 'Plumbing',      icon: 'water',         bg: '#E8F4FD', color: '#1A7EC8' },
  { id: 'electrician', name: 'Electrician',   icon: 'flash',         bg: '#FDF5E4', color: '#C68A1A' },
  { id: 'carpenter',   name: 'Carpentry',     icon: 'hammer',        bg: '#FDF0E8', color: '#B8531A' },
  { id: 'cleaner',     name: 'Cleaning',      icon: 'home',          bg: '#E4FDF5', color: '#0F8C6A' },
  { id: 'mechanic',    name: 'Auto Repair',   icon: 'car',           bg: '#FDE8E8', color: '#C81A1A' },
  { id: 'beautician',  name: 'Beauty',        icon: 'cut',           bg: '#F5E4FD', color: '#8C0FC8' },
  { id: 'painter',     name: 'Painting',      icon: 'color-palette', bg: '#EDE4FD', color: '#5B0FBF' },
  { id: 'gardener',    name: 'Gardening',     icon: 'leaf',          bg: '#E8FDE4', color: '#1A8C0F' },
];

const DEFAULT_LOCATION = { latitude: 9.0820, longitude: 8.6753 };

export default function ExploreTab() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategory = (cat) => {
    router.push({
      pathname: '/service-list/index',
      params: { category: JSON.stringify(cat), location: JSON.stringify(DEFAULT_LOCATION) },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F4" />
      <View style={styles.header}>
        <Text style={styles.title}>Explore Services</Text>
        <Text style={styles.subtitle}>Find the right professional for any job</Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#9A9A9A" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor="#9A9A9A"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#9A9A9A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>All Categories</Text>
        <View style={styles.categoryGrid}>
          {filtered.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => handleCategory(cat)}
              activeOpacity={0.75}
            >
              <View style={[styles.iconCircle, { backgroundColor: cat.bg }]}>
                <Ionicons name={cat.icon} size={28} color={cat.color} />
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF7F4' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#6B6B6B', marginTop: 2 },
  searchRow: { paddingHorizontal: 20, marginTop: 12, marginBottom: 4 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 12,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  grid: { paddingHorizontal: 20, paddingBottom: 32 },
  sectionLabel: {
    fontSize: 13, fontWeight: '700', color: '#9A9A9A',
    letterSpacing: 0.8, textTransform: 'uppercase',
    marginTop: 20, marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  categoryCard: {
    width: '47%', backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 20, alignItems: 'center',
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  iconCircle: {
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  catName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', textAlign: 'center' },
});
