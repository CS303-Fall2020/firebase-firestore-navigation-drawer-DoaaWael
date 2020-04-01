import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'


export default class Welcome extends Component {

    constructor() {
        super();
    }

    componentDidMount() {

        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 5000)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.loadingImage} source={require('../assets/Loading.gif')} />
            </View >
        )
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }, loadingImage: {
        borderColor: '#fff',
        width: 200,
        height: 200,

    },

})
