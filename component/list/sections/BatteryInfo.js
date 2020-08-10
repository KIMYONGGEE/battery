import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ChargingBar from './ChargingBar';

function BatteryInfo({Battery, navigation}){
    if(Battery.id < 10){
        if(Battery.CycleCount < 10)
        {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
            <View style={styles.ListView}>
              <Text style={styles.ListText}>
                <ChargingBar Battery={Battery} />
                {'          '}{'000'}{Battery.id}{'          '}{Battery.CycleCount}{'cycle'}
              </Text>
            </View>
            </TouchableOpacity>
          );
        }else{
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
            <View style={styles.ListView}>
              <Text style={styles.ListText}>
                <ChargingBar Battery={Battery} />
                {'          '}{'000'}{Battery.id}{'        '}{Battery.CycleCount}{'cycle'}
              </Text>
            </View>
            </TouchableOpacity>
          );
        }
    }
  else{
      if(Battery.CycleCount < 10)
      {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <View style={styles.ListView}>
            <Text style={styles.ListText}>
              <ChargingBar Battery={Battery} />
              {'          '}{'00'}{Battery.id}{'          '}{Battery.CycleCount}{'cycle'}
            </Text>
          </View>
          </TouchableOpacity>
        );
      }else{
        return (
          <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <View style={styles.ListView}>
            <Text style={styles.ListText}>
              <ChargingBar Battery={Battery} />
              {'          '}{'00'}{Battery.id}{'        '}{Battery.CycleCount}{'cycle'}
            </Text>
          </View>
          </TouchableOpacity>
        );
      }
  }
}

const styles = StyleSheet.create({
  ListView: {
    marginTop:10,
    borderBottomWidth: 1,
  },
  ListText: {
    textAlign: 'center',
    fontSize: 20,
    height: 70
  },
});

export default BatteryInfo;