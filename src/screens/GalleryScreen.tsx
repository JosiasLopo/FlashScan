import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { koulenFont } from '../styles/fonts';
import ImageGrid from '../components/ImageGrid';
import { StoredImage, getImages } from '../utils/storage';

export default function GalleryScreen() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const loadedImages = await getImages();
      setImages(loadedImages);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePress = (image: StoredImage) => {
    // @ts-ignore - Navigation type will be properly set up later
    navigation.navigate('Edit', { image });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C3E722" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, koulenFont]}>GALLERY</Text>
      {images.length === 0 ? (
        <Text style={styles.emptyText}>No images yet</Text>
      ) : (
        <ImageGrid images={images} onImagePress={handleImagePress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    color: '#C3E722',
    marginBottom: 24,
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
    marginTop: 20,
  },
}); 