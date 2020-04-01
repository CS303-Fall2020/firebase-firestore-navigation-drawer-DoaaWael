import { createStackNavigator } from 'react-navigation-stack'
import Profile from '../screens/profile'
import Header from '../shared/header'
import React from 'react'

const screens = {

    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Profile' />
            }

        },
    },
}

const ProfileStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
            height: 70,
            backgroundColor: 'coral',
        }

    }
})

export default ProfileStack;