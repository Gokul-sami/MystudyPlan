import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, Platform, StatusBar } from 'react-native';

const ForumScreen = ({ navigation }) => {
  const [forumPosts, setForumPosts] = useState([
    { id: '1', title: 'Post 1', description: 'Discussion about DevOps', comments: [] },
    { id: '2', title: 'Post 2', description: 'Discussion about AI', comments: [] },
    { id: '3', title: 'Post 3', description: 'Discussion about Web Development', comments: [] },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostMessage = () => {
    if (newMessage.trim() === '') return;
    const updatedPosts = [...forumPosts];
    const postIndex = updatedPosts.findIndex((post) => post.id === selectedPost);
    
    if (postIndex > -1) {
      updatedPosts[postIndex].comments.push({
        id: new Date().toISOString(),
        message: newMessage,
      });
      setForumPosts(updatedPosts);
      setNewMessage('');
    }
  };

  const handleSelectPost = (postId) => {
    setSelectedPost(postId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forum</Text>
      
      {selectedPost ? (
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{forumPosts.find(post => post.id === selectedPost)?.title}</Text>
          <Text style={styles.postDescription}>{forumPosts.find(post => post.id === selectedPost)?.description}</Text>
          
          <FlatList
            data={forumPosts.find(post => post.id === selectedPost)?.comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentBox}>
                <Text style={styles.commentText}>{item.message}</Text>
              </View>
            )}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <Button title="Post Comment" onPress={handlePostMessage} color="#2e6075" />
          <Button title="Back to Posts" onPress={() => setSelectedPost(null)} color="#2e6075" />
        </View>
      ) : (
        <FlatList
          data={forumPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.post} 
              onPress={() => handleSelectPost(item.id)}
            >
              <Text
                style={[
                  styles.postTitle,
                  selectedPost === item.id && styles.selectedPostTitle // Change color if post is selected
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.postDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.bottomNav}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} color="#2e6075" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e4a5d',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 0 : 20,
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Roboto',
  },
  post: {
    backgroundColor: '#bfe8e0',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Default color
  },
  selectedPostTitle: {
    color: '#ffffff', // Change color to white when selected
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
  },
  postContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 20,
    paddingTop: 10,
  },
  commentBox: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 8,
    borderRadius: 8,
    width: '100%',
  },
  bottomNav: {
    marginTop: 20,
    width: '100%',
    // alignItems: 'center',
  },
});

export default ForumScreen;
