import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

const AppFlowTabNavigator = createBottomTabNavigator();
const MainTabNavigator = createBottomTabNavigator();
const ReviewNavigator = createStackNavigator();

const Review = () => {
  return (
    <ReviewNavigator.Navigator>
      <ReviewNavigator.Screen 
        name='Reivew' 
        component={ReviewScreen} 
        options={({ navigation }) => ({ 
          title: 'Review Jobs',
          headerRight: () => (
            <Button 
              title="Settings"
              onPress={() => {navigation.navigate('Settings')}}
              buttonStyle={{backgroundColor:"white"}}
              titleStyle={{color:"#007aff"}}
            />)
        })}
      />
      <ReviewNavigator.Screen name='Settings' component={SettingsScreen} />
    </ReviewNavigator.Navigator>
  )
}

const Main = () => {
  return (
    <MainTabNavigator.Navigator>
      <MainTabNavigator.Screen name='Map' component={MapScreen} />
      <MainTabNavigator.Screen name='Deck' component={DeckScreen} />
      <MainTabNavigator.Screen name='Review' component={Review} />
    </MainTabNavigator.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppFlowTabNavigator.Navigator>
      <AppFlowTabNavigator.Screen name='Welcome' component={WelcomeScreen}/>
        <AppFlowTabNavigator.Screen name='Auth' component={AuthScreen}/>
        <AppFlowTabNavigator.Screen name='Main' component={Main} />
      </AppFlowTabNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
