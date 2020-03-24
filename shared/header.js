import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


export default function Header({ navigation, title }) {
    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.headerTitle}>
                <Image source={require('../assets/Logo.png')} style={styles.headerImage} />
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 1,
        // left: 150,
    },
    icon: {
        position: 'absolute',
        right: 260,
        color: '#fff',

    },
    headerTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // left: 120,
    },
    headerImage: {
        marginTop: 5,
        width: 35,
        height: 47,
    }
})