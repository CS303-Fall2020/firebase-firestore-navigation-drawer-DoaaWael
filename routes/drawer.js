import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import HomeStack from './homeStack'
import AboutStack from './aboutStack'
import ProfileStack from './profileStack'
import React from 'react'
import Load from '../screens/loading'
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'
import { SimpleLineIcons } from '@expo/vector-icons'


const onLogoutPress = () => {
    firebase.auth().signOut();
}


const RootDrawerNavigator = createDrawerNavigator({

    Home: {
        screen: HomeStack,
        navigationOptions: () => {
            return {
                drawerIcon: () => <SimpleLineIcons name='home' size={16} />,
            }

        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: () => {
            return {
                drawerIcon: () => <SimpleLineIcons name='user' size={16} />,
            }

        }
    },
    About: {
        screen: AboutStack,
        navigationOptions: () => {
            return {
                drawerIcon: () => <SimpleLineIcons name='badge' size={16} />,
            }

        }
    },
    Logout: {
        screen: Load,
        navigationOptions: () => {
            return {
                drawerLabel: () =>
                    <TouchableOpacity onPress={onLogoutPress} style={styles.logout}>
                        <View style={styles.icon}>
                            <SimpleLineIcons name='logout' size={16} />
                        </View>
                        <Text style={styles.text}> Logout </Text>
                    </TouchableOpacity>
            }

        }
    }

})

// export default RootDrawerNavigator;
export default createAppContainer(RootDrawerNavigator);

const styles = StyleSheet.create({
    logout: {
        flex: 1,
        paddingVertical: 14,
        width: '100%',
        paddingRight: 210,
        flexDirection: 'row',
        paddingLeft: 18,
    },
    icon: {
        paddingRight: 35,
    },
    text: {
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: 'bold',
    }
})