import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth } from '../firebaseConfig'; // Assuming you have firebase.js where you initialize firebase

const db = getFirestore(); // Initialize Firestore

const PostDetailScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch comments in real-time
  useEffect(() => {
    const commentsRef = collection(db, 'posts', post.id, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedComments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        message: doc.data().message,
        createdAt: doc.data().createdAt.toDate(),
      }));
      setComments(fetchedComments);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [post.id]);

  // Handle posting a new comment
  const handlePostMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'posts', post.id, 'comments'), {
        message: newMessage,
        createdAt: new Date(),
      });
      setNewMessage(''); // Clear input after posting
    } catch (error) {
      console.error("Error posting comment: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>{post.title}</Text>
      </View>

      <Text style={styles.postDescription}>{post.description}</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>{item.message}</Text>
          </View>
        )}
      />

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          placeholderTextColor="#aaa"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handlePostMessage} style={styles.sendButton}>
          <Icon name="send" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
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
    marginLeft: 20,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 16,
    color: '#bfe8e0',
    marginBottom: 20,
  },
  commentBox: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#2e6075',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default PostDetailScreen;
