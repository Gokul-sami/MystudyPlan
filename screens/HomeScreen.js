import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Platform, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'; // Import splash screen
import { useFonts } from 'expo-font';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Roboto: Roboto_400Regular,
  });

  const [searchText, setSearchText] = useState('');
  const domains = [
    { id: '1', name: 'DevOps', icon: require('../assets/devops.bmp') },
    { id: '2', name: 'AI', icon: require('../assets/ai-icon.jpg') },
    { id: '3', name: 'WebDev', icon: require('../assets/webdev.bmp') },
    { id: '4', name: 'Backend', icon: require('../assets/backend.bmp') },
    { id: '5', name: 'Database', icon: require('../assets/database.bmp') },
    { id: '6', name: 'Data Analytics', icon: require('../assets/da.bmp') },
    { id: '1', name: 'DevOps', icon: require('../assets/devops.bmp') },
    { id: '2', name: 'AI', icon: require('../assets/ai-icon.jpg') },
    { id: '3', name: 'WebDev', icon: require('../assets/webdev.bmp') },
    { id: '4', name: 'Backend', icon: require('../assets/backend.bmp') },
    { id: '5', name: 'Database', icon: require('../assets/database.bmp') },
    { id: '6', name: 'Data Analytics', icon: require('../assets/da.bmp') },
  ];

  const filteredDomains = domains.filter(domain =>
    domain.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarRow}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search domains..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="user" size={25} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Forum')}
        >
          <Text style={styles.navButtonText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Todo')}
        >
          <Text style={styles.navButtonText}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Study')}
        >
          <Text style={styles.navButtonText}>Study</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Choose Your Domain</Text>

      <FlatList
        data={filteredDomains}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.domainBox}
            onPress={() => navigation.navigate('DevOps')}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.domainText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e4a5d',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    alignItems: 'center',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    color: '#000',
    fontSize: 14,
    width: '70%',
    marginRight: 10,
  },
  profileButton: {
    backgroundColor: '#2e6075',
    padding: 10,
    borderRadius: 8,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2e6075',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginVertical: 20,
    fontFamily: 'Roboto',
  },
  grid: {
    justifyContent: 'center',
    paddingTop: 20,
  },
  domainBox: {
    width: '45%',
    backgroundColor: '#bfe8e0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {
    width: 130,
    height: 80,
    marginBottom: 10,
  },
  domainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen;
