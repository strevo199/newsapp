import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../home';
import {Image} from 'react-native';
import {home, location, news, profile} from '../assets/images';
import {News} from '../news';
import {Location} from '../location';
import {Profile} from '../profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      
      initialRouteName="News"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          const tintColor = focused ? 'black' : '#999999';
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={home}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'News':
              return (
                <Image
                  source={news}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Location':
              return (
                <Image
                  source={location}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Profile':
              return (
                <Image
                  source={profile}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}>
      <Tab.Screen options={{title: ""}} name="Home" component={Home} />
      <Tab.Screen   options={{title: ""}} name="News" component={News} />
      <Tab.Screen  options={{title: ""}} name="Location" component={Location} />
      <Tab.Screen  options={{title: ""}} name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
