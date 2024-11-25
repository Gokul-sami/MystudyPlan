import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const db = getFirestore();

const PostDetailScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch comments
  useEffect(() => {
    const commentsRef = collection(db, 'posts', post.id, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [post.id]);

  // Post a new comment
  const handlePostMessage = async () => {
    if (!newMessage.trim()) return;

    const user = auth.currentUser;
    try {
      await addDoc(collection(db, 'posts', post.id, 'comments'), {
        message: newMessage.trim(),
        createdAt: new Date(),
        userId: user.uid,
        displayName: user.displayName || 'Anonymous',
        likes: 0,
        dislikes: 0,
      });
      setNewMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to post comment. Please try again.');
    }
  };

  // Handle like and dislike
  const handleReaction = async (commentId, type) => {
    const commentRef = doc(db, 'posts', post.id, 'comments', commentId);
    try {
      const updatedValue = type === 'like' ? { likes: 1 } : { dislikes: 1 };
      await updateDoc(commentRef, {
        [type]: (comments.find((comment) => comment.id === commentId)?.[type] || 0) + 1,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update reaction. Please try again.');
    }
  };

  // Render comments
  const renderComment = ({ item }) => (
    <View
      style={[
        styles.commentBox,
        item.userId === auth.currentUser?.uid ? styles.myComment : styles.otherComment,
      ]}
    >
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{item.displayName}</Text>
        <Text style={styles.commentText}>{item.message}</Text>
        <Text style={styles.commentTime}>
          {item.createdAt?.toLocaleTimeString() || 'Unknown'}
        </Text>
      </View>

      {/* Like and Dislike Buttons */}
      <View style={styles.reactionContainer}>
        <TouchableOpacity
          onPress={() => handleReaction(item.id, 'likes')}
          style={styles.reactionButton}
        >
          <Icon name="thumb-up" size={18} color="#4caf50" />
          <Text style={styles.reactionCount}>{item.likes || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReaction(item.id, 'dislikes')}
          style={styles.reactionButton}
        >
          <Icon name="thumb-down" size={18} color="#f44336" />
          <Text style={styles.reactionCount}>{item.dislikes || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>{post.title}</Text>
      </View>

      {/* Post Description */}
      <Text style={styles.postDescription}>{post.description}</Text>

      {/* Comments */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.commentsContainer}
      />

      {/* Message Input */}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0e4a5d',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  postDescription: {
    fontSize: 16,
    margin: 16,
    color: '#ffffff',
    textAlign: 'justify',
  },
  commentsContainer: {
    paddingHorizontal: 16,
  },
  commentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  myComment: {
    alignSelf: 'flex-end',
    backgroundColor: '#d4f4dd',
  },
  otherComment: {
    alignSelf: 'flex-start',
    backgroundColor: '#fce7e9',
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  commentTime: {
    fontSize: 10,
    color: '#888',
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  reactionCount: {
    marginLeft: 4,
    fontSize: 12,
    color: '#555',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#0e4a5d',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default PostDetailScreen;
