import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as firebase from 'firebase';


export default function Header({ navigation, title, icons }) {
    const openMenu = () => {
        navigation.openDrawer();
    }

    const onLogoutPress = () => {
        console.log('logout');
        firebase.auth().signOut();
    }
    if (icons) {
        return (
            <View style={styles.header}>
                <View style={styles.left}>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onLogoutPress}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>
                            Logout
                </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={styles.header}>
                <View style={styles.left}>
                    <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />

                    <View style={styles.headerTitle}>
                        <Image source={require('../assets/Logo.png')} style={styles.headerImage} />
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onLogoutPress}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>
                            Logout
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
        justifyContent: 'center',
        top: 10,
        color: '#fff',

    },
    headerTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // left: 120,
    },
    left: {
        flex: 4,
    },
    headerImage: {
        marginTop: 5,
        width: 35,
        height: 47,
    },
    button: {
        flex: 1,
        // alignContent: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: '#fff',
    }

})