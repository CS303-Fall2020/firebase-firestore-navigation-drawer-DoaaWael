import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Modal, AsyncStorage, ActivityIndicator } from 'react-native'
import TodoItem from '../components/todoItem'
import AddTodo from '../components/addTodo'
import { globalStyles } from '../styles/global'
import { MaterialIcons } from '@expo/vector-icons'
import EditForm from './editForm'
import FlatButton from '../shared/button';
import * as firebase from 'firebase'
import { decode, encode } from 'base-64'



export default function ReviewDetails({ navigation }) {

    const item = navigation.getParam('item');
    const id = item.key;
    // const storeData = navigation.getParam('storeData');
    const title = item.title;
    const [Loading, setloading] = useState(false);
    const [editModalOpen, setEditModelOpen] = useState(false);
    const [offline, setOffline] = useState(false);
    const editTodo = navigation.getParam('editTodo');


    const [todoList, setList] = useState([]);
    const [todoTitle, setTodoTitle] = useState(title);

    var db = firebase.firestore();

    if (!global.btoa) { global.btoa = encode }

    if (!global.atob) { global.atob = decode }

    useEffect(() => {
        storeData();
    }, []);


    const storeData = () => {
        setloading(false);
        setOffline(false);
        console.log(item);
        console.log(item.key);
        db.collection("TodoPoint").where("todoListKey", "==", item.key)
            .get()
            .then((querySnapshot) => {
                setloading(true);
                setList([]);
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    setList((prevTodos) => {
                        return [
                            doc.data(),
                            ...prevTodos
                        ]
                    })
                });
            }).catch((error) => { console.log(error), setOffline(true) })


    }


    useEffect(() => {
        item.title = todoTitle;
        let list = todoList;
        editTodo(item);
    }, [todoList, todoTitle])


    const submitHandler = (title) => {
        if (title.length > 3) {
            db.collection("TodoPoint").add({
                title: title,
                key: Date.now().toString(),
                check: false,
                todoListKey: item.key,
            }).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
            setList((prevList) => {
                return [
                    ...prevList,
                    { title: title, check: false, key: Date.now().toString(), todoListKey: id }
                ]
            })
        } else {
            Alert.alert('OOPS', 'Todos must be over 3 chars long', [
                { text: 'understood', onPress: () => console.log('alert closed') }
            ]);
        }

    }

    const checkHandler = async (item) => {

        var todoItem = db.collection("TodoPoint").where('key', '==', item.key);
        todoItem
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(item.check)
                    if (item.check === true) {
                        doc.ref.update({ check: false });
                        item.check = false;
                    } else if (item.check === false) {
                        doc.ref.update({ check: true });
                        item.check = true;
                    }
                });
                setList((prevList) => {
                    return [item, ...prevList.filter((todoitem) => todoitem.key != item.key)]
                })
            });

    }

    const deleteHandler = (item) => {
        var key = item.key;
        var todoItem = db.collection('TodoPoint').where('key', '==', key);
        todoItem.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                doc.ref.delete();
                console.log("Document successfully deleted!");
            });
        });
        setList((prevList) => {
            return [...prevList.filter(item => item.key != key)];
        })

    }

    const editHandler = (item) => {
        var todoItem = db.collection("TodoPoint").where('key', '==', item.key);
        todoItem.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({ title: item.title });
            });
        });
        setList((prevList) => {
            return [item, ...prevList.filter((todoitem) => todoitem.key != item.key)]
        })
    }

    const editTodoTitle = (item) => {
        if (title.length > 3) {

            setTodoTitle((prevItem) => {
                prevItem = item.title;
                return prevItem;
            })
        } else {
            Alert.alert('OOPS', 'Todos must be over 3 chars long', [
                { text: 'understood', onPress: () => console.log('alert closed') }
            ]);
        }
        setEditModelOpen(false);
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {offline ? (
                    <View style={globalStyles.offline}>
                        <TouchableOpacity onPress={storeData}>
                            <Text>It seems you are offline. Please tap here or press Refresh when you get connected</Text>
                        </TouchableOpacity>
                    </View>
                ) :
                    <View />}

                <Modal visible={editModalOpen} animationType='slide'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modelContent}>
                            <MaterialIcons name='close'
                                size={24}
                                onPress={() => setEditModelOpen(false)}
                                style={{ ...globalStyles.modelToggle, ...globalStyles.modelClose }}
                            />

                            <EditForm funcTodo={editTodoTitle} item={item} setModelOpen={setEditModelOpen} />
                        </View>
                    </TouchableWithoutFeedback >
                </Modal>

                <TouchableOpacity onPress={() => setEditModelOpen(true)}>
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>

                <View style={styles.content}>
                    <AddTodo submitHandler={submitHandler} />
                    <View style={styles.list}>
                        {!Loading && !offline ? (
                            <ActivityIndicator style={styles.loading} size={"large"} color="#333" />
                        ) : (
                                <FlatList
                                    data={todoList}
                                    renderItem={({ item }) => (
                                        <TodoItem item={item}
                                            checkHandler={checkHandler}
                                            deleteHandler={() => deleteHandler(item)}
                                            editHandler={editHandler}
                                        />
                                    )}
                                />)}
                    </View>
                </View>
                <View style={globalStyles.refresh}>
                    <FlatButton text="Refresh" onPress={storeData} />
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
        paddingTop: 20,
        flex: 1,
    },
    list: {
        flex: 1,
        marginTop: 10,
    },
    title: {
        marginHorizontal: 18,
        marginVertical: 8,
        padding: 16,
        paddingBottom: 2,
        fontSize: 32,
        color: '#cd5b45',
        textTransform: 'capitalize',

    }

})
