import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import Icon from 'react-native-vector-icons/FontAwesome';

const DomainSelectionScreen = ({ navigation }) => {
  // Load the custom font
  const [fontsLoaded] = useFonts({
    Pacifico: Pacifico_400Regular,
  });

  const [searchText, setSearchText] = useState('');
  const domains = [
    { id: '1', name: 'DevOps', icon: require('../assets/devops.png') },
    { id: '2', name: 'AI', icon: require('../assets/ai-icon.jpg') },
    { id: '3', name: 'WebDev', icon: require('../assets/webdev-icon.png') },
    { id: '4', name: 'Backend', icon: require('../assets/backend-icon.jpg') },
    { id: '5', name: 'Database', icon: require('../assets/database-icon.png') },
    { id: '6', name: 'Data Analytics', icon: require('../assets/data-analytics-icon.jpg') },
  ];

  const filteredDomains = domains.filter(domain =>
    domain.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* Search Bar and Profile Button in the same row */}
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
          onPress={() => navigation.navigate('Profile')}  // Navigates to Profile page
        >
          <Icon name="user" size={25} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Choose Your Domain?</Text>

      {/* Domain Grid with Searchable List */}
      <FlatList
        data={filteredDomains}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.domainBox}>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20, // Added padding to prevent notch overlap
    justifyContent: 'center', // Center all components vertically
    alignItems: 'center', // Center all components horizontally
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20, // Adds spacing between the title and the list
    fontFamily: 'Pacifico', // Use the custom font loaded
  },
  searchBarRow: {
    flexDirection: 'row', // Aligns the search bar and profile button horizontally
    justifyContent: 'center', // Centers the search bar and profile button horizontally
    alignItems: 'center', // Aligns them vertically
    marginBottom: 20, // Space below the search bar and profile button
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 8, // Reduced padding to make it smaller
    borderRadius: 8,
    color: '#000',
    fontSize: 14, // Reduced font size
    width: '70%', // Adjusted width to fit within the row
    marginRight: 10, // Added margin to the right of the search bar
  },
  profileButton: {
    backgroundColor: '#2e6075',
    padding: 10,
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centers the grid horizontally
    paddingTop: 20, // Adds spacing above the grid
  },
  domainBox: {
    width: '45%',
    backgroundColor: '#bfe8e0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 10, // Adds margin between grid items
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  domainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DomainSelectionScreen;
