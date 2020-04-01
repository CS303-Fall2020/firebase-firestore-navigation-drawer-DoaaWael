import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import * as firebase from 'firebase'
import Card from '../shared/card'

export default function Home() {
    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.profile}>
                    <View style={styles.profileImageContainer}>
                        <Image source={require('../assets/defaultUser.png')} style={styles.profileImage} />
                    </View>
                    <View style={styles.portfolio}>
                        <Text>User Email:</Text>
                        {/* <br /> */}
                        <Text>{firebase.auth().currentUser.email}</Text>
                        {/* <br /> */}
                        <Text>Portfolio:</Text>
                        {/* <br /> */}
                        <Text>"Aspire to inspire."</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <View style={styles.wall}>
                    
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        flexDirection: 'row',
    },
    profileImageContainer: {
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        padding: 20,
        width: 120,
        height: 120,

    },
    portfolio: {
        paddingHorizontal: 20,
        flex: 3,
        paddingTop: 10,
    },
})