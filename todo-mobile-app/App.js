import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, StatusBar } from 'react-native';
import Task from './components/Task';

export default function App() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        if (task) {
            this.textInput.clear();
            Keyboard.dismiss();
            setTaskItems([...taskItems, task])
            setTask(null);
        }
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
    }

    return (
        <View style={styles.container}>
            {/* Added this scroll view to enable scrolling when list gets longer than the page */}
            <StatusBar barStyle={'dark-content'}></StatusBar>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                keyboardShouldPersistTaps='handled'
            >

                {/* Today's Tasks */}
                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>Today's tasks</Text>
                    <View style={styles.items}>
                        {/* This is where the tasks will go! */}
                        {
                            taskItems.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                        <Task text={item} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </ScrollView>

            {/* Write a task */}
            {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task'}
                    value={task}
                    onChangeText={text => setTask(text)}
                    ref={input => { this.textInput = input }}
                />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#5c5c5c'
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 2,
        width: 270,
        height: 60,
        color: '#5c5c5c'
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 2,
    },
    addText: {
        fontSize: 30,
        color: '#C0C0C0'
    },
});
