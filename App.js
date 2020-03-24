import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import * as Font from 'expo-font';
import { AppLoading } from 'expo'
import Navigator from './routes/drawer'
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'
import AuthStack from './routes/authStack'




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isAuthReady: false,
      isAuthenticated: false,
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    }
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isAuthReady: true });
      this.setState({ isAuthenticated: !!user });
    });

  }

  getFonts = () => Font.loadAsync({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),

  });

  render() {
    if (!this.state.fontsLoaded || !this.state.isAuthReady) {
      console.log('loading');
      return (
        <AppLoading
          startAsync={this.getFonts}
          onFinish={() => this.setState({ fontsLoaded: true })}
        />
      )
    } else {
      if (this.state.isAuthenticated) {
        return (<Navigator />);
      } else {
        return (<AuthStack />);
      }

    }
  }

}

