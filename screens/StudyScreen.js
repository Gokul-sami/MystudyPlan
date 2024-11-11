import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StudyScreen = ({ navigation }) => {
  const [studyMaterial, setStudyMaterial] = useState([
    { id: '1', subject: 'JavaScript', description: 'Learn the basics of JavaScript' },
    { id: '2', subject: 'React', description: 'Dive into ReactJS fundamentals' },
    { id: '3', subject: 'Node.js', description: 'Introduction to backend with Node.js' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Materials</Text>
      {studyMaterial.map((item) => (
        <View key={item.id} style={styles.material}>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text>{item.description}</Text>
        </View>
      ))}
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  material: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '100%',
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudyScreen;
