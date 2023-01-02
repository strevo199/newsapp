import {
  View,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Animated, { FadeInUp } from 'react-native-reanimated';

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
  publishedAt: string;
};

export const News = () => {
  const [isLoading, setisLoading] = useState(false)
  const [newsList, setnewsList] = useState<NewsListInterface[]>([]);
  const API_KEY = '36cd8cfcbbec4b98816d29ccd6024536';
  const newsApiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2022-12-02&sortBy=publishedAt&apiKey=${API_KEY}`;
  const RenderSearch = () => {
    return (
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Search</Text>

        <TextInput
          placeholder="Search by user or places"
          style={{
            marginVertical: 16,
            paddingLeft: 16,
            height: 61,
            fontSize: 16,
            fontWeight: '400',
            borderWidth: 3,
            backgroundColor:"white",
            borderColor: '#ddd',
            borderRadius: 10,
          }}
        />
      </View>
    );
  };

  const getNews = () => {
    setisLoading(true)
    axios
      .get(newsApiUrl)
      .then(res => {
       
        setisLoading(false)

        if (res.data?.status === 'ok') {
          setnewsList(res.data.articles);
        } 
       
      })
      .catch(err => {
        setisLoading(false)
        if (err) {
          Alert.alert('Error', 'Unable to compelete request ',[
            {"text": "Refresh","onPress": ()=> getNews()},
          ]);
        }
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  

  const renderItem = (item: NewsListInterface) => {
    
    return (
      <Animated.View
        entering={FadeInUp.delay(200).duration(500)}
        style={{
          borderColor: '#ddd',
          flexDirection: 'row',
          borderWidth: 0.7,
          height: 110,
          marginVertical: 6,
          borderRadius: 8,
          backgroundColor:"white",
          elevation:1,
          shadowColor:"#000000",
          shadowOffset: {
            width: 1,
            height:1
          },
          shadowRadius: 1,
          shadowOpacity:0.3
          
        }}>
        <View
          style={{
            height: '100%',
            width: 80,
            
            justifyContent:"center",
            alignItems:"center"
          }}>
            <Image
            
              source={{uri: item.urlToImage}}
              resizeMode="cover"
              style={{
                height: 70,
                borderRadius:35,
                width: 70,
              }}
            />
        </View>
        <View style={{flex: 1, padding:8, justifyContent:"space-between"}}>
          <View>
          <View style={{marginBottom:4, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>

          <Text style={{color: 'black',fontSize:13, textTransform:"capitalize", fontWeight:"500"}}>Author:{item.author ? `${item.author.substring(0,39)}`: "Stephen G"}</Text>
          <Text style={{color: 'black', fontSize:8, fontWeight:"500"}}>{item.publishedAt.split("T")[0]}</Text>
          </View>
          <Text style={{color: '#999999', fontWeight:"600"}}>Title: {item.title.substring(0,70)}..</Text>
          </View>
        </View>
          <View style ={{alignItems:"flex-end", marginBottom:2, marginRight:2}}>
            <TouchableOpacity 
              onPress={() =>Linking.openURL(item.url)}
            style ={{height:25, width:75, 
            borderRadius: 4, 
            shadowColor:"#000000",
          shadowOffset: {
            width: 1,
            height:1
          },
          shadowRadius: 1,bottom:0,
          position:"absolute",
          shadowOpacity:0.3,
          zIndex:10,
              borderWidth:0.3, elevation:2, backgroundColor:"white",
               borderColor:"lightblue", justifyContent:"center", alignItems: "center"}}>
              <Text style ={{fontSize:13, fontWeight:"500" }}>Read More</Text>
            </TouchableOpacity>
          </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, margin: 16, marginTop:30}}>

      <RenderSearch/>

      { isLoading ? <View style ={{flex:1, justifyContent: 'center', alignItems:"center"}}>
        <ActivityIndicator size={"large"}/> 
      </View>: <FlatList
        showsVerticalScrollIndicator={false}
        data={newsList}
        ListHeaderComponent={<View><Text style={{fontSize: 18, fontWeight: 'bold'}}>Lastest News</Text></View>}
        renderItem={({item}) => renderItem(item)}
       
      />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
