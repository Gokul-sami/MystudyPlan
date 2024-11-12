import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Button, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';

const DevOpsScreen = () => {
  const [links, setLinks] = useState([
    { id: 1, topic: 'Introduction to DevOps', link: 'https://www.javatpoint.com/devops' },
    { id: 2, topic: 'Continuous Integration', link: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd' },
    { id: 3, topic: 'Version Control Systems', link: 'https://example.com/version-control' },
    { id: 4, topic: 'Continuous Deployment', link: 'https://example.com/continuous-deployment' },
    { id: 5, topic: 'Monitoring & Logging', link: 'https://example.com/monitoring-logging' },
    { id: 6, topic: 'Infrastructure as Code', link: 'https://example.com/infrastructure-as-code' },
    { id: 7, topic: 'Containers & Orchestration', link: 'https://example.com/containers-orchestration' },
    { id: 8, topic: 'Cloud Computing Basics', link: 'https://example.com/cloud-computing' },
    { id: 9, topic: 'DevOps Tools Overview', link: 'https://example.com/devops-tools' },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0.38);
  const [collapsed, setCollapsed] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const navigation = useNavigation();

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

  const handleDropdownToggle = (link) => {
    setCurrentLink(link);
    setModalVisible(true);
  };

  const renderTopic = (index, topic, link, id) => {
    const isLeftAligned = index % 2 === 0;
    return (
      <View style={[styles.topicContainer, isLeftAligned ? styles.alignLeft : styles.alignRight]} key={id}>
        <Text style={styles.numberText}>{index + 1}.</Text>
        <View style={styles.topicContent}>
          <Text style={styles.topicText}>{topic}</Text>
          <TouchableOpacity style={styles.linkButton} onPress={() => handleDropdownToggle(link)}>
            <Text style={styles.linkButtonText}>Show Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DevOps Learning Path</Text>
      <Text style={styles.subtitle}>Follow the topics from beginning to end to learn DevOps</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {Math.round(progress * 100)}%</Text>
        <LinearGradient colors={['#2e6075', '#bfe8e0']} start={[0, 0]} end={[1, 0]} style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {links.map((item, index) => renderTopic(index, item.topic, item.link, item.id))}

      <View style={styles.projectContainer}>
        <Text style={styles.projectTitle}>Project</Text>
        <Text style={styles.projectDescription}>
          Develop a CI/CD pipeline to automate the deployment of a simple web application. Include steps for Continuous Integration, containerization, and automated deployment on a cloud platform.
        </Text>
        <Button title="Submit Project File" onPress={handleFilePick} color="#2e6075" />
        {selectedFile && <Text style={styles.fileName}>Selected file: {selectedFile.name}</Text>}
      </View>

      <View style={styles.eventsButtonContainer}>
        <Button title="Go to Events" onPress={() => navigation.navigate('Events')} color="#2e6075" />
      </View>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <WebView source={{ uri: currentLink }} style={styles.webView} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e4a5d', paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 18, color: '#ffffff', textAlign: 'center', marginBottom: 30 },
  progressContainer: { marginVertical: 20, alignItems: 'center' },
  progressText: { fontSize: 16, color: '#ffffff', marginBottom: 10 },
  progressBar: { height: 10, borderRadius: 5 },
  topicContainer: { flexDirection: 'row', marginBottom: 20, borderWidth: 1, borderColor: '#2e6075', borderRadius: 10, padding: 15, backgroundColor: '#bfe8e0', maxWidth: '80%' },
  alignLeft: { alignSelf: 'flex-start' },
  alignRight: { alignSelf: 'flex-end' },
  numberText: { fontSize: 20, fontWeight: 'bold', color: '#2e6075', marginRight: 10 },
  topicContent: { flex: 1 },
  topicText: { fontSize: 20, fontWeight: 'bold', color: '#000000' },
  linkButton: { marginTop: 10, backgroundColor: '#2e6075', padding: 10, borderRadius: 5, alignItems: 'center' },
  linkButtonText: { color: '#ffffff', fontSize: 16 },
  projectContainer: { marginTop: 30, padding: 20, borderWidth: 1, borderColor: '#2e6075', borderRadius: 10, backgroundColor: '#bfe8e0' },
  projectTitle: { fontSize: 24, fontWeight: 'bold', color: '#000000' },
  projectDescription: { marginTop: 10, fontSize: 16, color: '#555' },
  fileName: { marginTop: 10, fontSize: 16, color: '#2e6075' },
  eventsButtonContainer: { marginTop: 30, alignItems: 'center' },
  modalContainer: { flex: 1, backgroundColor: '#0e4a5d', paddingTop: 40 },
  closeButton: { padding: 10, backgroundColor: '#2e6075', borderRadius: 5, alignItems: 'center', margin: 10, marginBottom: 50 },
  closeButtonText: { color: '#ffffff', fontSize: 16 },
  webView: { flex: 1 },
});

export default DevOpsScreen;
