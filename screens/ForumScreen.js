import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ForumScreen = ({ navigation }) => {
  const forumPosts = [
    { id: '1', title: 'Post 1', description: 'Discussion about DevOps' },
    { id: '2', title: 'Post 2', description: 'Discussion about AI' },
    { id: '3', title: 'Post 3', description: 'Discussion about Web Development' },
  ];

  const handleSelectPost = (post) => {
    navigation.navigate('PostDetail', { post });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Forum</Text>
      </View>
      <FlatList
        data={forumPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.post}
            onPress={() => handleSelectPost(item)}
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDescription}>{item.description}</Text>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  post: {
    backgroundColor: '#bfe8e0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e6075',
  },
  postDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default ForumScreen;
