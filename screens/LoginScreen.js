import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please fill out all fields');
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigation.replace('Home');
      })
      .catch((error) => {
        setLoading(false);
        console.error("Login Error: ", error);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Ionicons name="person-circle-outline" size={100} color="#ffffff" style={styles.icon} />

      <TextInput 
        placeholder="Email" 
        placeholderTextColor="#cccccc"
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Password" 
        placeholderTextColor="#cccccc"
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0e4a5d', padding: 20 },
  title: { fontSize: 28, color: '#ffffff', marginBottom: 20, fontWeight: 'bold' },
  icon: { marginBottom: 20 },
  input: { height: 50, borderColor: '#cccccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, fontSize: 16, color: '#ffffff', marginBottom: 20, width: '90%' },
  button: { backgroundColor: '#1f8a9f', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8, width: '90%', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  signupText: { color: '#ffffff', fontSize: 16, marginTop: 20 },
});

export default LoginScreen;
