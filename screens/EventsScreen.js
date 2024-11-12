import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Linking } from 'react-native';
import * as Progress from 'react-native-progress'; // Import Progress component

const EventsScreen = () => {
  const devOpsEvents = [
    {
      id: 1,
      name: 'DevOps Conference 2024',
      date: 'Jan 15, 2024',
      description: 'A global conference for DevOps professionals to network and learn about the latest trends in DevOps practices.',
      link: 'https://devops-conference-2024.com'
    },
    {
      id: 2,
      name: 'Docker & Kubernetes Workshop',
      date: 'Feb 5, 2024',
      description: 'Hands-on workshop on containerization with Docker and Kubernetes for DevOps practitioners.',
      link: 'https://docker-k8s-workshop.com'
    },
  ];

  const quizzes = [
    {
      id: 1,
      name: 'DevOps Knowledge Quiz',
      date: 'March 10, 2024',
      description: 'Test your knowledge on DevOps concepts and practices in this interactive quiz.',
      link: 'https://devops-quiz.com'
    },
    {
      id: 2,
      name: 'CI/CD Pipeline Quiz',
      date: 'April 18, 2024',
      description: 'Take this quiz to evaluate your understanding of CI/CD pipelines and automation.',
      link: 'https://cicd-quiz.com'
    },
  ];

  const hackathons = [
    {
      id: 1,
      name: 'DevOps Hackathon 2024',
      date: 'May 22, 2024',
      description: 'Join the DevOps Hackathon and collaborate with teams to solve real-world DevOps challenges.',
      link: 'https://devops-hackathon.com'
    },
    {
      id: 2,
      name: 'Cloud Infrastructure Hackathon',
      date: 'June 10, 2024',
      description: 'Participate in this hackathon to create cloud infrastructure solutions and gain exposure to the latest cloud technologies.',
      link: 'https://cloud-hackathon.com'
    },
  ];

  const handleLinkClick = (link) => {
    Linking.openURL(link).catch((err) => console.error('Failed to open URL:', err));
  };

  const renderEvent = (event) => (
    <View style={styles.eventContainer} key={event.id}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDate}>{event.date}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => handleLinkClick(event.link)}
      >
        <Text style={styles.linkButtonText}>Go to Event</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upcoming DevOps Events</Text>

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

      {/* Additional Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {/* <Button title="Go to DevOps Screen" onPress={(DevOps) => {}} color="#2e6075" /> */}
        {/* <Button title="Go to Events" onPress={() => {}} color="#2e6075" /> */}
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
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default EventsScreen;
