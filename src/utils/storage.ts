import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@FlashScan:images';

export interface StoredImage {
  id: string;
  uri: string;
  timestamp: number;
}

export const saveImage = async (uri: string): Promise<StoredImage> => {
  try {
    const newImage: StoredImage = {
      id: Date.now().toString(),
      uri,
      timestamp: Date.now(),
    };

    const existingImages = await getImages();
    const updatedImages = [newImage, ...existingImages];
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    return newImage;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

export const getImages = async (): Promise<StoredImage[]> => {
  try {
    const imagesJson = await AsyncStorage.getItem(STORAGE_KEY);
    return imagesJson ? JSON.parse(imagesJson) : [];
  } catch (error) {
    console.error('Error getting images:', error);
    return [];
  }
};

export const deleteImage = async (id: string): Promise<void> => {
  try {
    const images = await getImages();
    const updatedImages = images.filter(img => img.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}; 