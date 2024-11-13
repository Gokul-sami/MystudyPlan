import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getAuth, signOut, updateProfile } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: 'Your name',
    age: '20',
    currentStudy: 'Eg: Computer Science',
    profilePicture: null, // Default profile picture
  });
  const [isEditing, setIsEditing] = useState(false);

  // Predefined profile picture options
  const profileImages = [
    require('../assets/profile_pics/pro1.jpg'),
    require('../assets/profile_pics/pro2.jpg'),
    require('../assets/profile_pics/pro3.jpg'),
    // require('../assets/profile_pics/pro4.jpg'),
    require('../assets/profile_pics/pro5.jpg'),
    require('../assets/profile_pics/pro6.jpg'),
    // require('../assets/profile_pics/pro7.jpg'),
    require('../assets/profile_pics/pro8.jpg'),
    // require('../assets/profile_pics/pro9.jpg'),
    require('../assets/profile_pics/pro10.jpg'),
    require('../assets/profile_pics/pro11.jpg'),
  ];

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserInfo({
        email: user.email,
        name: user.displayName || 'Your name',
        age: '20',
        currentStudy: 'Computer Science',
        profilePicture: user.photoURL || profileImages[0], // Default to the first image
      });
    }
  }, []);

  const handleEditToggle = () => setIsEditing(prevState => !prevState);

  const handleSave = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, {
        displayName: userInfo.name,
        photoURL: userInfo.profilePicture, // Update the profile picture in Firebase
      })
        .then(() => {
          console.log('Profile updated');
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        });
    }
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setUserInfo(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  const handleProfilePictureSelect = image => {
    setUserInfo(prevState => ({ ...prevState, profilePicture: image }));
  };

  const renderInputField = (label, value, editable, onChangeText, keyboardType = 'default') => (
    <>
      <Text style={styles.label}>{label}</Text>
      {editable ? (
        <TextInput
          style={[styles.input, styles.editableInput]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.text}>{value}</Text>
      )}
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileCard}>
        {/* Profile Picture */}
        <TouchableOpacity onPress={handleEditToggle}>
          <Image source={userInfo.profilePicture} style={styles.profileImage} />
        </TouchableOpacity>

        {/* Email */}
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userInfo.email}</Text>

        {/* Editable fields */}
        {renderInputField('Name:', userInfo.name, isEditing, text => handleChange('name', text))}
        {renderInputField('Age:', userInfo.age, isEditing, text => handleChange('age', text), 'numeric')}
        {renderInputField('Current Study:', userInfo.currentStudy, isEditing, text => handleChange('currentStudy', text))}

      </View>

      {/* Profile Picture Options */}
      {isEditing && (
        <View style={styles.profilePictureOptions}>
          {profileImages.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleProfilePictureSelect(image)}>
              <Image
                source={image}
                style={[styles.profileOption, userInfo.profilePicture === image && styles.selectedImage]}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <TouchableOpacity style={styles.button} onPress={isEditing ? handleSave : handleEditToggle}>
        <Text style={styles.buttonText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0e4a5d',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  profileCard: {
    backgroundColor: '#2a6b7d',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#0f0f0f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    color: '#aad1d6',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#2b6a74',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#346b77',
    marginBottom: 16,
    width: '100%',
  },
  editableInput: {
    backgroundColor: '#3d8594',
  },
  button: {
    backgroundColor: '#1f8a9f',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#ff4d4d',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profilePictureOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  profileOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: '#ffffff',
  },
});

export default ProfileScreen;
