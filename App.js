import React,{useState,useEffect} from 'react';
import { Button, View, Text,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListPage from './component/list/ListPage';
import ListPageIOS from './component/list/ListPage_ios';
import DetailPage from './component/detail/DetailPage';
import DetailPageIOS from './component/detail/DetailPage_ios';
import Loading from "./Loading";

const Stack = createStackNavigator();

export default function App() {

  //IOS확인 
    if (Platform.OS === 'ios') {

      console.log('Work around a change in behavior');
      return (
        <NavigationContainer> 
          <Stack.Navigator initialRouteName="List">
            <Stack.Screen
              name="List"
              component={ListPageIOS}
              options={{
                title: 'NEO SEMITECH IOS',
                headerStyle: {
                  
                  backgroundColor: '#ffffff',
                },
                headerTintColor: '#AE5D0C',
                headerTitleStyle: {
                  alignSelf: 'center',
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailPageIOS}
              options={{
                title: '세부사항',
                headerStyle: {
                  backgroundColor: '#ffffff',
                },
                headerTintColor: '#585858',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
    
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    
    }
    
     return (
       
        <NavigationContainer> 
          <Stack.Navigator initialRouteName="List">
            <Stack.Screen
              name="List"
              component={ListPage}
              options={{
                title: 'NEO SEMITECH',
                headerStyle: {
                  
                  backgroundColor: '#ffffff',
                },
                headerTintColor: '#AE5D0C',
                headerTitleStyle: {
                  alignSelf: 'center',
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
                  backgroundColor: '#ffffff',
                },
                headerTintColor: '#585858',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
    
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
  //}
}