import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, StatusBar, TouchableOpacity, Modal, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

const StudyScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const studyMaterial = [
    { id: '1', subject: 'JavaScript', description: 'Learn the basics of JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
    { id: '2', subject: 'React', description: 'Dive into ReactJS fundamentals', url: 'https://reactjs.org/docs/getting-started.html' },
    { id: '3', subject: 'Node.js', description: 'Introduction to backend with Node.js', url: 'https://nodejs.org/en/docs/' },
    { id: '4', subject: 'HTML', description: 'Learn the structure of web pages', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { id: '5', subject: 'CSS', description: 'Styling web pages with CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { id: '6', subject: 'Python', description: 'Introduction to Python programming', url: 'https://www.python.org/doc/' },
    { id: '7', subject: 'Ruby', description: 'Getting started with Ruby', url: 'https://www.ruby-lang.org/en/documentation/' },
    { id: '8', subject: 'Java', description: 'Java basics and object-oriented programming', url: 'https://docs.oracle.com/javase/tutorial/' },
    { id: '9', subject: 'Swift', description: 'Learning iOS development with Swift', url: 'https://developer.apple.com/swift/' },
    { id: '10', subject: 'React Native', description: 'Building mobile apps with React Native', url: 'https://reactnative.dev/docs/getting-started' },
    { id: '11', subject: 'Git', description: 'Version control using Git', url: 'https://git-scm.com/doc' },
    { id: '12', subject: 'Docker', description: 'Containerization with Docker', url: 'https://docs.docker.com/' },
    { id: '13', subject: 'Machine Learning', description: 'Introduction to machine learning algorithms', url: 'https://scikit-learn.org/stable/user_guide.html' },
    { id: '14', subject: 'Data Science', description: 'Exploring data with Python and R', url: 'https://www.datacamp.com/community/tutorials' },
    { id: '15', subject: 'SQL', description: 'Working with databases using SQL', url: 'https://www.sqlshack.com/sql-server-tutorial/' },
  ];

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

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
          <TouchableOpacity onPress={() => handleTopicClick(item)} style={styles.materialItem}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for displaying documentation in WebView */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <WebView source={{ uri: selectedTopic?.url }} style={styles.webView} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#2e6075',
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default StudyScreen;
