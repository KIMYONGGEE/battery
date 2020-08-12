import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import Chart from './donut';

function Datadescription() {
  return (
    <>
      <View style={styles.Top}></View>

      <View style={styles.Header}>
        <Chart></Chart>
      </View>

      <View style={styles.Data}>
        <View style={styles.Dataempty}></View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ㆍ VOLTAGE</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ㆍ CYCLE COUNT</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ㆍ Time to Full</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ㆍ Time to Empty</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ㆍ TEMP</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ㆍ SOH</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ㆍ STATUS</Text>
        </View>
        <View style={styles.Dataval}>
          <Text style={{fontSize: 20}}>16.5V</Text>
          <Text style={{fontSize: 20}}>5 count</Text>
          <Text style={{fontSize: 20}}>0 min</Text>
          <Text style={{fontSize: 20}}>120 min</Text>
          <Text style={{fontSize: 20}}>25°C</Text>
          <Text style={{fontSize: 20}}>20%</Text>
          <Text style={{fontSize: 20}}>O.K</Text>
        </View>
      </View>

      <View style={styles.Navempty}></View>
      <View style={styles.Nav}>
        <View style={styles.Navbtn}>
          <Button
            title="Check"
            onPress={()=>Alert.alert('click')}
          />
        </View>
        <View style={styles.Navlist}>
          <Image
          style={styles.image}
          source={require('../../assets/list.png')}
          />
        </View>
      </View>
      <View style={styles.Navempty}></View>
    </>
  );
}

const styles = StyleSheet.create({
  Top: {
    flex: 0.3,
  },
  Header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5,
  },
  Data:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  Dataempty:{
    flex: 0.4,
  },
  Datadescription:{
    flex: 1,
  },
  Dataval:{
    flex: 1,
  },
  Nav:{
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.2,
    flexDirection: 'row',
  },
  Navbtn:{
    flex: 0.5,
  },
  Navlist:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  image: {
    width: 45,
    height: 45,
  },
  Navempty: {
    flex: 0.2,
  },
});

export default Datadescription;