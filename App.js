import React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListPage from './component/list/ListPage';
import Datadescription from './component/detail/sections/datadescription';

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
              backgroundColor: '#ff6600',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Detail" component={Datadescription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}