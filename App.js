import React,{useState,useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListPage from './component/list/ListPage';
import DetailPage from './component/detail/DetailPage';
import Loading from "./Loading";

const Stack = createStackNavigator();

export default function App() {

  /*
  const [isLoadng, setState] = useState(true);

  setTimeout(() => {setState(false)},2000);

  if(isLoadng){
    return <Loading/>
  }*/

  //else{
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