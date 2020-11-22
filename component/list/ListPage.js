import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, NativeEventEmitter, NativeModules, Platform,
         PermissionsAndroid, AppState, FlatList, Dimensions, SafeAreaView, RefreshControl } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { ScrollView } from 'react-native-gesture-handler';

//page
import BatteryInfo from './sections/BatteryInfo';

// const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function ListPage({navigation, route}){

  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(false);

  //SCAN해서 찾은 Beacon 저장하는 State
  const [peripherals, setPeripherals] = useState(new Map());
  var scanperipherals = new Set();
  
  const [refreshing, setRefreshing] = useState(false);

  const [appState, setAppState] = useState('');

  const list = Array.from(new Set(peripherals.values()));

  useEffect(() =>{
    console.log("이벤트 리스너 이펙트 실행");

    BleManager.start({showAlert: false});
    console.log("첫번째 시작"); 
    
    AppState.addEventListener('change', handleAppStateChange);
    
    const handlerConnect = bleManagerEmitter.addListener('BleManagerConnectPeripheral', handleConnectedPeripheral );
    const handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral );
    const handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    const handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );

    return () => {
      console.log("이벤트 리스너 이펙트 종료");
      handlerConnect.remove();
      handlerDiscover.remove();
      handlerStop.remove();
      handlerDisconnect.remove();
      BleManager.stopScan();
    };

  }, []);

  useEffect(() =>{
    
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
  }, [scanning, connecting]);

  const handleAppStateChange = (nextAppState)  => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    setAppState(nextAppState);
  }

  const handleDisconnectedPeripheral = (data) => {    //data.periheral : id값, data.status값이 있다.
    console.log("data = ", data);
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
    update();
  }

  const startScan = () => {
    console.log("Scanning start");

    BleManager.scan([], 15, true).then((results) => { //7초이상 권장사항
    });

    setScanning(true);
  }

  //스캔한 값에 따라 동기적으로 데이터를 처리하기 위한 함수
  //새로 들어온 값이 기존에 있던 값에 존재하지 않으면 삭제한다 (ID로 비교)
  const update = () =>{
    var j = 0;
    console.log("Update start");

    let peripheralskeys = Array.from(peripherals.keys());
    let scankeys = Array.from(scanperipherals);
    console.log("peripherals length = ", scankeys.length, typeof(scankeys), typeof(peripheralskeys));

    for(var i = 0; i < peripheralskeys.length; i++){
      for(j = 0; j < scankeys.length; j++){
        console.log("index", i, scankeys[j]);
        if(peripheralskeys[i] == scankeys[j]){
          console.log("find equal");
          break;
        }
      }

      if(j == scankeys.length){
        var tmp = peripheralskeys[i];
        console.log("없는거", tmp, typeof(peripherals));
        console.log(peripherals.delete(tmp))
        setPeripherals(new Map(peripherals));
      }
    }

    console.log("update finish", peripherals.size, scankeys.length);
    
    scanperipherals.clear();
    console.log("Update finish");
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

    if(checkShit === 7){    //NEOSEMI를 찾았을때 실행하는 부분
      scanperipherals.add(peripheral.id);
      setPeripherals(new Map(peripherals.set(peripheral.id, peripheral)));

      console.log("find", peripherals.size, scanperipherals.size);
      
    } 
  }


 const onRefresh =() =>{
   setRefreshing(true);
   reff();
 }

 const reff = () => {

  BleManager.getConnectedPeripherals([]).then((results) => {
    console.log("refresh result = ", results);
    if(results.length > 0){
      for(var i = 0; i < results.length; i++){
        console.log("disconnect", results[i].id, results.length);
        BleManager.disconnect(results[i].id)
        .then(() => {
          // Success code
          console.log("Disconnected");
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
      }
    }
    setRefreshing(false);
  });
    // BleManager.stopScan(); //스캔 스탑

    // updatePeripheralsID.forEach(function(e, i){ //디스커넥트 다 하기
    //   BleManager.disconnect(e).then(console.log("디스커넥트", e));
    // })
    
    // updatePeripherals.clear();//저장된거 비우기
    // setScanning(false);
    // setRefreshing(false);
 }
 return (
  <>
  <StatusBar backgroundColor={'#ffffff'} color={'#585858'} barStyle="night-content"/> 
  <SafeAreaView>
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
          <Text style={styles.title}>Status</Text>
          <Text style={styles.title}>S/N</Text>
          <Text style={styles.title}>Cycle</Text>
        </View>
      }
      {(list.length == 0) &&
        <View style={{flex:1, margin: 20}}>
          <Text style={{textAlign: 'center', color: '#353535', fontWeight : "bold"}}>Searching...</Text>
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
  backgroundColor: '#F3F2F2',
},
container:{
  flexDirection:'row',
  backgroundColor: '#ffffff',
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingBottom: 4,
  paddingTop: 4,
},

title:{
  fontSize: 18,
  fontWeight: 'bold',
  margin: 3,
  color: '#353535'
}
});