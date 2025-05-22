import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserBookings } from '../services/apiService';

import ResponsiveContainer from '../components/ResponsiveContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleHeight, fontSize, spacing, borderRadius } from '../utils/responsive';

const BookingHistoryScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const data = await getUserBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookingItem = ({ item }) => {
    const isPast = new Date(item.date) < new Date();
    const isUpcoming = !isPast;
    
    if ((activeTab === 'upcoming' && !isUpcoming) || 
        (activeTab === 'past' && !isPast)) {
      return null;
    }

    return (
      <Card 
        style={[styles.bookingCard, isTablet && styles.tabletBookingCard]}
        onPress={() => navigation.navigate('service-detail', { serviceId: item.serviceId })}
      >
        <View style={styles.bookingHeader}>
          <View style={styles.serviceInfo}>
            <Image source={{ uri: item.serviceImage }} style={styles.serviceImage} />
            <View style={styles.serviceTextContainer}>
              <Text style={styles.serviceName} numberOfLines={1} ellipsizeMode="tail">{item.serviceName}</Text>
              <Text style={styles.providerName} numberOfLines={1} ellipsizeMode="tail">{item.providerName}</Text>
            </View>
          </View>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(item.status) + '20' }
          ]}>
            <Text style={[
              styles.statusText, 
              { color: getStatusColor(item.status) }
            ]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={isTablet ? 20 : 16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={isTablet ? 20 : 16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={isTablet ? 20 : 16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">{item.location}</Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <Text style={styles.referenceText}>
            Booking Ref: {item.reference}
          </Text>
          
          {isUpcoming && (
            <View style={styles.actionButtons}>
              <Button 
                title="Reschedule"
                icon="calendar-outline"
                onPress={() => navigation.navigate('booking', { 
                  serviceId: item.serviceId,
                  isReschedule: true,
                  bookingId: item.id
                })}
                type="primary"
                size="small"
                style={styles.rescheduleButton}
              />
              
              <Button 
                title="Cancel"
                icon="close-circle-outline"
                onPress={() => handleCancelBooking(item.id)}
                type="outline"
                size="small"
                style={styles.cancelButton}
              />
            </View>
          )}
          
          {isPast && item.status === 'completed' && !item.isRated && (
            <Button 
              title="Rate Service"
              icon="star-outline"
              onPress={() => navigation.navigate('rate-service', { 
                serviceId: item.serviceId,
                bookingId: item.id
              })}
              type="primary"
              size="small"
              style={styles.rateButton}
            />
          )}
        </View>
      </Card>
    );
  };

  const handleCancelBooking = (bookingId) => {
    // In a real app, you would call an API to cancel the booking
    // For now, just update the local state
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'cancelled' };
      }
      return booking;
    });
    setBookings(updatedBookings);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50'; // Green
      case 'pending':
        return '#FFC107'; // Yellow
      case 'cancelled':
        return '#F44336'; // Red
      case 'completed':
        return '#2196F3'; // Blue
      default:
        return '#9E9E9E'; // Grey
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <ResponsiveContainer style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <Header title="Booking History" onBack={() => navigation.goBack()} />
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      </ResponsiveContainer>
    );
  }

  if (error) {
    return (
      <ResponsiveContainer style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <Header title="Booking History" onBack={() => navigation.goBack()} />
        <View style={styles.centeredContainer}>
          <Ionicons name="alert-circle-outline" size={isTablet ? 64 : 48} color={theme.colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <Button 
            title="Retry" 
            onPress={fetchBookings} 
            type="primary"
            size={isTablet ? "medium" : "small"}
            style={styles.retryButton}
          />
        </View>
      </ResponsiveContainer>
    );
  }

  if (bookings.length === 0) {
    return (
      <ResponsiveContainer style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <Header title="Booking History" onBack={() => navigation.goBack()} />
        <View style={styles.centeredContainer}>
          <Ionicons 
            name="calendar-outline" 
            size={isTablet ? 80 : 64} 
            color={theme.colors.textSecondary} 
          />
          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
          <Text style={styles.emptySubtitle}>
            You haven't made any bookings yet. Explore services and book your first appointment.
          </Text>
          <Button 
            title="Explore Services"
            onPress={() => navigation.navigate('home')}
            type="primary"
            size={isTablet ? "large" : "medium"}
            icon="search"
            style={styles.exploreButton}
          />
        </View>
      </ResponsiveContainer>
    );
  }

  const upcomingBookings = bookings.filter(booking => new Date(booking.date) >= new Date());
  const pastBookings = bookings.filter(booking => new Date(booking.date) < new Date());

  return (
    <ResponsiveContainer style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <Header title="Booking History" onBack={() => navigation.goBack()} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'upcoming' && styles.activeTabText
          ]}>
            Upcoming ({upcomingBookings.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'past' && styles.activeTabText
          ]}>
            Past ({pastBookings.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet' : 'phone'}
      />
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.textSecondary,
  },
  errorText: {
    marginTop: spacing.md,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    marginTop: spacing.md,
  },
  emptyTitle: {
    fontSize: isTablet ? fontSize.xl : fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    maxWidth: isTablet ? 500 : '100%',
  },
  exploreButton: {
    marginTop: spacing.md,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: theme.colors.surfaceLight,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabText: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    padding: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  bookingCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  tabletBookingCard: {
    width: '48%',
    marginHorizontal: '1%',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceTextContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  serviceImage: {
    width: isTablet ? 60 : 50,
    height: isTablet ? 60 : 50,
    borderRadius: isTablet ? 30 : 25,
    marginRight: spacing.sm,
  },
  serviceName: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  providerName: {
    fontSize: isTablet ? fontSize.sm : fontSize.xs,
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.round,
    marginLeft: spacing.xs,
  },
  statusText: {
    fontSize: isTablet ? fontSize.xs : fontSize.xxs,
    fontWeight: '600',
  },
  bookingDetails: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailText: {
    fontSize: isTablet ? fontSize.sm : fontSize.xs,
    color: theme.colors.textPrimary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  referenceText: {
    fontSize: isTablet ? fontSize.xs : fontSize.xxs,
    color: theme.colors.textSecondary,
    marginBottom: spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  rescheduleButton: {
    marginRight: spacing.xs,
  },
  cancelButton: {
  },
  rateButton: {
  },
});

export default BookingHistoryScreen;
