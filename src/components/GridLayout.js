import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { isTablet, SCREEN_WIDTH } from '../utils/responsive';
import { theme } from '../constants/theme';

/**
 * A responsive grid layout component that adapts to different screen sizes
 * and displays items in a grid with a specified number of columns
 */
const GridLayout = ({
  data,
  renderItem,
  numColumns = isTablet ? 3 : 2,
  spacing = theme.spacing.md,
  contentContainerStyle,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  onEndReached,
  onEndReachedThreshold,
  refreshing,
  onRefresh,
  keyExtractor,
  style,
}) => {
  // Calculate item dimensions based on screen width, columns, and spacing
  const calculateItemDimensions = () => {
    const totalSpacing = spacing * (numColumns - 1);
    const horizontalPadding = spacing * 2;
    const availableWidth = SCREEN_WIDTH - totalSpacing - horizontalPadding;
    const itemWidth = availableWidth / numColumns;
    
    return {
      itemWidth,
      spacing,
    };
  };

  const { itemWidth, spacing: itemSpacing } = calculateItemDimensions();

  // Wrap the renderItem function to add proper styling and dimensions
  const renderGridItem = ({ item, index }) => {
    // Calculate margin to create proper spacing between items
    const marginRight = (index + 1) % numColumns === 0 ? 0 : itemSpacing;
    
    return (
      <View style={{ width: itemWidth, marginRight, marginBottom: itemSpacing }}>
        {renderItem({ item, index })}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderGridItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      contentContainerStyle={[
        styles.contentContainer,
        { padding: spacing },
        contentContainerStyle,
      ]}
      style={[styles.container, style]}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      initialNumToRender={numColumns * 2}
      maxToRenderPerBatch={numColumns * 2}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default GridLayout;
