import React, { Component } from 'react';
import { Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import { PersistGate } from 'redux-persist/integration/react';
import configurationStore from './store';

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
    <MainTabNavigator.Navigator 
      tabBarPosition= 'bottom'
      tabBarOptions={{ labelStyle: {fontSize: 12} }}
    >
      <MainTabNavigator.Screen 
        name='Map' 
        component={MapScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => {
            return <Icon name="my-location" size={size} color={color} />
          }
        }}
      />
      <MainTabNavigator.Screen 
        name='Deck' 
        component={DeckScreen} 
        options={{ 
          tabBarLabel: 'Restaurants',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="restaurant" size={size} color={color} />
          }
        }}
      />
      <MainTabNavigator.Screen 
        name='Review' 
        component={Review} 
        options={{ 
          tabBarLabel: 'Liked Restaurants',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="favorite" size={size} color={color} />
          }
        }}
      />
    </MainTabNavigator.Navigator>
  )
}

const { store, persistor } = configurationStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <AppFlowTabNavigator.Navigator screenOptions={{ tabBarVisible: false }}>
            <AppFlowTabNavigator.Screen name='Welcome' component={WelcomeScreen} />
            <AppFlowTabNavigator.Screen name='Auth' component={AuthScreen} />
            <AppFlowTabNavigator.Screen name='Main' component={Main} />
          </AppFlowTabNavigator.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
