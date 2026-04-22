import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Switch, ActivityIndicator, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getCurrentUser, logoutUser } from '../services/authService';

function InitialsAvatar({ name, size = 80 }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '??';
  return (
    <View style={[avt.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[avt.text, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

function SettingRow({ icon, iconColor = '#6B6B6B', label, value, onPress, rightElement }) {
  return (
    <TouchableOpacity style={s.row} onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <View style={[s.rowIcon, { backgroundColor: `${iconColor}18` }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={s.rowLabel}>{label}</Text>
      <View style={s.rowRight}>
        {value ? <Text style={s.rowValue}>{value}</Text> : null}
        {rightElement ?? (onPress
          ? <Ionicons name="chevron-forward" size={16} color="#9A9A9A" />
          : null)}
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifs, setNotifs]   = useState(true);
  const [loc, setLoc]         = useState(true);

  useEffect(() => { loadUser(); }, []);

  const loadUser = async () => {
    try {
      const u = await getCurrentUser();
      setUser(u);
    } catch {}
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutUser();
            router.replace('/login');
          } catch (err) {
            Alert.alert('Error', err.message ?? 'Failed to sign out.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1B4D3E" />
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <Ionicons name="person-circle-outline" size={80} color="#E8E0D5" />
          <Text style={styles.emptyTitle}>Not signed in</Text>
          <TouchableOpacity style={styles.signInBtn} onPress={() => router.replace('/login')}>
            <Text style={styles.signInText}>Go to Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isDemo     = user.isDemo;
  const isProvider = user.role === 'provider';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F4" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero */}
        <View style={styles.hero}>
          <InitialsAvatar name={user.name} size={88} />
          <View style={styles.heroText}>
            <Text style={styles.heroName}>{user.name}</Text>
            <Text style={styles.heroRole}>{isProvider ? 'Service Provider' : 'Customer'}</Text>
            <Text style={styles.heroEmail}>{user.email}</Text>
          </View>
          {isDemo && (
            <View style={styles.demoBadge}>
              <Text style={styles.demoBadgeText}>DEMO</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Bookings',   value: '12' },
            { label: 'Favourites', value: '5'  },
            { label: 'Reviews',    value: '8'  },
          ].map((st) => (
            <View key={st.label} style={styles.stat}>
              <Text style={styles.statVal}>{st.value}</Text>
              <Text style={styles.statLabel}>{st.label}</Text>
            </View>
          ))}
        </View>

        {/* Personal info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <SettingRow icon="mail-outline"   iconColor="#1A7EC8" label="Email"  value={user.email} />
          <SettingRow icon="call-outline"   iconColor="#0F8C6A" label="Phone"  value={user.phone ?? 'Not set'} />
          <SettingRow icon="location-outline" iconColor="#C8553D" label="Location" value="Abuja, Nigeria" />
        </View>

        {/* App links */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>
          <SettingRow icon="calendar-outline"     iconColor="#1B4D3E" label="My Bookings"  onPress={() => router.push('/booking-history')} />
          <SettingRow icon="heart-outline"        iconColor="#C8553D" label="Favourites"   onPress={() => router.push('/favorites')} />
          <SettingRow icon="notifications-outline" iconColor="#E8A838" label="Notifications" onPress={() => router.push('/notifications')} />
        </View>

        {/* Preferences */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferences</Text>
          <SettingRow
            icon="notifications-outline" iconColor="#1B4D3E" label="Push Notifications"
            rightElement={
              <Switch
                value={notifs} onValueChange={setNotifs}
                trackColor={{ false: '#E8E0D5', true: '#52B788' }}
                thumbColor={notifs ? '#1B4D3E' : '#9A9A9A'}
              />
            }
          />
          <SettingRow
            icon="location-outline" iconColor="#1B4D3E" label="Location Services"
            rightElement={
              <Switch
                value={loc} onValueChange={setLoc}
                trackColor={{ false: '#E8E0D5', true: '#52B788' }}
                thumbColor={loc ? '#1B4D3E' : '#9A9A9A'}
              />
            }
          />
          <SettingRow icon="language-outline" iconColor="#6B6B6B" label="Language" value="English" onPress={() => {}} />
        </View>

        {/* Help */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Support</Text>
          <SettingRow icon="help-circle-outline" iconColor="#6B6B6B" label="Help & Support" onPress={() => {}} />
          <SettingRow icon="document-text-outline" iconColor="#6B6B6B" label="Privacy Policy" onPress={() => {}} />
          <SettingRow icon="information-circle-outline" iconColor="#6B6B6B" label="App Version" value="1.0.0" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#FAF7F4' },
  scroll: { paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginTop: 16 },
  signInBtn:  { marginTop: 20, backgroundColor: '#1B4D3E', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 13 },
  signInText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  hero: {
    backgroundColor: '#1B4D3E', paddingHorizontal: 24, paddingTop: 28, paddingBottom: 32,
    flexDirection: 'row', alignItems: 'center', gap: 16, position: 'relative',
  },
  heroText:  { flex: 1 },
  heroName:  { fontSize: 20, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 },
  heroRole:  { fontSize: 13, color: '#52B788', fontWeight: '600', marginTop: 2 },
  heroEmail: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  demoBadge: {
    position: 'absolute', top: 16, right: 20,
    backgroundColor: '#E8A838', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  demoBadgeText: { fontSize: 10, fontWeight: '800', color: '#1B4D3E', letterSpacing: 0.8 },

  statsRow: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    marginHorizontal: 20, borderRadius: 18, marginTop: -20,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 5,
    marginBottom: 20,
  },
  stat:      { flex: 1, alignItems: 'center', paddingVertical: 18 },
  statVal:   { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
  statLabel: { fontSize: 11, color: '#6B6B6B', marginTop: 2, fontWeight: '500' },

  card: {
    backgroundColor: '#FFFFFF', marginHorizontal: 20, borderRadius: 18,
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4,
    marginBottom: 14,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#9A9A9A', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: 20, borderRadius: 14, paddingVertical: 15,
    backgroundColor: '#FEE2E2', marginTop: 4,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#EF4444' },
});

const s = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: '#F5F0E8',
  },
  rowIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: '#1A1A1A' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowValue: { fontSize: 13, color: '#6B6B6B' },
});

const avt = StyleSheet.create({
  circle: {
    backgroundColor: '#52B788', alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
  },
  text: { color: '#FFFFFF', fontWeight: '800', letterSpacing: -0.5 },
});
