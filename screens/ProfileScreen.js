import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signOut, updateProfile } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: 'Your name',
    age: '20',
    currentStudy: 'Eg: Computer Science',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserInfo({
        email: user.email,
        name: user.displayName || 'Your name',
        age: '20',
        currentStudy: 'Computer Science',
      });
    }
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      updateProfile(user, {
        displayName: userInfo.name,
      }).then(() => {
        console.log('Profile updated');
      }).catch(error => {
        console.error('Error updating profile:', error);
      });
    }
    
    console.log('Profile saved:', userInfo);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setUserInfo(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.replace('Login');
    }).catch(error => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userInfo.email}</Text>

        <Text style={styles.label}>Name:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.editableInput]}
            value={userInfo.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        ) : (
          <Text style={styles.text}>{userInfo.name}</Text>
        )}

        <Text style={styles.label}>Age:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.editableInput]}
            value={userInfo.age}
            onChangeText={(text) => handleChange('age', text)}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.text}>{userInfo.age}</Text>
        )}

        <Text style={styles.label}>Current Study:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.editableInput]}
            value={userInfo.currentStudy}
            onChangeText={(text) => handleChange('currentStudy', text)}
          />
        ) : (
          <Text style={styles.text}>{userInfo.currentStudy}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={isEditing ? handleSave : handleEditToggle}>
        <Text style={styles.buttonText}>{isEditing ? "Save Profile" : "Edit Profile"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e4a5d',
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    width: '100%',
    color: '#ffffff',
    backgroundColor: '#2e6b78',
  },
  editableInput: {
    backgroundColor: '#3b899c',
  },
  button: {
    backgroundColor: '#1f8a9f',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#ff4d4d',
    marginTop: 15,
  },
});

export default ProfileScreen;
