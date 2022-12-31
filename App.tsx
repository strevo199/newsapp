import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Home } from './screens';
import Navigation from './screens/navigation/Index';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Navigation/>
  );
};

export default App;
