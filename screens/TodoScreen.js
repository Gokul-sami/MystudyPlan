import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Platform, StatusBar, Button } from 'react-native';

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
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Enter task"
        placeholderTextColor="#ddd"
      />
      <Button title="Add Task" onPress={addTask} color="#2e6075" />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.taskContent}>
              <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.completedTask,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeTask(item.id)}
              >
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomNav}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} color="#2e6075" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e4a5d',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 0 : 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Roboto',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#ffffff',
    color: '#ffffff',
  },
  taskItem: {
    backgroundColor: '#bfe8e0',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 50,
  },
  removeText: {
    color: '#fff',
    fontSize: 20,
  },
  bottomNav: {
    marginTop: 20,
    width: '100%',
    // alignItems: 'center',
  },
});

export default TodoScreen;
