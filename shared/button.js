import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'

export default function FlatButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {

        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 8,
        backgroundColor: '#00838F',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    },
})
