import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GenericButton = ({ onPress, title, style, textStyle }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} testID="GenericButton:ClickMe">
        <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#577399',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 10,
        color: '#F7F7FF',
    }
})

export default GenericButton