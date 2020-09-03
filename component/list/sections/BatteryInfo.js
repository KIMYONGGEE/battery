import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ChargingBar from './ChargingBar';

export default function BatteryInfo({Battery, navigation}){
const [firstnbsp, SetFirstnbsp] = useState("          ");
const [lastnbsp, SetLastnbsp] =   useState("          ");

const [fillingamount, SetFillingmount] = useState();
const [id, SetId] = useState();
const [cyclecount, SetCyclecount] = useState();
    
useEffect(()=> {
  SetFillingmount(Battery.advertising.manufacturerData.bytes[12]);
  SetId(Battery.advertising.manufacturerData.bytes[9] + Battery.advertising.manufacturerData.bytes[10] * 16 + Battery.advertising.manufacturerData.bytes[11] * 256);
  SetCyclecount(Battery.advertising.manufacturerData.bytes[14] + Battery.advertising.manufacturerData.bytes[15] * 16);

  if(Battery.id < 10){
      if(Battery.CycleCount < 10){
          SetFirstnbsp("          ");
           SetLastnbsp("          ");
      }else{
          SetFirstnbsp("          ");
           SetLastnbsp("         ");
      }
  }else{
      if(Battery.CycleCount < 10){
        SetFirstnbsp("         ");
        SetLastnbsp("          ");
    }else{
        SetFirstnbsp("         ");
        SetLastnbsp("         ");
    }
  }
});

return (
  <TouchableOpacity 
  // onPress={() => navigation.navigate('Detail'
  // , 
  //   { Battery: 
  //     [Battery.id,
  //     Battery.FillingAmount,
  //     Battery.Charge,
  //     Battery.Voltage,
  //     Battery.CycleCount,
  //     Battery.TimeToFull,
  //     Battery.TimeToEmpty,
  //     Battery.Temp,
  //     Battery.SOH,
  //     Battery.Status]
  //    }
    //  )}
     >
  <View style={styles.ListView}>
    <Text style={styles.ListText}>
      <ChargingBar Battery={fillingamount} />
      {firstnbsp}{id}{lastnbsp}{cyclecount}{'cycle'}
    </Text>
  </View>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
  ListView: {
    borderBottomWidth: 1,
  },
  ListText: {
    textAlign: 'center',
    fontSize: 20,
    height: 80
  },
});