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
      <View style={styles.headerView}>
        <Text style={[styles.header, koulenFont]}>GALLERY</Text>
        <View style={styles.retangulo}>
        </View>
      </View>
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
    backgroundColor: 'black',
    alignItems: 'center',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
  },
  header: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    textAlignVertical: 'top',
    marginRight: 30,
  },
  retangulo: {
    flex: 0.4, 
    height: 7, 
    marginTop: 20, // Largura do retângulo (em px)  // Altura do retângulo (em px)
    backgroundColor: '#C3E722', // Cor de fundo
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
    marginTop: 20,
  },
}); 