import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from '../../styles/global'
import FlatButton from '../../shared/button'
import { NavigationActions, StackActions } from 'react-navigation';
import * as firebase from 'firebase'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => {
                Alert.alert(error.message);
            })
    }

    onCreateAccountPress = () => {
        const navAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Signup' })
            ]
        })
        this.props.navigation.dispatch(navAction);
    }

    onForgetPasswrdPress = () => {
        const navAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'ForgetPass' })
            ]
        })
        this.props.navigation.dispatch(navAction);
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.content}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Email..'
                                value={this.state.email}
                                onChangeText={(text) => { this.setState({ email: text }) }}
                                keyboardType="email-address"
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='*********'
                                value={this.state.password}
                                onChangeText={(password) => { this.setState({ password: password }) }}
                                secureTextEntry={true}
                            />
                            <TouchableOpacity onPress={this.onForgetPasswrdPress}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonQuestion}>
                                        Forget My Password ?
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <FlatButton style={styles.button} text='Login' onPress={this.onLoginPress} />
                            <View style={{ padding: 20 }}>
                                <Text style={styles.buttonQuestion}>Don't have an account yet ?</Text>
                                <TouchableOpacity onPress={this.onCreateAccountPress}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            Create an account
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 40,
        paddingTop: 20,
        // justifyContent: 'center',
        top: 110,
    },
    inputContainer: {
        marginVertical: 5,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    button: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    buttonText: {
        color: '#00838F',
        textTransform: 'uppercase',
        fontSize: 13,
        textAlign: 'center',
    },
    buttonQuestion: {
        color: '#808080',
        textTransform: 'uppercase',
        fontSize: 12,
        textAlign: 'center',
    },
    buttonContainer: {
        marginHorizontal: 20,
    }

});