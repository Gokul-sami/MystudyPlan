import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as Progress from 'react-native-progress'; // Import Progress component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

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
  const [currentTopic, setCurrentTopic] = useState(0); // Track the current topic
  const [progress, setProgress] = useState(0.38); // Default progress value (18%)

  const navigation = useNavigation(); // Get navigation instance

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

  const renderTopic = (index, topic, link) => {
    const isLeftAligned = index % 2 === 0; // Alternate alignment
    return (
      <View
        style={[styles.topicContainer, isLeftAligned ? styles.alignLeft : styles.alignRight]}
        key={link}
      >
        <Text style={styles.numberText}>{index + 1}.</Text>
        <View style={styles.topicContent}>
          <Text style={styles.topicText}>{topic}</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkClick(link)}
          >
            <Text style={styles.linkButtonText}>Go to Link</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DevOps Learning Path</Text>
      <Text style={styles.subtitle}>Follow the topics from beginning to end to learn DevOps</Text>

      {/* Progress bar - placed under the title and description */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {Math.round(progress * 100)}%</Text>
        <Progress.Bar progress={progress} width={null} color="#2e6075" />
      </View>

      {/* Render topics */}
      {links.map((item, index) => renderTopic(index, item.topic, item.link))}

      {/* Show project section */}
      <View style={styles.projectContainer}>
        <Text style={styles.projectTitle}>Project</Text>
        <Text style={styles.projectDescription}>
          Develop a CI/CD pipeline to automate the deployment of a simple web application. Include steps for Continuous Integration, containerization, and automated deployment on a cloud platform.
        </Text>
        <Button title="Submit Project File" onPress={handleFilePick} color="#2e6075" />
        {selectedFile && (
          <Text style={styles.fileName}>Selected file: {selectedFile.name}</Text>
        )}
      </View>

      {/* Separate 'Go to Events' button */}
      <View style={styles.eventsButtonContainer}>
        <Button title="Go to Events" onPress={() => navigation.navigate('Events')} color="#2e6075" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e4a5d',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  progressContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2e6075',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#bfe8e0',
    maxWidth: '80%',
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e6075',
    marginRight: 10,
  },
  topicContent: {
    flex: 1,
  },
  topicText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  linkButton: {
    marginTop: 10,
    backgroundColor: '#2e6075',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  projectContainer: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2e6075',
    borderRadius: 10,
    backgroundColor: '#bfe8e0',
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  projectDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  eventsButtonContainer: {
    marginTop: 30,
    marginBottom: 40,
    // alignItems: 'center', // Center the button horizontally
  },
});

export default DevOpsScreen;
