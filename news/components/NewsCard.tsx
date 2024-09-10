import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type NewsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
};

const NewsCard: React.FC<NewsCardProps> = ({ title, description, imageUrl, publishedAt }) => {
  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{new Date(publishedAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    height: 200,
    width: '100%',
  },
  placeholder: {
    height: 200,
    backgroundColor: '#ccc',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default NewsCard;
