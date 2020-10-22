import React, {useEffect, useState} from 'react';
import { NativeEventEmitter, NativeModules, StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import BleManager from 'react-native-ble-manager';
import {stringToBytes, bytesToString} from "convert-string";

//Page
import Chart from './sections/donut';
import DesCription from './sections/Description';

const notidata = stringToBytes("1\r\n");

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

var size = Dimensions.get('window').width/100;

var stateimage ='';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function DetailPage({navigation, route}) {
  
  const [data, setData] = useState(new Array());

  //var imgpath ='';
  var chargestatus = route.params.Battery[2];
  var batteryId = route.params.Battery[3];
  var batteryServiceUUIDs = route.params.Battery[4];
  //if(chargestatus == 0) imgpath = '../../assets/main/detailcharging.png';

  useEffect(() => {
    // BleManager.stopScan().then(() => {
    //   // Success code
    //   console.log("Scan stopped");
    // });
    
    console.log("디테일페이지 첫 시작");

    console.log(route.params.Battery);

    var serialnum = route.params.Battery[0].toString();
    var titled = "S/N : ";

    for(var i = 0; i < 8-serialnum.length; i++) titled += "0";

    titled += serialnum;
    navigation.setOptions({ title: titled });

    // BleManager.stopScan();

    const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    BleManager.connect(batteryId)
    .then(() => {
      // Success code
      retrieveConnected();
    })
    .catch((error) => {
      // Failure code
      console.log("connection error! = ", error);
    });

    return () =>{
      handlerUpdate.remove();  
      BleManager.disconnect(batteryId)
      .then(() => {
        // Success code
        console.log("Disconnected");
      })
      .catch((error) => {
        // Failure code
        console.log("Disconnected error", error);
      });

      console.log("디스커넥트, 아무것도 없는 이펙트");
    };
  }, []);

  useEffect(() => {

    //끝날때 disconnect
    return () => {
      console.log("디스커넥트 시도");
    };
  }, [data]);

  const retrieveConnected= () => {
    var notichar;
    var serviceUUID = batteryServiceUUIDs[0];
    var writechar;

    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }

      console.log("result = ", results);

      setTimeout(() =>{
        BleManager.retrieveServices(batteryId).then((peripheralInfo) => {
          console.log("Peripheral info:", peripheralInfo.characteristics);

          for(var i = 0; i < peripheralInfo.characteristics.length; i++){
            if(peripheralInfo.characteristics[i].service === serviceUUID){
              if(peripheralInfo.characteristics[i].properties.Write === "Write"){
                writechar = peripheralInfo.characteristics[i].characteristic;
              } else if(peripheralInfo.characteristics[i].properties.Notify === "Notify"){
                notichar = peripheralInfo.characteristics[i].characteristic;
              }
            }
          }

          setTimeout(() =>{
            BleManager.startNotification(batteryId, serviceUUID, notichar).then(() =>{
              console.log("start notification");

              BleManager.write(batteryId, serviceUUID, writechar, notidata).then(() =>{
                console.log("write complete = ", notidata);
              }).catch((error)=>{
                console.log("write error = ", error);
              });
            }).catch((error) =>{
              console.log("notification error = ", error);
            });
          }, 200);
        });
      }, 500);

    });
  }

  const handleUpdateValueForCharacteristic =(data) => {
    setData(data.value);
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.Header}>
          <Chart Charge={route.params.Battery[1]} Chargestatus={chargestatus} Data={data}></Chart>
        </View>
        <View style={styles.Bott}>
          <DesCription navigation={navigation} Battery={route.params.Battery} Data={data}/>
        </View>
      </View>
      
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  Header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "40%",
    // flex: size/6,
    backgroundColor: '#212121',
  },
  Bott: {
    width: "100%",
    height: "60%",
    backgroundColor: '#212121',
    // flex: size/4,
  },
  image: {
    width:100,
    height:47,
  }
});