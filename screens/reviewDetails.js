import React, { useState, useEffect } from 'react'
import Card from '../shared/card'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Modal, AsyncStorage, ActivityIndicator } from 'react-native'
import TodoItem from '../components/todoItem'
import AddTodo from '../components/addTodo'
import { globalStyles } from '../styles/global'
import { MaterialIcons } from '@expo/vector-icons'
import EditForm from './editForm'
import axios from 'axios';
import FlatButton from '../shared/button';


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

    useEffect(() => {
        storeData();
    }, []);


    const storeData = () => {
        setloading(false);
        setOffline(false);
        axios.get('https://my-json-server.typicode.com/DoaaWael/ReactNative/TodoPoint', {
            params: {
                todoListKey: id
            }
        }).then((res => {
            AsyncStorage.setItem('TodoPoint', JSON.stringify(res.data));
        })).catch(error => { console.log(error + "Error"), setOffline(true) });
        displayData();

    }

    const displayData = async () => {

        try {
            let list = await AsyncStorage.getItem('TodoPoint');
            setList(JSON.parse(list));
            setloading(true);

        } catch (error) {
            setOffline(true);
            console.log(error);
        }
    }


    useEffect(() => {
        item.title = todoTitle;
        let list = todoList;
        editTodo(item);
        console.log(list);
        updateAll();
    }, [todoList, todoTitle])

    const updateAll = async () => {
        try {
            await AsyncStorage.setItem('TodoPoint', JSON.stringify(todoList))
                .catch(error => { console.log(error + "Error") });
        } catch (error) {
            console.log(error);
        }
    }

    const submitHandler = (title) => {
        if (title.length > 3) {

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

    const checkHandler = async (todoPoint) => {
        setList(() => {

            if (todoPoint.check) {
                todoPoint.check = false;
            } else {
                todoPoint.check = true;
            }
            return todoList;
        })
        updateAll();
    }

    const deleteHandler = (item) => {
        var key = item.key;
        setList((prevList) => {
            return [...prevList.filter(item => item.key != key)];
        })
        updateAll();
    }

    const editHandler = (item) => {
        setList((prevList) => {
            return [item, ...prevList.filter((todoitem) => todoitem.key != item.key)]
        })
        updateAll();
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
