import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Button, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress'; // Import the progress bar
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const DevOpsScreen = () => {
  const [links, setLinks] = useState([
    { id: 1, topic: 'DevOps Roadmap', link: 'https://roadmap.sh/devops' },
    { id: 2, topic: 'Introduction to DevOps', link: 'https://opensource.com/article/21/3/devops-documentation' },
    { id: 3, topic: 'Continuous Integration', link: 'https://docs.gitlab.com/ee/ci/' },
    { id: 4, topic: 'Version Control Systems', link: 'https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control' },
    { id: 5, topic: 'Continuous Deployment', link: 'https://docs.gitlab.com/ee/ci/' },
    { id: 6, topic: 'Monitoring & Logging', link: 'https://help.sap.com/doc/saphelp_aii710/7.1/en-US/48/e95541ecfd280ce10000000a42189c/content.htm?no_cache=true' },
    { id: 7, topic: 'Infrastructure as Code', link: 'https://www.cloudknit.io/blog/principles-patterns-and-practices-for-effective-infrastructure-as-code' },
    { id: 8, topic: 'Containers & Orchestration', link: 'https://www.redhat.com/en/topics/containers/what-is-container-orchestration' },
    { id: 9, topic: 'Cloud Computing Basics', link: 'https://www.lucidchart.com/blog/cloud-computing-basics' },
    { id: 10, topic: 'DevOps Tools Overview', link: 'https://www.javatpoint.com/devops-tools' },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
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
            <Text style={styles.linkButtonText}>Open Document</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>DevOps Learning Path</Text>
      </View>
      <Text style={styles.subtitle}>Follow the topics from beginning to end to learn DevOps</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {Math.round(progress * 100)}%</Text>
        <Progress.Circle
          size={150}
          progress={progress}
          showsText={true}
          formatText={(percentage) => `${Math.round(percentage * 100)}%`}
          color="#2e6075"
          unfilledColor="#f0f0f0"
          borderWidth={10}
          thickness={8}
        />
      </View>

      <View style={styles.linksSection}>
        {links.map((item, index) => renderTopic(index, item.topic, item.link, item.id))}
      </View>

      <View style={styles.projectContainer}>
        <Text style={styles.projectTitle}>Project</Text>
        <Text style={styles.projectDescription}>
          Develop a CI/CD pipeline to automate the deployment of a simple web application. Include steps for Continuous Integration, containerization, and automated deployment on a cloud platform.
        </Text>
        <Button title="Submit Project File" onPress={handleFilePick} color="#2e6075" />
        {selectedFile && <Text style={styles.fileName}>Selected file: {selectedFile.name}</Text>}
      </View>

      <View style={styles.eventsButtonContainer}>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Events')}>
          <Text style={styles.linkButtonText}>Go to Events 🪧</Text>
        </TouchableOpacity>
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
  linksSection: { marginBottom: 40 },
  topicContainer: { flexDirection: 'row', marginBottom: 20, borderWidth: 1, borderColor: '#2e6075', borderRadius: 10, padding: 15, backgroundColor: '#bfe8e0', maxWidth: '80%' },
  alignLeft: { alignSelf: 'flex-start' },
  alignRight: { alignSelf: 'flex-end' },
  numberText: { fontSize: 20, fontWeight: 'bold', color: '#2e6075', marginRight: 10 },
  topicContent: { flex: 1 },
  topicText: { fontSize: 20, fontWeight: 'bold', color: '#000000' },
  linkButton: { marginTop: 10, backgroundColor: '#2e6075', padding: 10, borderRadius: 5, alignItems: 'center' },
  linkButtonText: { color: '#ffffff', fontSize: 16 },
  projectContainer: { marginTop: 30, padding: 20, borderWidth: 3, borderColor: '#000000', borderRadius: 10, backgroundColor: '#ffffff' },
  projectTitle: { fontSize: 24, fontWeight: 'bold', color: '#000000' },
  projectDescription: { marginTop: 10, fontSize: 16, color: '#555', marginBottom: 20, },
  fileName: { marginTop: 10, fontSize: 16, color: '#2e6075' },
  eventsButtonContainer: { 
    padding: 20, 
    marginTop: 0, 
    alignItems: 'center', 
    marginBottom: 20,
  },
  modalContainer: { flex: 1, backgroundColor: '#0e4a5d', paddingTop: 40 },
  closeButton: { padding: 10, backgroundColor: '#2e6075', borderRadius: 5, alignItems: 'center', margin: 10, marginBottom: 20 },
  closeButtonText: { color: '#ffffff', fontSize: 16 },
  webView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default DevOpsScreen;
