import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Study Planner!</Text>
      <Text style={styles.description}>Plan your study, access materials, all in one place.</Text>
      <Button title="Get Started" onPress={() => navigation.replace('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  description: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
});

export default OnboardingScreen;
