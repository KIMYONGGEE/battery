import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

//page
import BatteryInfo from './sections/BatteryInfo';


function ListPage({ navigation }) {
  const defaultBattery = {
      Data: [
        {
            id:1,
            FillingAmount: 83,
            Charge: 0,
            Voltage:'19.5V',
            CycleCount: 5,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:2,
            Charge: 0,
            FillingAmount: 23,
            Voltage:'20.5V',
            CycleCount: 10,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:3,
            FillingAmount: 52,
            Charge: 0,
            Voltage:'16.5V',
            CycleCount: 3,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:4,
            FillingAmount: 11,
            Charge: 0,
            Voltage:'16.5V',
            CycleCount: 7,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:5,
            FillingAmount: 83,
            Charge: 1,
            Voltage:'20.5V',
            CycleCount: 5,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:6,
            FillingAmount: 0,
            Charge: 0,
            Voltage:'16.5V',
            CycleCount: 2,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:7,
            FillingAmount: 100,
            Charge: 0,
            Voltage:'16.5V',
            CycleCount: 8,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:8,
            FillingAmount: 83,
            Charge: 1,
            Voltage:'20.5V',
            CycleCount: 5,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:9,
            FillingAmount: 83,
            Charge: 0,
            Voltage:'16.5V',
            CycleCount: 5,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:10,
            FillingAmount: 83,
            Charge: 0,
            Voltage:'16.5V',
            CycleCount: 2,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:11,
            FillingAmount: 99,
            Charge: 0,
            Voltage:'20.5V',
            CycleCount: 6,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
          {
            id:12,
            FillingAmount: 67,
            Charge: 0,
            Voltage:'16.5V',
            CycleCount: 7,
            TimeToFull: 0,
            TimeToEmpty: 120,
            Temp: 25,
            SOH: 100,
            Status: -1
          },
      ]
  };

  const [state, setState] = useState(defaultBattery);
  
  return (
    <>
    <StatusBar backgroundColor={'#ff6600'} barStyle="light-content"/> 
    
    <SafeAreaView style={styles.wrap}>
    <FlatList style={styles.scroll}
        keyExtractor={item => item.id.toString()}
        data={state.Data}
        renderItem={({item}) => <BatteryInfo Battery={item} navigation={navigation} />}
    />
    </SafeAreaView>
    </> 
  );
}

const styles = StyleSheet.create({
  Header: {
    height: "10%",
    backgroundColor: '#ff6600',
    justifyContent: 'space-between',
  },
  HeaderTitle: {
    color: '#000000',
    fontSize : 20,
    margin: 40,
    fontWeight : "bold",
  },
  scroll:{
    height: "100%",
    backgroundColor: '#FFFFFF',
  },
});

export default ListPage;