import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useStore } from './store'; // assuming you've set up Zustand store

export default function App() {
  const [taskInput, setTaskInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [editId, setEditId] = useState(null);
  const { tasks, addTask, deleteTask, editTask } = useStore();

  const handleAddTask = () => {
    addTask(taskInput);
    setTaskInput('');
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleStartEdit = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const handleFinishEdit = () => {
    editTask(editId, editInput);
    setEditId(null);
    setEditInput('');
  };

  return (
    <ImageBackground source={require('./assets/images/bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Shaira's ToDo List 💖</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add Task"
            value={taskInput}
            onChangeText={setTaskInput}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              {item.id === editId ? (
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.editInput}
                    value={editInput}
                    onChangeText={setEditInput}
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleFinishEdit}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.taskRow}>
                  <Text style={styles.taskText}>{item.text}</Text>
                  <View style={styles.buttons}>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleStartEdit(item.id, item.text)}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(item.id)}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#b80b45',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF80BF',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  list: {
    width: '100%',
  },
  taskItem: {
    borderWidth: 1,
    borderColor: '#FF80BF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    marginRight: 10,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF80BF',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#FF80BF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#FF80BF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#FF80BF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF80BF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
