import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chart from './donut.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topview}>
        <Chart></Chart>
      </View>

      <View style={styles.dataview}>
        <View style={styles.dataempty}></View>
        <View style={styles.datadescription}>
          <Text>● VOLTAGE</Text>
          <Text>● CYCLE COUNT</Text>
          <Text>● Time to Full</Text>
          <Text>● Time to Empty</Text>
          <Text>● TEMP</Text>
          <Text>● SOH</Text>
          <Text>● STATUS</Text>
        </View>
        <View style={styles.datavalue}>
          <Text>16.5V</Text>
          <Text>5 count</Text>
          <Text>0 min</Text>
          <Text>120 min</Text>
          <Text>25°C</Text>
          <Text>90%</Text>
          <Text>O.K</Text>
        </View>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
  topview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataview:{
    flex: 2,
    flexDirection: 'row',
  },
  dataempty:{
    flex: 0.5,
  },
  datadescription:{
    flex: 1,
  },
  datavalue:{
    flex: 1,
  },
})
