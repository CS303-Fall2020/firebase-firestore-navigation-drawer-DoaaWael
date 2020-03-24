import React from 'react'
import { StyleSheet, View, Text, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from '../../styles/global'
import FlatButton from '../../shared/button'
import { NavigationActions, StackActions } from 'react-navigation';
import * as firebase from 'firebase'

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
        }
    }

    onSignupPress = () => {
        if (this.state.password == null) {
            this.setState({ boolPass: true })
        }
        if (this.state.passwordConfirm == null) {
            this.setState({ boolConfPass: true })
        }
        if (this.state.password != this.state.passwordConfirm) {
            this.setState({ boolConfPass: false })
            this.setState({ boolPass: false })
            Alert.alert("Password do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => {
                Alert.alert(error.message);
            })

    }

    onBackToLoginPress = () => {
        const navAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
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
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='*********'
                                value={this.state.passwordConfirm}
                                onChangeText={(passwordConfirm) => { this.setState({ passwordConfirm: passwordConfirm }) }}
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <FlatButton text='Signup' onPress={this.onSignupPress} />
                            <View style={{ padding: 20 }}>
                                <Text style={styles.buttonQuestion}>I already have an account</Text>
                                <TouchableOpacity onPress={this.onBackToLoginPress}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            Back to login
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
        padding: 40,
        paddingTop: 20,
        flex: 1,
        // justifyContent: 'center'
        top: 80,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // flex: 5,
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
    },
    errorMess: {
        marginHorizontal: 10,
        color: '#808080',
        fontSize: 11,
    }
});