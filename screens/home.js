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
import { decode, encode } from 'base-64'

export default function Home({ navigation }) {


  if (!global.btoa) { global.btoa = encode }

  if (!global.atob) { global.atob = decode }

  const [todos, setTodoes] = useState([]);

  const [Loading, setloading] = useState(false);

  const [offline, setOffline] = useState(false);

  const [addModalOpen, setAddModelOpen] = useState(false);

  var db = firebase.firestore();

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    let list = todos;
  }, [todos])

  const loadData = () => {

    setloading(false);
    setOffline(false);
    db.collection("TodoList").where("userID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        setloading(true);
        setTodoes([]);
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          setTodoes((prevTodos) => {
            return [
              doc.data(),
              ...prevTodos
            ]
          })
        });
      }).catch((error) => console.log(error))
  }

  const addTodo = (todo) => {
    if (todo.title.length > 3) {
      key = Date.now().toString();
      db.collection("TodoList").add({
        title: todo.title,
        key: key,
        userID: firebase.auth().currentUser.uid,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      todo.key = key;
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
    var todoItem = db.collection("TodoList").where('key', '==', key);
    todoItem.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({ title: item.title });
        console.log("Document successfully updated!");
      });
    });
    setTodoes((prevTodos) => {
      return [item, ...prevTodos.filter(todo => todo.key != key)]
    })
  }

  const deleteHandler = (item) => {
    var key = item.key;
    var todoItem = db.collection('TodoList').where('key', '==', key);
    var todoPoint = db.collection('TodoPoint').where('todoListKey', '==', key);
    todoPoint.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
        console.log("Document successfully deleted!");
      });
      todoItem.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
          console.log("Document successfully deleted!");
        });
      });
    });
    setTodoes((prevTodos) => {
      return [...prevTodos.filter(todo => todo.key != key)];
    })
  }

  return (

    <View style={styles.container}>
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
