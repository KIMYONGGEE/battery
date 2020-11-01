import React, {useEffect, useState} from 'react';
import { NativeEventEmitter, NativeModules, StyleSheet, View, Dimensions, Image, Text, Alert } from 'react-native';
import BleManager from 'react-native-ble-manager';
import {stringToBytes, bytesToString} from "convert-string";
import Spinner from 'react-native-loading-spinner-overlay';

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

var notichar;
var serviceUUID;

export default function DetailPage({navigation, route}) {
  const [data, setData] = useState(new Array());
  const [spin, setSpin] = useState(true)
  const [show, setShow] = useState(false)
  const [time, setTime] = useState(0)

  var chargestatus = route.params.Battery[2];
  var batteryId = route.params.Battery[3];
  var batteryServiceUUIDs = route.params.Battery[4];

  useEffect(()=>{
    if(time != 8){
      setTimeout(()=>{
        var sum = time+1;
        setTime(sum)
      },1000)
    }
    if(data.length != 0){
      setSpin(false)
      setShow(true)
      setTime(8)
    }
    if(data.length == 0 && time ==8){
      Alert.alert('Connection Error', 'Please restart connection',[{text : 'Back', onPress: () => navigation.navigate('List')}])
    }
  }, [data, time])
  useEffect(() => {
    console.log("디테일페이지 첫 시작");

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
      BleManager.stopNotification(batteryId, serviceUUID, notichar);
      handlerUpdate.remove();  
      BleManager.disconnect(batteryId)
      .then(() => {
        // Success code
        // console.log("Disconnected");
      })
      .catch((error) => {
        // Failure code
        console.log("Disconnected error", error);
        // data = []
      });

      console.log("디스커넥트, 아무것도 없는 이펙트");
    };
  }, []);

  useEffect(() => {
    var serialnum = route.params.Battery[0].toString();
    // var serialnum = "12345";
    console.log(typeof(serialnum), serialnum);
    var titled = "S/N : ";

    for(var i = 0; i < 8-serialnum.length; i++) titled += "0";

    titled += serialnum;
    navigation.setOptions({ title: titled });

    // if(route.params.Battery[0]<10){
    //   navigation.setOptions({ title: titled });
    // }
    // else{
    //   navigation.setOptions({ title: titled });
    // }
    //3자리, 4자리도 더 만들기

    

    //끝날때 disconnect
    return () => {
      console.log("디스커넥트 시도");
      
      
    };
  });

  const retrieveConnected= () => {
    
    serviceUUID = batteryServiceUUIDs[0];
    var writechar;

    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }

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

          // notichar = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
          // writechar = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

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
    <Spinner
          visible={spin}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      {show &&
        <View style={styles.container}>
          <View style={styles.Header}>
            <Chart Charge={route.params.Battery[1]} Chargestatus={chargestatus} Data={data}></Chart>
          </View>
        <View style={styles.Bott}>
          <DesCription navigation={navigation} Battery={route.params.Battery} Chargestatus={chargestatus} Data={data}/>
        </View>
      </View>
      }
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
    height: "53%",
    // flex: size/6,
    backgroundColor: '#ffffff',
  },
  Bott: {
    width: "100%",
    height: "50%",
    backgroundColor: '#ffffff',
    // flex: size/4,
  },
  image: {
    width:100,
    height:47,
  }
});