import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';

import ChargingBar from './ChargingBar';

export default function BatteryInfo({Battery, navigation}){

const [fillingamount, SetFillingmount] = useState();
const [id, SetId] = useState();
const [cyclecount, SetCyclecount] = useState();
const [chargestate, SetChargestate] = useState();
    
useEffect(()=> {

  SetFillingmount(Battery.advertising.manufacturerData.bytes[12]);
  SetId(Battery.advertising.manufacturerData.bytes[9] + Battery.advertising.manufacturerData.bytes[10] * 16 + Battery.advertising.manufacturerData.bytes[11] * 256);
  SetCyclecount(Battery.advertising.manufacturerData.bytes[14] + Battery.advertising.manufacturerData.bytes[15] * 16);
  SetChargestate(Battery.advertising.manufacturerData.bytes[17]);

});

return (
  <TouchableOpacity onPress={() => navigation.navigate('Detail',{Battery : [id, fillingamount]})}>
   <View style={styles.List}>
    <View style={styles.ListView}>
      <Text style={styles.BatteryBar}>
        <ChargingBar Battery={fillingamount} Chargestate={chargestate}/>
      </Text>
    </View>
    <View style={styles.ListView}>
      <Text style={styles.ListText}>
        {id}
      </Text>
    </View>
    <View style={styles.ListView}>
      <Text style={styles.ListText}>
        {cyclecount}{'Cycle'}
      </Text>
    </View>
  </View>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
  List: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
  },
  ListView: {
    textAlign: 'center',
    alignItems: 'center',
    width: '33%',
    justifyContent: 'space-around',
    height: Dimensions.get('window').height/9
  },
  BatteryBar: {
    height: Dimensions.get('window').height/9,
  },
  ListText: {
    marginTop : Dimensions.get('window').height/9 * 0.7,
    alignItems: 'center',
    fontSize: Dimensions.get('window').width/100 * 4.5,
    height: Dimensions.get('window').height/9
  },
});