import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from '../../styles/global'
import FlatButton from '../../shared/button'
import { NavigationActions, StackActions } from 'react-navigation';
import * as firebase from 'firebase'

export default class ForgetPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            resetEmail: false,
        }
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState({ resetEmail: true })
                // Alert.alert("Password reset email has been sent.");
            }, (error) => {
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
                            {this.state.resetEmail ?
                                <Text style={styles.resetEmail}>
                                    Email was sent successfully. Please follow instructions to reset your password
                                </Text>
                                : <View />
                            }
                        </View>


                        <View style={styles.buttonContainer}>
                            <FlatButton text='Reset Password' onPress={this.onResetPasswordPress} />
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
    },
    content: {
        flex: 1,
        padding: 40,
        paddingTop: 20,
        top: 80,
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
    resetEmail: {
        marginHorizontal: 10,
        color: '#808080',
        fontSize: 11,
    }

});