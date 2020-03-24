import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/global'
import Card from '../shared/card'

export default function Home() {
    return (
        <View style={globalStyles.container}>
            <Card>
                <Text>To Do is a task management application. It allows users to manage their tasks from a smartphone.</Text>
                {/* <br /> */}
                <Text>Credit: Doaa Wael</Text>
                <Text>Thanks to The Net Ninja</Text>
            </Card>
        </View>
    )
}

