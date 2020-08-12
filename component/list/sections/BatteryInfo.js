import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ChargingBar from './ChargingBar';

function BatteryInfo({Battery, navigation}){
    
const [firstnbsp, SetFirstnbsp] = useState("          ");
const [lastnbsp, SetLastnbsp] =   useState("          ");
    
useEffect(()=> {
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
  <TouchableOpacity onPress={() => navigation.navigate('Detail', 
    { Battery: 
      [Battery.id,
      Battery.FillingAmount,
      Battery.Charge,
      Battery.Voltage,
      Battery.CycleCount,
      Battery.TimeToFull,
      Battery.TimeToEmpty,
      Battery.Temp,
      Battery.SOH,
      Battery.Status]
     }
     )}>
  <View style={styles.ListView}>
    <Text style={styles.ListText}>
      <ChargingBar Battery={Battery} />
      {firstnbsp}{'000'}{Battery.id}{lastnbsp}{Battery.CycleCount}{'cycle'}
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

export default BatteryInfo;