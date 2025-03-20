import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { WebView } from 'react-native-webview'; // Import WebView
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const EventsScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const devOpsEvents = [
    {
      id: 1,
      name: 'DevOps Conference 2024',
      date: 'Jan 15, 2024',
      description: 'A global conference for DevOps professionals to network and learn about the latest trends in DevOps practices.',
      link: 'https://cleancode.training/',
    },
    {
      id: 2,
      name: 'Docker & Kubernetes Workshop',
      date: 'Feb 5, 2024',
      description: 'Hands-on workshop on containerization with Docker and Kubernetes for DevOps practitioners.',
      link: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/?couponCode=BFCPSALE24',
    },
  ];

  const quizzes = [
    {
      id: 1,
      name: 'DevOps Knowledge Quiz',
      date: 'March 10, 2024',
      description: 'Test your knowledge on DevOps concepts and practices in this interactive quiz.',
      link: 'https://www.techtarget.com/searchitoperations/quiz/DevOps-quiz-What-IT-admins-need-to-know',
    },
    {
      id: 2,
      name: 'CI/CD Pipeline Interview Questions',
      date: 'April 18, 2024',
      description: 'Take this quiz to evaluate your understanding of CI/CD pipelines and automation.',
      link: 'https://www.interviewbit.com/ci-cd-interview-questions/',
    },
  ];

  const hackathons = [
    {
      id: 1,
      name: 'DevOps Hackathon 2024',
      date: 'May 22, 2024',
      description: 'Join the DevOps Hackathon and collaborate with teams to solve real-world DevOps challenges.',
      link: 'https://devpost.com/hackathons?themes%5B%5D=DevOps',
    },
    {
      id: 2,
      name: 'Cloud Infrastructure Hackathon',
      date: 'June 10, 2024',
      description: 'Participate in this hackathon to create cloud infrastructure solutions and gain exposure to the latest cloud technologies.',
      link: 'https://innovateindia.mygov.in/nic-cloud-hackathon/',
    },
  ];

  const openWebView = (url) => {
    setCurrentUrl(url);
    setModalVisible(true);
  };

  const renderEvent = (event) => (
    <View style={styles.eventContainer} key={event.id}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDate}>{event.date}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => openWebView(event.link)}
      >
        <Text style={styles.linkButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Upcoming DevOps Events</Text>
      </View>

      {/* DevOps Events Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>DevOps Events</Text>
        <Progress.Bar progress={0.5} width={null} color="#2e6075" />
        {devOpsEvents.map(renderEvent)}
      </View>

      {/* Quizzes Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Quizzes</Text>
        <Progress.Bar progress={0.6} width={null} color="#2e6075" />
        {quizzes.map(renderEvent)}
      </View>

      {/* Hackathons Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hackathons</Text>
        <Progress.Bar progress={0.7} width={null} color="#2e6075" />
        {hackathons.map(renderEvent)}
      </View>

      {/* Modal for WebView */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <WebView source={{ uri: currentUrl }} style={styles.webView} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
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
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  eventContainer: {
    backgroundColor: '#bfe8e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2e6075',
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  eventDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  linkButton: {
    backgroundColor: '#2e6075',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#2e6075',
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
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

export default EventsScreen;
