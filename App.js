import React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListPage from './component/list/ListPage';
import DetailPage from './component/detail/DetailPage';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListPage}
          options={{
            title: 'NEO SEMITECH',
            headerStyle: {
              backgroundColor: '#DF7401',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPage}
          options={{
            title: '세부사항',
            headerStyle: {
              backgroundColor: '#DF7401',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 