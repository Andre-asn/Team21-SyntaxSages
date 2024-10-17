import React from 'react'
import { View, StyleSheet } from 'react-native'
import GenericButton from './GenericButton'

const CameraButton = ({onFlip, onCapture}) => (
    <View>
        <GenericButton title="Flip" onPress={onFlip} style={styles.flipButton}/>
        <GenericButton title="Capture" onPress={onCapture} style={styles.captureButton}/>  
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 20,
        width: '100%',
    },
    flipButton: {
        backgroundColor: '#495867',
    },
    captureButton: {
        backgroundColor: '#FE5F55'
    },
})

export default CameraButton