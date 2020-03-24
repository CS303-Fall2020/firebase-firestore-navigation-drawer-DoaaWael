import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';
// import Card from '../shared/card'

export default function ({ item, pressHandler, deleteHandler }) {

    // const [check, setcheck] = useState(item.check);
    // const [checkIcon, setIcon] = useState("check-box-outline-blank");

    // useEffect(() => {

    //     if (check == true) {
    //         setIcon("check-box")
    //     } else if (check == false) {
    //         setIcon("check-box-outline-blank")
    //     }

    // });

    return (

        <TouchableOpacity onPress={() => { pressHandler(item) }}>
            <View style={styles.item}>
                <View style={styles.left}>
                    {/* <MaterialIcons onPress={() => { pressHandler(item) }} name={checkIcon} size={18} color='#333' /> */}
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
                <MaterialIcons onPress={deleteHandler} style={styles.delete} name='delete' size={18} color='#333' />
            </View>
        </TouchableOpacity>

    )
}





const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 5,
    },
    itemText: {
        // flex: 2,
        marginLeft: 10,
        // marginRight: 10,
        fontSize: 16,
        fontFamily: 'nunito-regular',
    },
    left: {
        flex: 26,
        flexDirection: 'row',
    },
    delete: {
        flex: 2,
        marginHorizontal: 5,
        
    }

})