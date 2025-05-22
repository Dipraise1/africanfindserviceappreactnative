import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserNotifications } from '../services/apiService';

import ResponsiveContainer from '../components/ResponsiveContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleHeight, fontSize, spacing, borderRadius } from '../utils/responsive';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await getUserNotifications();
      setNotifications(data);
      setError(null);
    } catch (err) {
      setError('Failed to load notifications');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationPress = (notification) => {
    // Navigate based on notification type
    switch (notification.type) {
      case 'booking_confirmation':
      case 'booking_reminder':
      case 'booking_update':
        navigation.navigate('booking-history');
        break;
      case 'service_rating':
        navigation.navigate('service-detail', { serviceId: notification.serviceId });
        break;
      case 'promo':
        navigation.navigate('home');
        break;
      default:
        // Just mark as read by default
        markAsRead(notification.id);
    }
  };

  const markAsRead = (notificationId) => {
    // In a real app, you would call an API to mark the notification as read
    // For now, just update the local state
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    // In a real app, you would call an API to mark all notifications as read
    // For now, just update the local state
    const updatedNotifications = notifications.map(notification => {
      return { ...notification, read: true };
    });
    setNotifications(updatedNotifications);
  };

  const renderNotificationItem = ({ item }) => {
    return (
      <Card 
        style={[
          styles.notificationItem, 
          !item.read && styles.unreadNotification
        ]}
        onPress={() => {
          markAsRead(item.id);
          handleNotificationPress(item);
        }}
      >
        <View style={[
          styles.notificationIcon, 
          { backgroundColor: getNotificationColor(item.type) + '20' }
        ]}>
          <Ionicons 
            name={getNotificationIcon(item.type)} 
            size={isTablet ? 28 : 24} 
            color={getNotificationColor(item.type)} 
          />
        </View>
        
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <View style={styles.notificationFooter}>
            <Text style={styles.notificationTime}>{formatTime(item.time)}</Text>
            {!item.read && (
              <View style={styles.unreadDot} />
            )}
          </View>
        </View>
      </Card>
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking_confirmation':
        return 'checkmark-circle';
      case 'booking_reminder':
        return 'alarm';
      case 'booking_update':
        return 'refresh-circle';
      case 'service_rating':
        return 'star';
      case 'promo':
        return 'pricetag';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking_confirmation':
        return '#4CAF50'; // Green
      case 'booking_reminder':
        return '#FF9800'; // Orange
      case 'booking_update':
        return '#2196F3'; // Blue
      case 'service_rating':
        return '#FFC107'; // Yellow
      case 'promo':
        return '#9C27B0'; // Purple
      default:
        return '#757575'; // Grey
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
      return diffInMinutes === 0 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return notificationTime.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (isLoading) {
    return (
      <ResponsiveContainer style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <Header title="Notifications" onBack={() => navigation.goBack()} />
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </ResponsiveContainer>
    );
  }

  if (error) {
    return (
      <ResponsiveContainer style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <Header title="Notifications" onBack={() => navigation.goBack()} />
        <View style={styles.centeredContainer}>
          <Ionicons name="alert-circle-outline" size={isTablet ? 64 : 48} color={theme.colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <Button 
            title="Retry" 
            onPress={fetchNotifications} 
            type="primary"
            size={isTablet ? "medium" : "small"}
            style={styles.retryButton}
          />
        </View>
      </ResponsiveContainer>
    );
  }

  if (notifications.length === 0) {
    return (
      <ResponsiveContainer style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <Header title="Notifications" onBack={() => navigation.goBack()} />
        <View style={styles.centeredContainer}>
          <Ionicons 
            name="notifications-off-outline" 
            size={isTablet ? 80 : 64} 
            color={theme.colors.textSecondary} 
          />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptySubtitle}>
            You don't have any notifications yet. We'll notify you when there are updates.
          </Text>
        </View>
      </ResponsiveContainer>
    );
  }

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <ResponsiveContainer style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <Header 
        title="Notifications" 
        onBack={() => navigation.goBack()} 
        rightComponent={
          unreadCount > 0 ? (
            <Button
              title="Mark all as read"
              onPress={markAllAsRead}
              type="text"
              size="small"
            />
          ) : null
        }
      />
      
      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Ionicons name="information-circle" size={isTablet ? 24 : 20} color={theme.colors.primary} />
          <Text style={styles.unreadBannerText}>
            You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
          </Text>
        </View>
      )}

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  unreadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: theme.colors.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  unreadBannerText: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: '500',
    marginLeft: spacing.sm,
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  notificationItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  unreadNotification: {
    backgroundColor: theme.colors.surfaceLight,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  notificationIcon: {
    width: isTablet ? 60 : 50,
    height: isTablet ? 60 : 50,
    borderRadius: isTablet ? 30 : 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  notificationMessage: {
    fontSize: isTablet ? fontSize.sm : fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: isTablet ? fontSize.md : fontSize.sm * 1.5,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: isTablet ? fontSize.xs : fontSize.xxs,
    color: theme.colors.textTertiary,
  },
  unreadDot: {
    width: isTablet ? 12 : 10,
    height: isTablet ? 12 : 10,
    borderRadius: isTablet ? 6 : 5,
    backgroundColor: theme.colors.primary,
  },
});

export default NotificationsScreen;
