import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import BleManager from 'react-native-ble-manager';

import { Dimensions } from 'react-native';

//Page
import Chart from './sections/Donut';
import DesCription from './sections/Description';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

var size = Dimensions.get('window').width/100;
export default function DetailPage({navigation, route }) {
  
  useEffect(() => {
    if(route.params.Battery[0]<10)
      navigation.setOptions({ title: "[ 000" + route.params.Battery[0] + " ] Description" });
    else
      navigation.setOptions({ title: "[ 00" + route.params.Battery[0] + " ] Description" });
    //3자리, 4자리도 더 만들기

    BleManager.connect("EA:C3:D8:6B:AF:71")
    .then(() => {
      // Success code
      retrieveConnected();
    })
    .catch((error) => {
      // Failure code
      console.log(error);
    });

    //끝날때 disconnect
    return () => {
      BleManager.disconnect("EA:C3:D8:6B:AF:71")
      .then(() => {
        // Success code
        console.log("Disconnected");
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      }); 
    };
  });

  const retrieveConnected= () => {
    BleManager.getConnectedPeripherals(["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      var test = results;
      //console.log(test[0].advertising.manufacturerData);
      for(var i = 0; i < results.length; i++){
        console.log("result",i, " = ", results[i].advertising);
        
      }
    });
  }

  return (
    <>
      <View style={styles.Top}/>
      <View style={styles.Header}>
        <Chart Charge={route.params.Battery[1]}></Chart>
      </View>
      <DesCription navigation={navigation} Battery={route.params.Battery}/>
    </>
  );
}


const styles = StyleSheet.create({
  Top: {
    flex: size/72,
   //height: Dimensions.get('window').width > 350 ? '60%' : '80%',
  },
  Header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: size/2.4,
  },
});