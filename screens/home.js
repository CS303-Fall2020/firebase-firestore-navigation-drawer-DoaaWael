import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  Button
} from 'react-native'
import { globalStyles } from '../styles/global'
import { MaterialIcons } from '@expo/vector-icons'
import ReviewForm from './reviewForm'
import TodoItems from '../components/todoItems'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler'
import FlatButton from '../shared/button'
import * as firebase from 'firebase'


export default function Home({ navigation }) {

  const [todos, setTodoes] = useState([]);

  const [Loading, setloading] = useState(false);

  const [offline, setOffline] = useState(false);

  const [addModalOpen, setAddModelOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {

    setloading(false);
    setOffline(false);
    axios.get('https://my-json-server.typicode.com/DoaaWael/ReactNative/TodoList')
      .then((res => {
        setloading(true);
        AsyncStorage.setItem('TodoList', JSON.stringify(res.data));
      })
      ).catch(error => { console.log(error + "Error"), setOffline(true) });
    if (!offline) {
      displayData();
    }

  }


  const updateAll = async () => {
    try {
      await AsyncStorage.setItem('TodoList', JSON.stringify(todos))
        .catch(error => { console.log(error + "Error") });
    } catch (error) {
      console.log(error);
    }
  }

  const displayData = async () => {

    try {
      let todoList = await AsyncStorage.getItem('TodoList');
      setTodoes(JSON.parse(todoList));
      console.log(todos)

    } catch (error) {
      setOffline(true);
      console.log(error);
    }
  }



  const addTodo = (todo) => {
    if (todo.title.length > 3) {
      todo.key = Date.now().toString();
      setTodoes((prevTodos) => {
        return [
          todo,
          ...prevTodos
        ]
      })
    } else {
      Alert.alert('OOPS', 'Todos must be over 3 chars long', [
        { text: 'understood', onPress: () => console.log('alert closed') }
      ]);
    }
    setAddModelOpen(false);
  }


  const editTodo = (item) => {
    var key = item.key;
    setTodoes((prevTodos) => {
      return [item, ...prevTodos.filter(todo => todo.key != key)]
    })
    // updateAll();
  }

  const deleteHandler = (item) => {
    var key = item.key;
    setTodoes((prevTodos) => {
      return [...prevTodos.filter(todo => todo.key != key)];
    })
    updateAll();
  }

  const onLogoutPress = () => {
    console.log('logout');
    firebase.auth().signOut();
  }

  useEffect(() => {

    let list = todos;
    // updateAll();
  }, [todos])


  return (

    <View style={styles.container}>
      <Button title='logout' onPress={onLogoutPress} />
      <StatusBar backgroundColor="#4f6d7a"
        barStyle='light-content'
      />

      {offline ? (
        <View style={globalStyles.offline}>
          <TouchableOpacity onPress={loadData}>
            <Text>It seems you are offline. Please tap here or press Refresh when you get connected</Text>
          </TouchableOpacity>
        </View>
      ) :
        <View />}
      <Modal visible={addModalOpen} animationType='slide'>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={globalStyles.modelContent}>
            <MaterialIcons name='close'
              size={24}
              onPress={() => setAddModelOpen(false)}
              style={{ ...globalStyles.modelToggle, ...globalStyles.modelClose }}
            />

            <ReviewForm funcTodo={addTodo} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons name='add'
        size={24}
        onPress={() => setAddModelOpen(true)}
        style={globalStyles.modelToggle}
      />
      <View style={styles.content}>
        <View style={{padding: 20}}>
          <Text>Hello {firebase.auth().currentUser.email}</Text>
        </View>
        <View style={styles.list}>
          {!Loading && !offline ? (
            <ActivityIndicator style={styles.loading} size={"large"} color="#333" />
          ) : (
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItems item={item} deleteHandler={() => deleteHandler(item)} pressHandler={() => navigation.navigate('ReviewDetails', { item: item, editTodo: editTodo })} />
                )}
              />)}
        </View>
      </View>
      <View style={globalStyles.refresh}>
        <FlatButton text="Refresh" onPress={loadData} />
      </View>
    </View >


  );
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 120,
  },
  offline: {
    padding: 14,
    backgroundColor: '#ddd',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',

  }


})
