import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StudyScreen = ({ navigation }) => {
  const studyMaterial = [
    { id: '1', subject: 'JavaScript', description: 'Learn the basics of JavaScript' },
    { id: '2', subject: 'React', description: 'Dive into ReactJS fundamentals' },
    { id: '3', subject: 'Node.js', description: 'Introduction to backend with Node.js' },
    { id: '4', subject: 'HTML', description: 'Learn the structure of web pages' },
    { id: '5', subject: 'CSS', description: 'Styling web pages with CSS' },
    { id: '6', subject: 'Python', description: 'Introduction to Python programming' },
    { id: '7', subject: 'Ruby', description: 'Getting started with Ruby' },
    { id: '8', subject: 'Java', description: 'Java basics and object-oriented programming' },
    { id: '9', subject: 'Swift', description: 'Learning iOS development with Swift' },
    { id: '10', subject: 'React Native', description: 'Building mobile apps with React Native' },
    { id: '11', subject: 'Git', description: 'Version control using Git' },
    { id: '12', subject: 'Docker', description: 'Containerization with Docker' },
    { id: '13', subject: 'Machine Learning', description: 'Introduction to machine learning algorithms' },
    { id: '14', subject: 'Data Science', description: 'Exploring data with Python and R' },
    { id: '15', subject: 'SQL', description: 'Working with databases using SQL' },
  ];

  return (
    <View style={styles.container}>
      {/* Back button in the top-left corner */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#ffffff" />
      </TouchableOpacity>

      <Text style={styles.title}>Study Materials</Text>

      {/* List of study materials */}
      <FlatList
        data={studyMaterial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.materialItem}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.description}>{item.description}</Text>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 30,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 70,
    fontWeight: '600',
  },
  materialItem: {
    backgroundColor: '#e0f7f5',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  subject: {
    fontSize: 20,
    color: '#084C61',
    fontWeight: '500',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333333',
  },
});

export default StudyScreen;
