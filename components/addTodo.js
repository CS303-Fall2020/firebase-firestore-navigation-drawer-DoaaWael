import React, { useState } from 'react'
import { Text, StyleSheet, TextInput, Button, View, Keyboard } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
import * as yup from 'yup'
import FlatButton from '../shared/button'

const reviewSchema = yup.object({
    title: yup.string()
        .required()

})

export default function AddTodo({ submitHandler }) {

    return (

        <View style={styles.addTodo}>

            <Formik
                initialValues={{ title: '', check: false }}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    submitHandler(values.title);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            multiline
                            style={globalStyles.input}
                            placeholder='New Todo..'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        {/* <Text style={globalStyles.errorText}>{}</Text> */}

                        <FlatButton text='add todo' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // flex: 5,
    },
    addTodo: {

        // width: 100,
        // backgroundColor: '#222',
        // height: 100%,,
        // backgroundColor: '#444',
        alignItems: 'stretch',
        // alignSelf: 'center',
        justifyContent: 'center',

        // flexDirection: 'row',
    }
})