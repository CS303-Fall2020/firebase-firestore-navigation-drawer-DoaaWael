import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
// import Card from '../shared/card'
import EditForm from '../screens/editForm'
import { globalStyles } from '../styles/global'

export default function ({ item, checkHandler, deleteHandler, editHandler }) {

    const [check, setcheck] = useState(item.check);
    const [checkIcon, setIcon] = useState("check-box-outline-blank");
    const [editModalOpen, setEditModelOpen] = useState(false);

    useEffect(() => {

        if (check == true) {
            setIcon("check-box")
        } else if (check == false) {
            setIcon("check-box-outline-blank")
        }

    });

    return (


        // <View style={styles.item}>
        //     <View style={styles.left}>
        //         <MaterialIcons onPress={() => { checkHandler(item), setcheck(!check) }}
        //             name={checkIcon} size={18} color='#333' />
        //         <Text style={styles.itemText}>{item.title}</Text>
        //     </View>
        //     <View style={styles.right}>
        //         <MaterialIcons onPress={deleteHandler} name='delete' size={18} color='#333' />
        //     </View>
        // </View>
        // </TouchableOpacity >
        <View>
            <Modal visible={editModalOpen} animationType='slide'>

                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={globalStyles.modelContent}>
                        <MaterialIcons name='close'
                            size={24}
                            onPress={() => setEditModelOpen(false)}
                            style={{ ...globalStyles.modelToggle, ...globalStyles.modelClose }}
                        />

                        <EditForm funcTodo={editHandler} item={item} setModelOpen={setEditModelOpen} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <TouchableOpacity onPress={() => setEditModelOpen(true)}>
                <View style={styles.item}>
                    <View style={styles.left}>
                        <MaterialIcons onPress={() => { checkHandler(item), setcheck(!check) }}
                            name={checkIcon} size={18} color='#333' />
                        <Text style={styles.itemText}>{item.title}</Text>
                    </View>
                    <View style={styles.right}>
                        <MaterialIcons onPress={deleteHandler} name='delete' size={18} color='#333' />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
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
        // overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 5,

    },
    itemText: {
        marginLeft: 10,
        fontFamily: 'nunito-regular',
        // overflow: 'visible',

    },
    left: {
        flex: 26,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'visible',
    },
    right: {
        flex: 2,
        marginHorizontal: 10,
    
    }

})