import React, {useEffect, useState} from 'react';
import { NativeEventEmitter, NativeModules, StyleSheet, View, Dimensions } from 'react-native';
import BleManager from 'react-native-ble-manager';
import {stringToBytes, bytesToString} from "convert-string";

//Page
import Chart from './sections/donut';
import DesCription from './sections/Description';

const notidata = stringToBytes("123");

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

var size = Dimensions.get('window').width/100;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function DetailPage({navigation, route }) {

  const [test, setTest] = useState(new Array());

  useEffect(() => {
    if(route.params.Battery[0]<10)
      navigation.setOptions({ title: "[ 000" + route.params.Battery[0] + " ] Description" });
    else
      navigation.setOptions({ title: "[ 00" + route.params.Battery[0] + " ] Description" });
    //3자리, 4자리도 더 만들기

    const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

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
      handlerUpdate.remove();  
      BleManager.disconnect("EA:C3:D8:6B:AF:71")
      .then(() => {
        // Success code
        // console.log("Disconnected");
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
      // for(var i = 0; i < results.length; i++){
      //   console.log("result",i, " = ", results[i].advertising);
        
      // }

      setTimeout(() =>{
        BleManager.retrieveServices("EA:C3:D8:6B:AF:71").then((peripheralInfo) => {
          console.log("Peripheral info:", peripheralInfo.characteristics[5]);

          var notichar = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
          var peripheralId = "EA:C3:D8:6B:AF:71";
          var serviceId = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
          var writechar = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

          setTimeout(() =>{
            BleManager.startNotification(peripheralId, serviceId, notichar).then(() =>{
              console.log("start notification");

              BleManager.write(peripheralId, serviceId, writechar, notidata).then(() =>{
                console.log("write complete = ", notidata);
              }).catch((error)=>{
                console.log("write error = ", error);
              });
            }).catch((error) =>{
              console.log("notification error = ", error);
            });
          }, 200);
        });
      }, 900);

    });
  }

  const handleUpdateValueForCharacteristic =(data) => {
    setTest(data.value);
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  return (
    <>
      <View style={styles.Top}/>
      <View style={styles.Header}>
        <Chart Charge={route.params.Battery[1]}></Chart>
      </View>
      <DesCription navigation={navigation} Battery={route.params.Battery} test={test}/>
    </>
  );
}


const styles = StyleSheet.create({
  Top: {
    flex: size/72,
  },
  Header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: size/2.4,
  },
});