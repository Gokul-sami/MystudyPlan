import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, StatusBar, Button } from 'react-native';

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
      <Text style={styles.title}>Study Materials</Text>

      {/* List of study materials */}
      <FlatList
        data={studyMaterial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.materialItem}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text>{item.description}</Text>
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
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Roboto',
  },
  materialItem: {
    backgroundColor: '#bfe8e0',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  subject: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5, // Added margin to separate subject from description
  },
  bottomNav: {
    marginTop: 20,
    width: '100%',
    // alignItems: 'center',
  },
});

export default StudyScreen;
