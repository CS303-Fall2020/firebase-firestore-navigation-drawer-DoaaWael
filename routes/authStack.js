import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/auth/login'
import Signup from '../screens/auth/signup'
import ForgetPass from '../screens/auth/forgetPass'
import Drawer from "./drawer";
import { createAppContainer } from "react-navigation";
// import drawer from "./drawer";


const screens = {
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
    ForgetPass: {
        screen: ForgetPass,
    },
    Main: {
        screen: Drawer,
    }

}


const AuthStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
            height: 70,
            backgroundColor: 'coral',
        }

    }
})

// export default AuthStack;
export default createAppContainer(AuthStack);