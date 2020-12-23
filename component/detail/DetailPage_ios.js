import React, {useEffect, useState} from 'react';
import { NativeEventEmitter, NativeModules, StyleSheet, View, Dimensions, Image, Text, Alert, Button } from 'react-native';
import BleManager from 'react-native-ble-manager';
import {stringToBytes, bytesToString} from "convert-string";
import Spinner from 'react-native-loading-spinner-overlay';

//Page
import Chart from './sections/donut';
import DesCription from './sections/Description_ios';

var bytearray = [0x15, 0x0D, 0x0A];

var datatmp;

const notidata = stringToBytes("\x15\r\n");

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

var size = Dimensions.get('window').width/100;

var stateimage ='';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var handlerUpdate;

var notichar;
var serviceUUID;
var writechar;


export default function DetailPage({navigation, route}) {
  const [data, setData] = useState(new Array());
  const [spin, setSpin] = useState(true);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [Colors, SetColor] = useState('#A4A4A4');

  var chargestatus = route.params.Battery[2];
  var batteryId = route.params.Battery[3];
  var batteryServiceUUIDs = route.params.Battery[4];


  useEffect(()=>{
    if(show){
      setTimeout(()=>{

        BleManager.getConnectedPeripherals([]).then((results) => {
          if(results.length > 0){
            BleManager.write(batteryId, serviceUUID, writechar, notidata).then(() =>{
              console.log("write complete = ", bytearray, notidata);
              }).catch((error)=>{
                console.log("write error = ", error);
              });
            if(cnt < 1000){
              setCnt(cnt + 1);
              console.log("Time = ", cnt);
            }
            else{
              setCnt(0);
              console.log("Time = ", cnt);
            }
          }
        });
      }, 10000);
    }
  }, [cnt, show]);

  useEffect(()=>{
    if(time != 8){
      setTimeout(()=>{
        var sum = time+1;
        setTime(sum);
      },1000);
    }
    if(data.length == 23){
      setSpin(false);
      setShow(true);
      setTime(8);
    }
    if(data.length != 23 && time ==8){
      Alert.alert('Connection Error', 'Please restart connection',[{text : 'Back', onPress: () => navigation.navigate('List')}]);
    }
  }, [data, time]);

  useEffect(() => {
    console.log("디테일페이지 첫 시작");

    BleManager.stopScan();

    setTimeout(() => {
      connectAndPrepare();
    }, 1000);

    // const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    // setTimeout(() => {
    //   BleManager.connect(batteryId)
    //   .then(() => {
    //     // Success code
    //     retrieveConnected();
    //   })
    //   .catch((error) => {
    //     // Failure code
    //     console.log("connection error! = ", error);
    //   });
    // }, 1000);

    return () =>{
      BleManager.stopNotification(batteryId, serviceUUID, notichar);
      if(handlerUpdate){
        handlerUpdate.remove();  
      }  
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
  }, []);

  const handleUpdateValueForCharacteristic =(data) => {
    if(data.value.length == 21){
      console.log("data received = ", data.value);
      data.value.pop();
      // data.value[15] = 2;
      datatmp = data.value;
    }
    else if(data.value.length == 3){
      datatmp.push(data.value[0]);
      datatmp.push(data.value[1]);
      datatmp.push(data.value[2]);
      setData(datatmp);
      console.log("data tmp = ", datatmp);
    }
  }

  const sendData=()=>{
    // Alert.alert("Send Data to Battery");
    console.log("send Data to btr");

    var arr = stringToBytes("\x40\r\n");

    BleManager.write(batteryId, serviceUUID, writechar, arr).then(() =>{
      console.log("write complete = ", arr, arr);
      }).catch((error)=>{
        console.log("write error = ", error);
      });
  }

  async function connectAndPrepare() {
    serviceUUID = batteryServiceUUIDs[0];

    // Connect to device
    await BleManager.connect(batteryId);

    // Before startNotification you need to call retrieveServices
    await BleManager.retrieveServices(batteryId).then((peripheralInfo) => {
      console.log("battery id = ", batteryId);
      console.log("Peripheral info:", peripheralInfo.characteristics);

      for(var i = 0; i < peripheralInfo.characteristics.length; i++){
        if(peripheralInfo.characteristics[i].service === serviceUUID){
          for(var j = 0; j < peripheralInfo.characteristics[i].properties.length; j++){
            if(peripheralInfo.characteristics[i].properties[j] === "Write"){
              writechar = peripheralInfo.characteristics[i].characteristic;
            } else if(peripheralInfo.characteristics[i].properties[j] === "Notify"){
              notichar = peripheralInfo.characteristics[i].characteristic;
            }
          }
          // if(peripheralInfo.characteristics[i].properties.Write === "Write"){
          // } else if(peripheralInfo.characteristics[i].properties.Notify === "Notify"){
          // }
        }
      }
    });

    // To enable BleManagerDidUpdateValueForCharacteristic listener
    console.log("Before notification start");
    console.log("service uuid = ", serviceUUID);
    console.log("notiuuid = ", notichar);
    console.log("write char = ", writechar);
    await BleManager.startNotification(batteryId, serviceUUID, notichar);
    // Add event listener
    handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    await BleManager.write(batteryId, serviceUUID, writechar, notidata).then(() =>{
      console.log("write complete = ", bytearray, notidata);
      }).catch((error)=>{
        console.log("write error = ", error);
      });
    // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
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
            <Chart Charge={data[4]} Chargestatus={data[20]} Data={data}></Chart>
          </View>

          <View style={styles.Bott}>
            <DesCription navigation={navigation} Data={data}/>
          </View>

          <View style={styles.Nav}>
            <View style={styles.Navbtn}>
              <Button 
                color={Colors}
                title="C h e c k"
                onPress={()=>{
                  sendData(),
                  SetColor('#0080FF'),
                  setTimeout(()=>SetColor('#A4A4A4'),3000)}}
              />
            </View>
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
    height: "45%",
    // flex: size/6,
    backgroundColor: '#ffffff',
  },
  Bott: {
    width: "100%",
    height: "45%",
    backgroundColor: '#ffffff',
    // flex: size/4,
  },
  Nav:{
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "10%",
    width: "100%",
  },
  Navbtn:{
    width: "70%",
    height: "100%",
    borderRadius: 9
  },
});