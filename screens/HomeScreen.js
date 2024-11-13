import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Platform, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'; 
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
          <Icon name="user" size={20} color="#ffffff" />
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
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    alignItems: 'center',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    fontSize: 14,
    width: '75%',
    marginRight: 8,
    color: '#333',
    elevation: 1,
  },
  profileButton: {
    backgroundColor: '#005f73',
    padding: 10,
    borderRadius: 12,
    elevation: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#94d2bd',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  navButtonText: {
    color: '#0e4a5d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    color: '#ffffff',
    marginVertical: 18,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
    paddingTop: 20,
  },
  domainBox: {
    width: '45%',
    backgroundColor: '#bfe8e0',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 2,
  },
  icon: {
    width: 100,
    height: 60,
    marginBottom: 8,
  },
  domainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default HomeScreen;
