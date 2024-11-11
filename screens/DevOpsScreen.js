import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const DevOpsScreen = () => {
  const [links, setLinks] = useState([
    { id: 1, topic: 'Introduction to DevOps', link: 'https://example.com/intro-to-devops' },
    { id: 2, topic: 'Continuous Integration', link: 'https://example.com/continuous-integration' },
    { id: 3, topic: 'Version Control with Git', link: 'https://example.com/version-control-with-git' },
    { id: 4, topic: 'Automated Testing', link: 'https://example.com/automated-testing' },
    { id: 5, topic: 'Infrastructure as Code', link: 'https://example.com/infrastructure-as-code' },
    { id: 6, topic: 'Containerization with Docker', link: 'https://example.com/containerization-with-docker' },
    { id: 7, topic: 'Continuous Deployment with Jenkins', link: 'https://example.com/continuous-deployment-with-jenkins' },
    { id: 8, topic: 'Monitoring and Logging', link: 'https://example.com/monitoring-logging' },
    { id: 9, topic: 'Cloud Platforms (AWS, Azure, GCP)', link: 'https://example.com/cloud-platforms' },
    { id: 10, topic: 'DevOps Best Practices', link: 'https://example.com/devops-best-practices' },
    { id: 11, topic: 'Security in DevOps (DevSecOps)', link: 'https://example.com/devsecops' },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleLinkClick = (link) => {
    Linking.openURL(link).catch((err) => console.error('Failed to open URL:', err));
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setSelectedFile(result);
        Alert.alert('File Selected', `Selected file: ${result.name}`);
      }
    } catch (error) {
      console.error('File picking error:', error);
      Alert.alert('Error', 'Failed to select a file.');
    }
  };

  const renderTopic = (topic, link) => {
    return (
      <View style={styles.topicContainer} key={link}>
        <Text style={styles.topicText}>{topic}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => handleLinkClick(link)}
        >
          <Text style={styles.buttonText}>Go to Link</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DevOps Learning Path</Text>
      <Text style={styles.subtitle}>Follow the topics from beginning to end to learn DevOps</Text>

      {links.map((item) => renderTopic(item.topic, item.link))}

      <View style={styles.projectContainer}>
        <Text style={styles.projectTitle}>Project</Text>
        <Text style={styles.projectQuestion}>
          Develop a CI/CD pipeline to automate the deployment of a simple web application. Include steps for Continuous Integration, containerization, and automated deployment on a cloud platform.
        </Text>
        <Button title="Submit Project File" onPress={handleFilePick} />
        {selectedFile && (
          <Text style={styles.fileName}>Selected file: {selectedFile.name}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e4a5d',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  topicContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    // backgroundColor: '#f9f9f9',
    backgroundColor: '#bfe8e0',
  },
  topicText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  dropdownButton: {
    marginTop: 10,
    backgroundColor: '#2e3e50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  projectContainer: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  projectQuestion: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default DevOpsScreen;
