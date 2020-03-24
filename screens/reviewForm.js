import React from 'react'
import { Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import * as yup from 'yup'
import FlatButtton from '../shared/button'

const reviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(3),
})

export default function ReviewForm({ funcTodo }) {
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ title: ''}}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    funcTodo(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            multiline
                            style={globalStyles.input}
                            placeholder='Review title'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        {/* <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text> */}
                        <FlatButtton text='submit' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
    )
}