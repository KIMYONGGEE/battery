import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, NativeEventEmitter, NativeModules, Platform,
         PermissionsAndroid, ScrollView, AppState, FlatList, Dimensions, Button, SafeAreaView } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { updateId } from 'expo-updates';

//page
import BatteryInfo from './sections/BatteryInfo';

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function ListPage({navigation}){
  const [scanning, setScanning] = useState(false);

  //SCAN해서 찾은 Beacon 저장하는 State
  const [peripherals, setPeripherals] = useState(new Map());
  
  //추가, 삭제된 Beacon들을 구분하기위해 SCAN에서 찾은 해당 id를 저장하는 State
  const [peripheralsID, setPeripheralsID] = useState(new Array());
  const [updatePeripheralsID, setUpdatePeripheralsID] = useState(new Array());

  //기존의 peripherals에서 추가, 삭제된 값을 저장하는 State
  const [updatePeripherals, setUpdatePeripherals] = useState(new Map());

  const [appState, setAppState] = useState('');


  const list = Array.from(new Set(updatePeripherals.values()));
  const btnScanTitle = 'Scan Bluetooth (' + (scanning ? 'on' : 'off') + ')';

  useEffect(() =>{
    AppState.addEventListener('change', handleAppStateChange);

    BleManager.start({showAlert: false});

    //console.log(peripheralsID);
    const handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral );
    const handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    const handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
      });
    }
    if(scanning == false){
      startScan();
      update();
    }

    return () => {
      handlerDiscover.remove();
      handlerStop.remove();
      handlerDisconnect.remove();
      handlerUpdate.remove();  
    };
  }, [scanning]);

  const handleAppStateChange = (nextAppState)  => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    setAppState(nextAppState);
  }

  const handleDisconnectedPeripheral = (data) => {
    let localperipherals = peripherals;
    let peripheral = localperipherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      localperipherals.set(peripheral.id, peripheral);
      setPeripherals(localperipherals);
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  const handleUpdateValueForCharacteristic =(data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const handleStopScan =() => {
    console.log('Scan is stopped');
    setScanning(false);
  }

  const startScan = () => {
    BleManager.scan([], 10, true).then((results) => {
      console.log('Scanning...');
      setScanning(true);
    });
  }

  const update = () =>{
    //새로 들어온 peripheralsID를 저장하는 배열
    let updateID = Array.from(new Set(peripheralsID)); //let updateID = peripheralsID; 
    //기존에 있던 peripheralsID를 저장하는 배열
    let existID = updatePeripheralsID;
    //비교해서 들어있지 않은 인덱스를 저장하는 배열
    let noneID = new Array();

    //처음이라 updatePeripherals이 비어있다면 비교할게 없음
    //추가 삭제한 부분을 처리해주는 부분
    console.log("1. 추가된 값(updtaID) : " + updateID);
    if(updateID.length != 0)
    {
      console.log("2. 기존 값(existID)   : "+existID);
      existID.forEach(function(item, index){
        var check = 0;
        for(var a = 0; a < existID.length; a++){
          //비교를 해서 check가 0이면 버리는 값이라서 noneID에 저장
          if(item == updateID[a])
          {
            check++;
          }
        }
        if(check === 0){
          noneID.push(item);
        }
      });
      
      //SCAN 되지 않은 부분 삭제
      for(var a = 0; a < noneID.length; a++){
        console.log("5. 버릴 값 :"+noneID);
        peripherals.delete(noneID[a]);
      }      
    }

    //updatePeripherals에 값 넣어주기 ( 변경하기 )
    setUpdatePeripherals(peripherals);
    //updatePeripheralsID에 값 넣어주기 ( 변경하기 )
    setUpdatePeripheralsID(updateID);

    setPeripheralsID(new Array());
  }

  const retrieveConnected= () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      var localperipherals = peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        localperipherals.set(peripheral.id, peripheral);
        setPeripherals(localperipherals);
      }
    });
  }
  //SCAN AND SAVE
  const handleDiscoverPeripheral = (peripheral) => {
    if(peripheral.name === 'NEOSEMI'){
      var localperipherals = peripherals;
      var InputPeripheralsID = peripheralsID;
      var check=0;

      //console.log('Got ble peripheral', peripheral);
      if (!peripheral.name) {
        peripheral.name = 'NO NAME';
      }
      //console.log(peripheralsID);
      //중복 방지
      if(Array.from(peripherals.keys()).length == 0){ //초기값은 그냥 넣는다. 
        localperipherals.set(peripheral.id, peripheral);
        setPeripherals(localperipherals);

        // InputPeripheralsID.push(peripheral.id);
        // setPeripheralsID(InputPeripheralsID);

      }else{  // 그 이후에는 비교하며 넣는다.
        Array.from(peripherals.keys()).forEach(function(item, index){
          if(item == peripheral.id)check++;
          //console.log(index + " + "+item +" + "+ peripheral.id+ "= " + check);
        });
          if(check == 0){
          //SCAN하면서 peripherals에 데이터를 바로 저장한다. 
          localperipherals.set(peripheral.id, peripheral);
          setPeripherals(localperipherals);
          console.log(Array.from(peripherals.keys()));
        }
      }
      //SCAN한 peripheral의 id 값을 저장한다.
      InputPeripheralsID.push(peripheral.id);
      setPeripheralsID(InputPeripheralsID);
    }
    
  }

  return (
    <>
    <StatusBar backgroundColor={'#ff6600'} barStyle="light-content"/> 
    
    <SafeAreaView style={styles.wrap}>
    <ScrollView style={styles.scroll}>
            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>검색중</Text>
              </View>
            }
            <FlatList
              data={list}
              renderItem={({ item }) => <BatteryInfo Battery={item} navigation={navigation} /> }
              keyExtractor={item => item.id.toString()}
            />
          </ScrollView>
    </SafeAreaView>
    </> 
  );
}

const styles = StyleSheet.create({
  Header: {
    height: "10%",
    backgroundColor: '#ff6600',
    justifyContent: 'space-between',
  },
  HeaderTitle: {
    color: '#000000',
    fontSize : 20,
    margin: 40,
    fontWeight : "bold",
  },
  scroll:{
    height: "100%",
    backgroundColor: '#FFFFFF',
  },
});