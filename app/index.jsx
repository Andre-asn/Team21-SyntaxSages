import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraButton from '../components/CameraButton';
import GenericButton from '../components/GenericButton';

export default function App() {
  const [facing, setFacing] = useState(CameraType.back)
  const [permission, requestPermission] = useCameraPermissions();
  const [capturePic, setPicture] = useState(null)

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
    //TODO Implement take picture function
    // Implement save picture to database
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    /*<View>
      <CameraView>
        <View style={styles.buttonContainer}>
          <CameraButton
          onFlip={toggleCameraFacing}
          onCapture={takePic}
          />
        </View>
      </CameraView>
    </View>*/

   <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <CameraButton
            onFlip={toggleCameraFacing}
            onCapture={takePic}
          />
        </View>
      </CameraView>
    </View> 
  );
}

const styles = StyleSheet.create({
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
});
