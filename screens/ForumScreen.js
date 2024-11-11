import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

const ForumScreen = ({ navigation }) => {
  const forumPosts = [
    { id: '1', title: 'Post 1', description: 'Discussion about DevOps' },
    { id: '2', title: 'Post 2', description: 'Discussion about AI' },
    { id: '3', title: 'Post 3', description: 'Discussion about Web Development' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forum</Text>
      <FlatList
        data={forumPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.post} onPress={() => alert('Navigating to post')}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  post: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default ForumScreen;
