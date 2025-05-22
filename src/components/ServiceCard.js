import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth } from '../utils/responsive';

/**
 * A responsive service card component that displays service information
 * and adapts to different screen sizes
 */
const ServiceCard = ({
  service,
  onPress,
  onFavoritePress,
  style,
  horizontal = false,
}) => {
  // Determine card dimensions based on orientation and device type
  const cardWidth = horizontal 
    ? '100%' 
    : (isTablet ? scaleWidth(180) : '48%');
  
  const imageHeight = horizontal 
    ? scaleWidth(100) 
    : scaleWidth(isTablet ? 140 : 120);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
        { width: cardWidth },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: service.image }}
          style={[
            styles.image,
            { height: imageHeight },
            horizontal && styles.horizontalImage,
          ]}
          resizeMode="cover"
        />
        
        {service.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{service.discount}% OFF</Text>
          </View>
        )}
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoritePress && onFavoritePress(service.id)}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Ionicons
            name={service.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={service.isFavorite ? theme.colors.error : theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={[
        styles.infoContainer,
        horizontal && styles.horizontalInfoContainer,
      ]}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{service.category}</Text>
        </View>
        
        <Text style={styles.name} numberOfLines={2}>
          {service.name}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{service.rating}</Text>
          <Text style={styles.reviewCount}>({service.reviewCount})</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={12} color={theme.colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {service.location}
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          {service.oldPrice && (
            <Text style={styles.oldPrice}>${service.oldPrice}</Text>
          )}
          <Text style={styles.price}>${service.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.medium,
    marginBottom: theme.spacing.md,
  },
  verticalContainer: {
    height: isTablet ? scaleWidth(280) : scaleWidth(240),
  },
  horizontalContainer: {
    flexDirection: 'row',
    height: scaleWidth(120),
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
  },
  horizontalImage: {
    width: scaleWidth(120),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.borderRadius.md,
  },
  discountBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  discountText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xs,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: theme.spacing.sm,
    flex: 1,
  },
  horizontalInfoContainer: {
    borderLeftWidth: 0,
  },
  categoryContainer: {
    backgroundColor: `${theme.colors.primary}20`,
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    marginBottom: theme.spacing.xs,
  },
  categoryText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xs,
    fontWeight: '500',
  },
  name: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  locationText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  oldPrice: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: theme.spacing.xs,
  },
});

export default ServiceCard;
