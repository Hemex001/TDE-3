import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import NewsCard from '@/components/NewsCard';

const API_KEY = '4fd528f30232423fb2b6195cfa02bfce';
const BASE_URL = 'https://newsapi.org/v2/everything';

type Article = {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
};

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNews = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: searchQuery,
          apiKey: API_KEY,
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews('tecnologia');
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      fetchNews(query);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notícias</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar notícias..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {loading ? (
        <Text>Carregando notícias...</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <NewsCard
              title={item.title}
              description={item.description || 'Sem descrição disponível.'}
              imageUrl={item.urlToImage}
              publishedAt={item.publishedAt}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
