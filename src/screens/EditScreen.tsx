import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { koulenFont } from '../styles/fonts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { deleteImage, saveImage, StoredImage } from '../utils/storage';
import { ImageEditor, ImageData } from 'expo-crop-image';

type EditScreenRouteProp = RouteProp<{ Edit: { image: StoredImage } }, 'Edit'>;

export default function EditScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditScreenRouteProp>();
  const [image, setImage] = useState<StoredImage>(route.params.image);
  const [croppedUri, setCroppedUri] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleDelete = async () => {
    await deleteImage(image.id);
    Alert.alert('Deleted', 'Image deleted successfully');
    navigation.goBack();
  };

  const handleCrop = () => {
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (croppedUri) {
      await saveImage(croppedUri);
      Alert.alert('Saved', 'Cropped image saved to gallery');
      navigation.goBack();
    }
  };

  const handleEditingComplete = (imgData: ImageData) => {
    setCroppedUri(imgData.uri);
    setShowEditor(false);
  };

  const handleEditingCancel = () => {
    setShowEditor(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, koulenFont]}>EDIT</Text>
      <Image source={{ uri: croppedUri || image.uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleCrop}>
          <Text style={styles.buttonText}>Crop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={!croppedUri}>
          <Text style={[styles.buttonText, !croppedUri && { opacity: 0.5 }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <ImageEditor
        imageUri={croppedUri || image.uri}
        fixedAspectRatio={2 / 3}
        minimumCropDimensions={{ width: 50, height: 50 }}
        isVisible={showEditor}
        onEditingCancel={handleEditingCancel}
        onEditingComplete={handleEditingComplete}
      />
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
  image: {
    width: '90%',
    height: 350,
    borderRadius: 12,
    backgroundColor: '#222',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#C3E722',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
}); 