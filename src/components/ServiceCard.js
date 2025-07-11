import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth } from '../utils/responsive';

/**
 * Professional 2025 Service Card Component
 * Features: Glass morphism, premium styling, enhanced interactions, responsive design
 */
const ServiceCard = ({
  service,
  onPress,
  onFavoritePress,
  style,
  horizontal = false,
  variant = 'default',
  featured = false,
  compact = false,
}) => {
  // Card variants for different layouts and emphasis
  const cardVariants = {
    default: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.card,
      ...theme.shadows.medium,
    },
    glass: {
      backgroundColor: 'rgba(28, 28, 30, 0.85)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.12)',
      borderRadius: theme.borderRadius.card,
      ...theme.shadows.medium,
      backdropFilter: 'blur(20px)',
    },
    premium: {
      backgroundColor: theme.colors.surfaceElevated,
      borderWidth: 1,
      borderColor: 'rgba(212, 175, 55, 0.3)',
      borderRadius: theme.borderRadius.card,
      ...theme.shadows.premium,
    },
    featured: {
      backgroundColor: theme.colors.surfaceElevated,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.large,
    },
  };

  // Determine card dimensions based on orientation and device type
  const cardWidth = horizontal 
    ? '100%' 
    : compact 
      ? (isTablet ? scaleWidth(160) : '46%')
      : (isTablet ? scaleWidth(200) : '100%');
  
  const imageHeight = horizontal 
    ? scaleWidth(100) 
    : compact
      ? scaleWidth(isTablet ? 120 : 100)
      : scaleWidth(isTablet ? 160 : 140);

  // Select appropriate variant
  let selectedVariant = variant;
  if (featured) selectedVariant = 'featured';
  if (service?.premium) selectedVariant = 'premium';
  
  const cardStyle = cardVariants[selectedVariant] || cardVariants.default;

  // Price formatting for professional display
  const formatPrice = (price) => {
    if (typeof price === 'string') {
      if (price.includes('$')) return price;
      return `$${price}`;
    }
    return `$${price}`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        cardStyle,
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
        { width: cardWidth },
        compact && styles.compactContainer,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Service Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: service.image }}
          style={[
            styles.image,
            { height: imageHeight },
            horizontal && styles.horizontalImage,
            compact && styles.compactImage,
          ]}
          resizeMode="cover"
        />
        
        {/* Discount Badge */}
        {service.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{service.discount}% OFF</Text>
          </View>
        )}
        
        {/* Premium Badge */}
        {(service.premium || featured) && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={12} color={theme.colors.primary} />
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        )}
        
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoritePress && onFavoritePress(service.id)}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Ionicons
            name={service.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={service.isFavorite ? theme.colors.favorite : theme.colors.white}
          />
        </TouchableOpacity>
        
        {/* Image Overlay for Glass Effect */}
        {selectedVariant === 'glass' && (
          <View style={styles.imageOverlay} />
        )}
      </View>

      {/* Service Information Container */}
      <View style={[
        styles.infoContainer,
        horizontal && styles.horizontalInfoContainer,
        compact && styles.compactInfoContainer,
      ]}>
        {/* Category Tag */}
        <View style={[
          styles.categoryContainer,
          { backgroundColor: `${theme.colors.primary}20` }
        ]}>
          <Text style={styles.categoryText}>{service.category}</Text>
        </View>
        
        {/* Service Name */}
        <Text style={[
          styles.name,
          compact && styles.compactName
        ]} numberOfLines={compact ? 1 : 2}>
          {service.name}
        </Text>
        
        {/* Rating Container */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            <Ionicons name="star" size={14} color={theme.colors.rating} />
            <Text style={styles.ratingText}>{service.rating}</Text>
          </View>
          <Text style={styles.reviewCount}>({service.reviewCount})</Text>
        </View>
        
        {/* Location */}
        {!compact && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={12} color={theme.colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {service.location}
            </Text>
          </View>
        )}
        
        {/* Price Container */}
        <View style={styles.priceContainer}>
          {service.oldPrice && (
            <Text style={styles.oldPrice}>{formatPrice(service.oldPrice)}</Text>
          )}
          <Text style={[
            styles.price,
            featured && styles.featuredPrice
          ]}>
            {formatPrice(service.price)}
          </Text>
          {service.priceUnit && (
            <Text style={styles.priceUnit}>/{service.priceUnit}</Text>
          )}
        </View>
        
        {/* Action Buttons for Featured Cards */}
        {featured && !horizontal && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="call-outline" size={16} color={theme.colors.primary} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={16} color={theme.colors.primary} />
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Glass Effect Overlay */}
      {selectedVariant === 'glass' && (
        <View style={styles.glassOverlay} pointerEvents="none" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  verticalContainer: {
    minHeight: isTablet ? scaleWidth(300) : scaleWidth(260),
  },
  horizontalContainer: {
    flexDirection: 'row',
    height: scaleWidth(120),
  },
  compactContainer: {
    minHeight: scaleWidth(isTablet ? 200 : 180),
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    borderTopLeftRadius: theme.borderRadius.card,
    borderTopRightRadius: theme.borderRadius.card,
  },
  horizontalImage: {
    width: scaleWidth(120),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.borderRadius.card,
  },
  compactImage: {
    borderTopLeftRadius: theme.borderRadius.card,
    borderTopRightRadius: theme.borderRadius.card,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  discountBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  discountText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  premiumBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm + 40, // Offset for favorite button
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumText: {
    color: theme.colors.textInverse,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginLeft: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  infoContainer: {
    padding: theme.spacing.md,
    flex: 1,
  },
  horizontalInfoContainer: {
    paddingLeft: theme.spacing.sm,
  },
  compactInfoContainer: {
    padding: theme.spacing.sm,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
    marginBottom: theme.spacing.xs,
  },
  categoryText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    lineHeight: 22,
  },
  compactName: {
    fontSize: theme.fontSize.sm,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  locationText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 0.2,
  },
  featuredPrice: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
  },
  oldPrice: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    textDecorationLine: 'line-through',
    marginRight: theme.spacing.xs,
  },
  priceUnit: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  actionText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: theme.borderRadius.card,
    pointerEvents: 'none',
  },
});

export default ServiceCard;
