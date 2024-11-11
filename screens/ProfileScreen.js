import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { getAuth } from 'firebase/auth';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: 'Your name',
    age: '0',
    currentStudy: 'Eg: Computer Science',
  });
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserInfo({
        email: user.email,
        name: user.displayName || 'Your name',
        age: '25',
        currentStudy: 'Computer Science',
      });
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSave = () => {
    // Save updated profile information here
    console.log('Profile saved:', userInfo);
    setIsEditing(false); // Exit edit mode after saving
  };

  const handleChange = (field, value) => {
    setUserInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userInfo.email}</Text>

        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={userInfo.name}
          editable={isEditing} // Only editable when in edit mode
          onChangeText={(text) => handleChange('name', text)}
        />

        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={userInfo.age}
          editable={isEditing}
          onChangeText={(text) => handleChange('age', text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Current Study:</Text>
        <TextInput
          style={styles.input}
          value={userInfo.currentStudy}
          editable={isEditing}
          onChangeText={(text) => handleChange('currentStudy', text)}
        />
      </View>

      <Button title={isEditing ? "Save Profile" : "Edit Profile"} onPress={isEditing ? handleSave : handleEditToggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
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
  },
});

export default ProfileScreen;
