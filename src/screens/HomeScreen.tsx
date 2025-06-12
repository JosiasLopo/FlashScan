import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { koulenFont } from '../styles/fonts';
import { saveImage, getImages } from '../utils/storage';
import Ionicons from '@expo/vector-icons/Ionicons';


type RootStackParamList = {
  Home: undefined;
  Gallery: undefined;
  Edit: { image: { id: string; uri: string; timestamp: number } };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCameraMounted, setIsCameraMounted] = useState(true);
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation<NavigationProp>();
  const [lastImageUri, setLastImageUri] = useState<string | null>(null);

  // Handle screen focus changes
  useFocusEffect(
    React.useCallback(() => {
      setIsCameraMounted(true);
      return () => {
        setIsCameraMounted(false);
        setIsCameraReady(false);
        setIsTorchOn(false); // Ensure torch is off when leaving screen
      };
    }, [])
  );

  useEffect(() => {
    const fetchLastImage = async () => {
      const images = await getImages();
      if (images.length > 0) {
        setLastImageUri(images[0].uri);
      } else {
        setLastImageUri(null);
      }
    };
    fetchLastImage();
  }, [isCapturing]);

  const simulateTripleFlash = async () => {
    if (isCapturing || !isCameraReady) return;
    setIsCapturing(true);

    try {
      console.log('Starting flash sequence...');
      
      if (!isTorchOn) {
        // First flash
        console.log('First flash - turning on');
        setIsTorchOn(true);
        await new Promise(resolve => setTimeout(resolve, 250));
        console.log('First flash - turning off');
        setIsTorchOn(false);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Second flash
        console.log('Second flash - turning on');
        setIsTorchOn(true);
        await new Promise(resolve => setTimeout(resolve, 250));
        console.log('Second flash - turning off');
        setIsTorchOn(false);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Third flash
        console.log('Third flash - turning on');
        setIsTorchOn(true);
        await new Promise(resolve => setTimeout(resolve, 250));
        console.log('Third flash - turning off');
        setIsTorchOn(false);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Fourth flash and capture
        console.log('Fourth flash - turning on');
        setIsTorchOn(true);
      }

      if (cameraRef.current) {
        console.log('Taking picture...');
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          skipProcessing: true
        });
        console.log('Picture taken, saving...');
        await saveImage(photo.uri);
        Alert.alert('Success', 'Photo captured successfully!');
      }
    } catch (error) {
      console.error('Error during capture:', error);
      Alert.alert('Error', 'Failed to capture photo');
    } finally {
      console.log('Cleaning up - turning off flash');
      setIsTorchOn(false);
      setIsCapturing(false);
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;
    
    try {
      setIsCapturing(true);
      
      // If torch is ON (FlashOff icon), take picture immediately without flash
      if (isTorchOn) {
        console.log('Taking picture without flash (torch is ON)...');
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          skipProcessing: true,
        });
        console.log('Picture taken, saving...');
        await saveImage(photo.uri);
      } else {
        // If torch is OFF (FlashOn icon), do the flash sequence
        console.log('Starting flash sequence...');
        await simulateTripleFlash();
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!permission) {
    return <View style={styles.container}><Text style={[styles.title, koulenFont]}>Requesting Camera Permission...</Text></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, koulenFont]}>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.iconButton}>
          <Text style={{ color: '#C3E722', fontSize: 18 }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={[styles.header, koulenFont]}>FLASHSCAN</Text>
        <View style={styles.retangulo}>
        </View>
      </View>
      <View style={styles.cameraContainer}>
        {isCameraMounted && (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            enableTorch={isTorchOn}
            onCameraReady={() => {
              console.log('Camera is ready');
              setIsCameraReady(true);
            }}
          />
        )}
        {!isCameraReady && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#C3E722" />
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Gallery')}
        >
          <Image
            source={lastImageUri ? { uri: lastImageUri } : require('../../assets/images/icon.png')}
            style={styles.lastImageIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.captureButton, (isCapturing || !isCameraReady) && styles.captureButtonDisabled]}
          onPress={takePicture}
          disabled={isCapturing || !isCameraReady}
        >
          <View style={styles.innerCapture} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => setIsTorchOn(!isTorchOn)}
        >
          <Ionicons
            name={isTorchOn ? 'flash-off' : 'flash'}
            size={53}
            color="#fff"
            style={{ textAlign: 'center', textAlignVertical: 'center' }}
          />

        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 40,
    width: '100%',
  },
  header: {
    marginTop: 10,
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    flex: 1.9,
    textAlign: 'left',
    textAlignVertical: 'top',
    marginLeft: 30,
  },
  retangulo: {
    flex: 1, 
    height: 7, 
    marginTop: 30, // Largura do retângulo (em px)  // Altura do retângulo (em px)
    backgroundColor: '#C3E722', // Cor de fundo
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 3 / 4.5,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginBottom: 20,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingBottom: 40,
  },
  iconButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 0,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    marginLeft: 15,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  flashButton: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  lastImageIcon: {
    width: 45,
    height: 65,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  innerCapture: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7B7B7B',
  },
  title: {
    fontSize: 24,
    color: '#C3E722',
    textAlign: 'center',
    marginTop: 40,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
}); 