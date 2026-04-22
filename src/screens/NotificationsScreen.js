import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getUserNotifications } from '../services/apiService';

const TYPE_CONFIG = {
  booking_confirmation: { icon: 'checkmark-circle', color: '#22C55E', bg: '#DCFCE7' },
  booking_reminder:     { icon: 'alarm',            color: '#F59E0B', bg: '#FEF3C7' },
  booking_update:       { icon: 'refresh-circle',   color: '#3B82F6', bg: '#DBEAFE' },
  service_rating:       { icon: 'star',             color: '#E8A838', bg: '#FDF5E4' },
  promo:                { icon: 'pricetag',          color: '#8C0FC8', bg: '#F5E4FD' },
};
const DEFAULT_TYPE = { icon: 'notifications', color: '#6B6B6B', bg: '#F0EBE3' };

function formatTime(timestamp) {
  try {
    const diff = (Date.now() - new Date(timestamp)) / 1000;
    if (diff < 60)   return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 172800) return 'Yesterday';
    return new Date(timestamp).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
  } catch { return ''; }
}

function NotifCard({ item, onPress }) {
  const cfg = TYPE_CONFIG[item.type] ?? DEFAULT_TYPE;
  return (
    <TouchableOpacity
      style={[nCard.wrap, !item.read && nCard.unread]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {!item.read && <View style={nCard.unreadBar} />}
      <View style={[nCard.icon, { backgroundColor: cfg.bg }]}>
        <Ionicons name={cfg.icon} size={22} color={cfg.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={nCard.title} numberOfLines={1}>{item.title}</Text>
        <Text style={nCard.msg} numberOfLines={2}>{item.message}</Text>
        <Text style={nCard.time}>{formatTime(item.time)}</Text>
      </View>
      {!item.read && <View style={[nCard.dot, { backgroundColor: cfg.color }]} />}
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const router  = useRouter();
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getUserNotifications();
      setItems(data ?? []);
      setError(null);
    } catch {
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const markRead = (id) =>
    setItems(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  const markAllRead = () =>
    setItems(ns => ns.map(n => ({ ...n, read: true })));

  const handlePress = (item) => {
    markRead(item.id);
    switch (item.type) {
      case 'booking_confirmation':
      case 'booking_reminder':
      case 'booking_update':
        router.push('/booking-history'); break;
      case 'service_rating':
        router.push({ pathname: '/service-details', params: { serviceId: item.serviceId } }); break;
      case 'promo':
        router.push('/(tabs)/explore'); break;
    }
  };

  const unreadCount = items.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F4" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.subtitle}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1B4D3E" />
          <Text style={styles.centerText}>Loading…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.centerText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchNotifications}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="notifications-off-outline" size={64} color="#E8E0D5" />
          <Text style={styles.emptyTitle}>All caught up</Text>
          <Text style={styles.emptySubtitle}>No notifications yet. We'll let you know when something happens.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NotifCard item={item} onPress={() => handlePress(item)} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#FAF7F4' },
  header: {
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16,
  },
  title:    { fontSize: 26, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#C8553D', fontWeight: '600', marginTop: 2 },
  markAllBtn: {
    backgroundColor: '#F0F7F4', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  markAllText: { fontSize: 13, color: '#1B4D3E', fontWeight: '700' },

  list:  { paddingHorizontal: 20, paddingBottom: 32, gap: 10 },
  center:{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  centerText: { fontSize: 14, color: '#6B6B6B', marginTop: 12, textAlign: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#6B6B6B', marginTop: 6, textAlign: 'center', lineHeight: 20 },
  retryBtn: { marginTop: 16, backgroundColor: '#1B4D3E', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 11 },
  retryText:{ color: '#FFFFFF', fontWeight: '700' },
});

const nCard = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
    position: 'relative', overflow: 'hidden',
  },
  unread:    { backgroundColor: '#F0F7F4' },
  unreadBar: {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    width: 3, backgroundColor: '#1B4D3E', borderRadius: 2,
  },
  icon:   { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  title:  { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 2 },
  msg:    { fontSize: 13, color: '#6B6B6B', lineHeight: 18, marginBottom: 4 },
  time:   { fontSize: 11, color: '#9A9A9A', fontWeight: '500' },
  dot:    { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
});
