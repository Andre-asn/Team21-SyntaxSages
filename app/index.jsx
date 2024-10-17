import React, { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';
import { StyleSheet, Text, View, Image } from 'react-native';
import CameraButton from '../components/CameraButton';
import GenericButton from '../components/GenericButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [facing, setFacing] = useState(CameraType.back)
  const [permission, requestPermission] = useCameraPermissions()
  const [picture, setPicture] = useState(null)
  const cameraRef = useRef(null)

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <GenericButton onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePic() {
    const options = {quality: 1, base64: true, exif: false}
    const newPic = await cameraRef.current.takePictureAsync(options)
    setPicture(newPic)
  }

  if (picture) {
    // TODO
    // Log photo to a library, awaiting database integration
    return (
      <SafeAreaView style={styles.safe}>
        <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + picture.base64}} />
        <GenericButton title="Take Another" onPress={() => setPicture(undefined)} />
      </SafeAreaView>
    )
  }

  function toggleCameraFace() {
    setFacing((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
   <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <SafeAreaView style={styles.safe}>
          <CameraButton
            onFlip={toggleCameraFace}
            onCapture={takePic}
          />
        </SafeAreaView>
      </CameraView>
    </View> 
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: 'flex-end',
  }, 
  container: {
    flex: 1,
    backgroundColor: '#F7F7FF',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#495867'
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'flex-end',
  },
  preview: {
    flex: 1,
    alignSelf: 'stretch',
  }
});