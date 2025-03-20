import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const CreateStudyPath = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const domains = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'DevOps' },
    { id: 3, name: 'NodeJs' },
  ];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const renderForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Help us create your personalised study path</Text>
      <Text style={styles.label}>Select your Topic:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDomain}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDomain(itemValue)}
        >
          {domains.map((domain) => (
            <Picker.Item key={domain.id} label={domain.name} value={domain.name} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>What is your current level of knowledge in this topic?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLevel(itemValue)}
        >
          {levels.map((level, index) => (
            <Picker.Item key={index} label={level} value={level} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>How many hours per week can you dedicate to studying this topic?</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 5 hours"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Give us more information </Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your learning strategy, methods, goals"
        placeholderTextColor="#888"
        multiline
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Your Study Path</Text>
      </View>
      {renderForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e4a5d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: 10,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#94d2bd',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: '100%',
    color: '#000',
    paddingHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#0e4a5d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    height: 50,
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#0e4a5d',
    fontWeight: 'bold',
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

export default CreateStudyPath;
