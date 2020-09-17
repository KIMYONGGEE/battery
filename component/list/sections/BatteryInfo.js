import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';

import ChargingBar from './ChargingBar';

export default function BatteryInfo({Battery, navigation}){

const [fillingamount, SetFillingmount] = useState();
const [serialnum, SetSerialnum] = useState();
const [cyclecount, SetCyclecount] = useState();
const [chargestate, SetChargestate] = useState();
const [batteryerr, SetBatteryerr] = useState();
const [id, SetId] = useState();
const [serviceUUIDs, SetServiceUUIDs] = useState();
    
useEffect(()=> {

  SetFillingmount(Battery.advertising.manufacturerData.bytes[12]);
  SetSerialnum(Battery.advertising.manufacturerData.bytes[9] + Battery.advertising.manufacturerData.bytes[10] * 16 + Battery.advertising.manufacturerData.bytes[11] * 256);
  SetCyclecount(Battery.advertising.manufacturerData.bytes[14] + Battery.advertising.manufacturerData.bytes[15] * 16);
  SetBatteryerr(Battery.advertising.manufacturerData.bytes[16]);
  SetChargestate(Battery.advertising.manufacturerData.bytes[17]);
  SetId(Battery.id);
  SetServiceUUIDs(Battery.advertising.serviceUUIDs);

});

return (
  <TouchableOpacity onPress={() => navigation.navigate('Detail',{Battery : [serialnum, fillingamount, chargestate, id, serviceUUIDs]})}>
   <View style={styles.List}>
    <View style={styles.ListView}>
      <Text style={styles.BatteryBar}>
        <ChargingBar Battery={fillingamount} Chargestate={chargestate} Batteryerr={batteryerr}/>
      </Text>
    </View>
    <View style={styles.ListView}>
      <Text style={styles.ListText}>
        {serialnum}
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
    backgroundColor: '#353535',
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
    height: Dimensions.get('window').height/9,
    color: '#ffffff',
  },
});