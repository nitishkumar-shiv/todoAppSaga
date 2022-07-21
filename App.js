import React, { useState, useEffect } from "react";
import {
  SafeAreaView, StyleSheet, TouchableOpacity,
  TextInput, View, FlatList, Image, Text,
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { addTodo, checkTodo, deleteTodo, editTodo, fetchData } from './src/actions/index';

const App = () => {
  const todolist = useSelector((state) => state.todoReducer.todolist)
  const dispatch = useDispatch();
  const [text, settext] = useState('');
  const [toggle, settoggle] = useState(true);
  const [eid, seteid] = useState(null);

  useEffect(() => {
    dispatch(fetchData())
  }
    , []);

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.headingView}>
        <Image
          style={styles.images}
          source={require('./assets/rently-icon.png')}
        />
        <Text style={styles.headingText}>TO~DO~APP</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="what do you want to do? type here..."
          placeholderTextColor={"#fff8dc"}
          value={text}
          onChangeText={(x) => settext(x)}
        />

        {toggle ?
          <TouchableOpacity style={styles.button} onPress={() => {
            dispatch(addTodo(text));
            settext('');
          }}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity> :

          <TouchableOpacity style={styles.button} onPress={() => {
            settoggle(!toggle);
            dispatch(editTodo(eid, text));
            seteid(null);
            settext('');
          }}>
            <Image
              style={styles.images}
              source={require('./assets/edit-icon.png')}
            />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.listView}>
        <Text style={styles.listHeading}>~To Do Items~</Text>
        <FlatList
          data={todolist}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.flatlistcontainer}>
              <View>
                <TouchableOpacity onPress={() => dispatch(checkTodo(item.id))}>
                  <Image
                    style={styles.images}
                    source={require('./assets/tic-icon.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.flatlistView}>
                <Text style={{
                  textDecorationLine: item.isChecked ? 'line-through' : 'none',
                  textDecorationStyle: 'solid'
                }}>{item.name}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                settoggle(!toggle);
                settext(item.name);
                seteid(item.id);
              }}>
                <Image
                  style={styles.images}
                  source={require('./assets/edit-icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
                <Image
                  style={styles.images}
                  source={require('./assets/sign-delete-icon.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },

    headingView: {
      flex: 1 / 15,
      flexDirection: "row",
      backgroundColor: "#0000ff",
      marginLeft: 3,
      marginRight: 3,
      borderWidth: 2,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      justifyContent: "center",
      alignItems: "center",
    },

    headingText: {
      fontSize: 30,
      color: "#fff8dc"
    },

    inputView: {
      flex: 1 / 8,
      backgroundColor: "#0000ff",
      margin: 3,
      borderRadius: 15,
      alignItems: "center",
      flexDirection: "row",
    },

    inputText: {
      borderWidth: 2,
      borderColor: "#fff8dc",
      height: 40,
      width: 300,
      marginLeft: 3,
      color: "#fff8dc",
    },

    button: {
      marginLeft: 15,
      backgroundColor: "#00ffff",
      height: 50,
      width: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#0000ff"
    },

    listView: {
      flex: 1,
      backgroundColor: "#0000ff",
      margin: 3,
      borderRadius: 15,
      alignItems: "center"
    },

    listHeading: {
      color: "#fff8dc",
      fontSize: 22,
      fontStyle: "italic",
      textDecorationLine: 'underline'
    },

    flatlistView: {
      backgroundColor: "#fffaf0",
      height: 50,
      width: 260,
      margin: 5,
      justifyContent: "center"
    },

    images: {
      height: 35,
      width: 35,
    },

    flatlistcontainer: {
      flexDirection: "row",
      backgroundColor: "#fffaf0",
      borderRadius: 20,
      marginBottom: 5,
      alignItems: "center"
    }
  }
)
export default App;