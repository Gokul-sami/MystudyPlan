import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig'; // Ensure this path is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (!email || !password) {
      alert('Please fill out all fields');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigation.replace('Home');
      })
      .catch(error => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
});

export default SignUpScreen;
