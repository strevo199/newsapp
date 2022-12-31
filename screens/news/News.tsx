import {
  View,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

type NewsListInterface = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
  publishImage: string;
};

export const News = () => {
  const [newsList, setnewsList] = useState<NewsListInterface[]>([]);
  const API_KEY = '73bfa4c7bc0b4cd4a5340aa39434d0ac';
  const newsApiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2022-11-30&sortBy=publishedAt&apiKey=${API_KEY}`;
  const RenderSearch = () => {
    return (
      <View>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Search</Text>

        <TextInput
          placeholder="Search by user or places"
          style={{
            marginVertical: 16,
            paddingLeft: 16,
            height: 61,
            fontSize: 16,
            fontWeight: '400',
            borderWidth: 3,
            borderColor: '#ddd',
            borderRadius: 10,
          }}
        />
      </View>
    );
  };

  const getNews = () => {
    axios
      .get(newsApiUrl)
      .then(res => {
        if (res.data?.status === 'ok') {
          setnewsList(res.data.articles);
        }
      })
      .catch(err => {
        if (err) {
          Alert.alert('Error', 'Unable to compelete request ');
        }
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  const renderItem = (item: NewsListInterface) => {
    return (
      <View
        style={{
          borderColor: '#ddd',
          flexDirection: 'row',
          borderWidth: 0.7,
          height: 100,
          marginVertical: 8,
          borderRadius: 8,
        }}>
        <View
          style={{
            height: '100%',
            backgroundColor: 'black',
            width: 80,
          }}>
          {!!item.urlToImage && (
            <Image
              source={{url: item.urlToImage}}
              style={{
                height: '100%',
                width: '50%',
              }}
            />
          )}
        </View>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Text style={{color: 'black'}}>{item.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, margin: 16}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={newsList}
        ListHeaderComponent={RenderSearch}
        renderItem={({item}) => renderItem(item)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
