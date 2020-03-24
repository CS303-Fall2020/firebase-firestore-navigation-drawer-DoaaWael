import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/home'
import ReviewDetails from '../screens/reviewDetails'
import Header from '../shared/header'
import Login from '../screens/auth/login'
import Signup from '../screens/auth/signup'
import ForgetPass from '../screens/auth/forgetPass'
import { createAppContainer } from "react-navigation";

const screens = {

    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='MyTodo' />
            }

        }
    },
    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions: {
            title: 'ReviewDetails',
        }
    },

}


const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
            height: 70,
            backgroundColor: 'coral',
        }

    }
})
export default createAppContainer(HomeStack);
// export default HomeStack;