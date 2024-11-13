import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks(prevTasks => [
        ...prevTasks,
        { id: String(prevTasks.length + 1), name: task, completed: false }
      ]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Back button in the top-left corner */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Enter task"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} style={styles.taskContent}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.name}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeTask(item.id)}>
                <Icon name="delete" size={20} color="#FF6347" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e4a5d',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    color: '#333',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#2e6075',
    padding: 15,
    borderRadius: 10,
  },
  taskItem: {
    backgroundColor: '#bfe8e0',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  taskText: {
    fontSize: 18,
    color: '#000',
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TodoScreen;
