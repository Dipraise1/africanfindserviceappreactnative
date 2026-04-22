import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, StatusBar, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getUserBookings } from '../services/apiService';

const STATUS_CONFIG = {
  confirmed:  { color: '#22C55E', bg: '#DCFCE7', label: 'Confirmed' },
  pending:    { color: '#F59E0B', bg: '#FEF3C7', label: 'Pending'   },
  cancelled:  { color: '#EF4444', bg: '#FEE2E2', label: 'Cancelled' },
  completed:  { color: '#3B82F6', bg: '#DBEAFE', label: 'Completed' },
};

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function BookingCard({ item, onCancel }) {
  const isUpcoming = new Date(item.date) >= new Date();
  const status     = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.pending;
  const router     = useRouter();

  return (
    <View style={bCard.wrap}>
      {/* Top row */}
      <View style={bCard.topRow}>
        <View style={bCard.serviceInfo}>
          {item.serviceImage
            ? <Image source={{ uri: item.serviceImage }} style={bCard.avatar} />
            : <View style={[bCard.avatar, bCard.avatarPlaceholder]}>
                <Ionicons name="construct-outline" size={20} color="#9A9A9A" />
              </View>
          }
          <View style={{ flex: 1 }}>
            <Text style={bCard.serviceName} numberOfLines={1}>{item.serviceName}</Text>
            <Text style={bCard.providerName} numberOfLines={1}>{item.providerName}</Text>
          </View>
        </View>
        <View style={[bCard.badge, { backgroundColor: status.bg }]}>
          <Text style={[bCard.badgeText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      {/* Details */}
      <View style={bCard.details}>
        <View style={bCard.detailRow}>
          <Ionicons name="calendar-outline" size={14} color="#6B6B6B" />
          <Text style={bCard.detailText}>{formatDate(item.date)}</Text>
        </View>
        <View style={bCard.detailRow}>
          <Ionicons name="time-outline" size={14} color="#6B6B6B" />
          <Text style={bCard.detailText}>{item.time || '—'}</Text>
        </View>
        <View style={bCard.detailRow}>
          <Ionicons name="location-outline" size={14} color="#6B6B6B" />
          <Text style={bCard.detailText} numberOfLines={1}>{item.location || '—'}</Text>
        </View>
      </View>

      {/* Ref */}
      <Text style={bCard.ref}>Ref: {item.reference}</Text>

      {/* Actions */}
      {isUpcoming && item.status !== 'cancelled' && (
        <View style={bCard.actions}>
          <TouchableOpacity
            style={bCard.btnReschedule}
            onPress={() => router.push({ pathname: '/booking', params: { serviceId: item.serviceId } })}
          >
            <Ionicons name="calendar-outline" size={14} color="#1B4D3E" />
            <Text style={bCard.btnRescheduleText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={bCard.btnCancel} onPress={() => onCancel(item.id)}>
            <Text style={bCard.btnCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isUpcoming && item.status === 'completed' && !item.isRated && (
        <TouchableOpacity style={bCard.btnRate}>
          <Ionicons name="star-outline" size={14} color="#E8A838" />
          <Text style={bCard.btnRateText}>Rate this service</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function BookingHistoryScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [tab, setTab]           = useState('upcoming');

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getUserBookings();
      setBookings(data ?? []);
      setError(null);
    } catch {
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (id) => {
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const upcoming = bookings.filter(b => new Date(b.date) >= new Date());
  const past     = bookings.filter(b => new Date(b.date) <  new Date());
  const visible  = tab === 'upcoming' ? upcoming : past;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F4" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={fetchBookings}
        >
          <Ionicons name="refresh-outline" size={20} color="#1B4D3E" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {[
          { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
          { key: 'past',     label: `Past (${past.length})`         },
        ].map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1B4D3E" />
          <Text style={styles.centerText}>Loading bookings…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.centerText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchBookings}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : visible.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="calendar-outline" size={64} color="#E8E0D5" />
          <Text style={styles.emptyTitle}>
            {tab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {tab === 'upcoming' ? 'Book a service to get started.' : 'Your completed bookings will show here.'}
          </Text>
          {tab === 'upcoming' && (
            <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.exploreBtnText}>Explore Services</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <BookingCard item={item} onCancel={handleCancel} />}
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  title:      { fontSize: 26, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.5 },
  refreshBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },

  tabBar: {
    flexDirection: 'row', marginHorizontal: 20,
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 4,
    marginBottom: 16,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
  },
  tab:          { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive:    { backgroundColor: '#1B4D3E' },
  tabText:      { fontSize: 13, fontWeight: '600', color: '#9A9A9A' },
  tabTextActive:{ color: '#FFFFFF' },

  list: { paddingHorizontal: 20, paddingBottom: 32, gap: 14 },

  center:       { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  centerText:   { fontSize: 14, color: '#6B6B6B', marginTop: 12, textAlign: 'center' },
  emptyTitle:   { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginTop: 16, textAlign: 'center' },
  emptySubtitle:{ fontSize: 14, color: '#6B6B6B', marginTop: 6, textAlign: 'center', lineHeight: 20 },
  retryBtn:     { marginTop: 16, backgroundColor: '#1B4D3E', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 11 },
  retryText:    { color: '#FFFFFF', fontWeight: '700' },
  exploreBtn:   { marginTop: 20, backgroundColor: '#1B4D3E', borderRadius: 14, paddingHorizontal: 28, paddingVertical: 13 },
  exploreBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});

const bCard = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  topRow:    { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  serviceInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  avatar:    { width: 48, height: 48, borderRadius: 14 },
  avatarPlaceholder: { backgroundColor: '#F0EBE3', alignItems: 'center', justifyContent: 'center' },
  serviceName:  { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 2 },
  providerName: { fontSize: 12, color: '#6B6B6B' },
  badge:        { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText:    { fontSize: 11, fontWeight: '700' },

  details:    { backgroundColor: '#FAF7F4', borderRadius: 12, padding: 12, gap: 8, marginBottom: 10 },
  detailRow:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 13, color: '#4A4A4A', flex: 1 },

  ref:        { fontSize: 11, color: '#9A9A9A', marginBottom: 12 },

  actions:          { flexDirection: 'row', gap: 10 },
  btnReschedule:    {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderWidth: 1.5, borderColor: '#1B4D3E',
    borderRadius: 10, paddingVertical: 10,
  },
  btnRescheduleText:{ color: '#1B4D3E', fontWeight: '700', fontSize: 13 },
  btnCancel:        {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 10, borderWidth: 1.5, borderColor: '#E8E0D5',
  },
  btnCancelText:    { color: '#6B6B6B', fontWeight: '600', fontSize: 13 },

  btnRate: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: '#FDF5E4', borderRadius: 10, paddingVertical: 10,
  },
  btnRateText: { color: '#C68A1A', fontWeight: '700', fontSize: 13 },
});
