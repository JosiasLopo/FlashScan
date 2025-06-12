import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { StoredImage } from '../utils/storage';

interface ImageGridProps {
  images: StoredImage[];
  onImagePress: (image: StoredImage) => void;
}

const { width } = Dimensions.get('window');
const numColumns = 2;
const tileSize = width / numColumns - 32; // leave margin for centering

export default function ImageGrid({ images, onImagePress }: ImageGridProps) {
  return (
    <FlatList
      data={images}
      keyExtractor={(item: StoredImage) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }: { item: StoredImage }) => (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => onImagePress(item)}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  imageContainer: {
    width: tileSize,
    height: tileSize * 1.3, // make images larger and more vertical
    margin: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
}); 