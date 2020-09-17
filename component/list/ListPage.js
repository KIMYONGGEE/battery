import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, NativeEventEmitter, NativeModules, Platform,
         PermissionsAndroid, AppState, FlatList, Dimensions, Button, SafeAreaView, RefreshControl } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { ScrollView } from 'react-native-gesture-handler';

//page
import BatteryInfo from './sections/BatteryInfo';

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function ListPage({navigation, route}){
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(false);

  //SCAN해서 찾은 Beacon 저장하는 State
  const [peripherals, setPeripherals] = useState(new Map());
  
  //추가, 삭제된 Beacon들을 구분하기위해 SCAN에서 찾은 해당 id를 저장하는 State
  const [peripheralsID, setPeripheralsID] = useState(new Array());
  const [updatePeripheralsID, setUpdatePeripheralsID] = useState(new Array());

  //기존의 peripherals에서 추가, 삭제된 값을 저장하는 State
  const [updatePeripherals, setUpdatePeripherals] = useState(new Map());
  
  const [refreshing, setRefreshing] = useState(false);
  const [test, setTest] = useState(false);

  const [appState, setAppState] = useState('');
  const list = Array.from(new Set(updatePeripherals.values()));

  useEffect(() =>{
    AppState.addEventListener('change', handleAppStateChange);
    BleManager.start({showAlert: false});
    const handlerConnect = bleManagerEmitter.addListener('BleManagerConnectPeripheral', handleConnectedPeripheral );
    const handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral );
    const handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    const handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    
    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              //console.log("Permission is OK");
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
    BleManager.enableBluetooth() //Bluetooth를 자동으로 활성화할 수 있게 허용 유무을 묻는다.
    .then(() => {
      if(scanning == false && connecting == false){
        startScan();
      }
    })
    .catch((error) => {
      // Failure code
      console.log("The user refuse to enable bluetooth");
    });


    return () => {
      handlerConnect.remove();
      handlerDiscover.remove();
      handlerStop.remove();
      handlerDisconnect.remove();
    };
  }, [scanning, connecting, test]);

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
    setConnecting(false);
  }

  const handleConnectedPeripheral= (data) => {
    console.log("connected");
    setConnecting(true);
  }

  const handleStopScan =() => {
    console.log('Scan is stopped');
    setScanning(false);
  }

  const startScan = () => {
    console.log("Scanning start");
    async function A(){
      await BleManager.scan([], 15, true).then((results) => { //7초이상 권장사항
        update(); 
      });
    }
    A();
    setScanning(true);
  }

  //스캔한 값에 따라 동기적으로 데이터를 처리하기 위한 함수
  //새로 들어온 값이 기존에 있던 값에 존재하지 않으면 삭제한다 (ID로 비교)
  const update = () =>{
    let updateID = Array.from(new Set(peripheralsID)); //새로 들어온 peripheralsID를 저장하는 배열
    let existID = updatePeripheralsID;                 //기존에 있던 peripheralsID를 저장하는 배열
    let noneID = new Array();                          //비교해서 들어있지 않은 인덱스를 저장하는 배열
    
    //추가 삭제한 부분을 처리해주는 부분
    //console.log("추가된 값(updtaID) : " + updateID);

    if(existID.length != 0) //기존에 들어있는 값이 있을때에만 비교를 한다. 새로들어온 값은 항상 비교한다. 
    {
      //사라진 값이 있는지 비교
      //console.log("기존 값(existID)   : " + existID);
      existID.forEach(function(item, index){
        var checkNone = 0;
        for(var a = 0; a < updateID.length; a++){ //비교를 해서 check가 0이면 버리는 값이라서 noneID에 저장
          if(item == updateID[a]){
            checkNone++;
          }
        }
        if(checkNone === 0){
          //console.log(item);
          noneID.push(item);
        }
      });
      
      //사라진값 삭제
      //console.log("버릴 값            : " + noneID);
      for(var a = 0; a < noneID.length; a++){
        peripherals.delete(noneID[a]);
      }     
    }
    
    //값 변경하기
    setUpdatePeripherals(peripherals);
    setUpdatePeripheralsID(updateID);
    setPeripheralsID(new Array()); //스캔이 끝나면 비워서 새로운 값을 받을 수 있게 한다. 
  }

  //값을 받아오고 저장한다.
  //스캔중 비콘을 키면 세팅하는 시간이 있어서 데이터가 다 들어오지 못한다. (똥값이 생김)
  //이전에는 name == NEOSEMI 로만 판단해서 똥값도 같이 들어왔지만 bytes로 비교해서 이를 방지했다.
  const handleDiscoverPeripheral = (peripheral) => {
    var checkShit = 0;
    var shitList = [78, 69, 79, 83, 69, 77, 73]; //NEOSEMI
      for(var a = 0; a < 7; a++){ 
        if(peripheral.advertising.manufacturerData.bytes[a+20] == shitList[a]){ //20번째부터
          checkShit++;
        }
      }
    if(checkShit === 7){
      var localperipherals = peripherals;
      var InputPeripheralsID = peripheralsID;
      var check=0;

      console.log(peripheral.id);
      console.log('Got ble peripheral', peripheral);

      if (!peripheral.name) {
        peripheral.name = 'NO NAME';
      }
      //중복 방지를 위한 IF문
      if(Array.from(peripherals.keys()).length == 0){ //초기값은 그냥 넣는다. 
        localperipherals.set(peripheral.id, peripheral);
        setPeripherals(localperipherals);

      }else{ //그 이후에는 비교하며 넣는다.
        Array.from(peripherals.keys()).forEach(function(item, index){
          if(item == peripheral.id)check++;
        });
          if(check == 0){
          //SCAN하면서 peripherals에 데이터를 바로 저장한다. 
          localperipherals.set(peripheral.id, peripheral);
          setPeripherals(localperipherals);
        }
      }
      //SCAN한 peripheral의 id 값을 저장한다.
      InputPeripheralsID.push(peripheral.id);
      setPeripheralsID(InputPeripheralsID);
    } 
  }
 const onRefresh =() =>{
   setRefreshing(true);
   reff();
 }

 const reff = () => {
  BleManager.stopScan(); //스캔 스탑

  updatePeripheralsID.forEach(function(e, i){ //디스커넥트 다 하기
    BleManager.disconnect(e).then(console.log("디스커넥트", e));
  })
   
  updatePeripherals.clear();//저장된거 비우기
   setScanning(false);
   setRefreshing(false);
 }
  return (
    <>
    <StatusBar backgroundColor={'#DF7401'} barStyle="light-content"/> 
    <SafeAreaView style={styles.wrap}>      
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              onRefresh ={ () => onRefresh()}
              refreshing ={ refreshing }
            />
          }
        >
              {
                <View style={styles.container}>
                  <Text style={styles.test}>Status</Text>
                  <Text style={styles.test}>ID</Text>
                  <Text style={styles.test}>Cycle</Text>
                </View>
              }
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
    backgroundColor: '#FE9A2E',
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
  container:{
    flex:0,
    flexDirection:'row',
    backgroundColor: '#FE9A2E',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  test:{
    fontSize: 18,
    fontWeight: 'bold',
    margin: 3
  }
});