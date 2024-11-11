import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

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

  const handleLinkClick = (link) => {
    // Open the link directly
    Linking.openURL(link).catch((err) => console.error('Failed to open URL:', err));
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

      {links.map((item) => (
        renderTopic(item.topic, item.link)
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  topicContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  topicText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DevOpsScreen;
