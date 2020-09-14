import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity,
        Dimensions } from 'react-native';

function Description({ navigation, Battery, Data}) {

  var size = Dimensions.get('window').width/100;
  var voltage = (Data[2] + (Data[3]*256))/1000; // 단위 v
  var cyclecount = Data[4] + (Data[5]*256); // 회 
  var ttf = Data[6] + (Data[7]*256); // 분 
  var tte = Data[8] + (Data[9]*256); // 분 
  var temperature = (Data[10] + (Data[11]*256))/10 + 273.15  // 셀시어스   
  var soh = Data[12]; // %? hex? Ten?

 /* const [voltage, SetVoltage] = useState();
  const [cyclecount, SetCyclecount] = useState();
  const [ttf, SetTTF] = useState();
  const [tte, SetTTE] = useState();
  const [temperature, SetTemperature] = useState(); 
  const [soh, SetSOH] = useState();
  const [status, SetStatus] = useState();
  const [cnr, SetCNR] = useState();
  const [chargestate, SetChargestate] = useState();
 
  useEffect(()=> {

    SetVoltage(Data.bytes[2] + Data.bytes[3] * 16);
    SetCyclecount(Data.bytes[4] + Data.bytes[5] * 16);
    SetTTF(Data.bytes[6] + Data.bytes[7] * 16);
    SetTTE(Data.bytes[8] + Data.bytes[9] * 16);
    SetTemperature(Data.bytes[10] + Data.bytes[11] * 16);
    SetSOH(Data.bytes[12]);
    //SetStatus(Battery.advertising.manufacturerData.bytes[17]);

  
  });*/  
  console.log("no charging , code :", voltage);
  return (
    <>
      <View style={styles.Data}>
        <View style={styles.Dataempty}></View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#F5D0A9'}}>ㆍ VOLTAGE</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#F5D0A9'}}>ㆍ CYCLE COUNT</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#F5D0A9'}}>ㆍ Time to Full</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#F5D0A9'}}>ㆍ Time to Empty</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#F5D0A9'}}>ㆍ TEMP</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#F5D0A9'}}>ㆍ SOH</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#F5D0A9'}}>ㆍ STATUS</Text>
        </View>
        <View style={styles.Dataval}>
          <Text style={{fontSize: size*4.5, color:'#FBF5EF'}}>{voltage} V</Text>
          <Text style={{fontSize: size*4.5, color:'#FBF5EF'}}>{cyclecount} Cycle</Text>
          <Text style={{fontSize: size*4.5, color:'#FBF5EF'}}>{ttf} min</Text>
          <Text style={{fontSize: size*4.5, color:'#FBF5EF'}}>{tte} min</Text>
          <Text style={{fontSize: size*4.5, color:'#FBF5EF'}}>{temperature} °C</Text>
          <Text style={{fontSize: size*4.5, color:'#FBF5EF'}}>{soh} %</Text>
          <Text style={{fontSize: size*4.5, color:'#FBF5EF'}}>{Battery[9]}</Text>
        </View>
      </View>

      <View style={styles.Navempty}></View>
      <View style={styles.Nav}>
        <View style={styles.Navbtn}>
          <Button
            color="#DF7401"
            title="C h e c k"
            fontSize =""
            onPress={()=>Alert.alert('Send Data to Beacon')}
          />
        </View>

      </View>
      <View style={styles.Navempty}></View>
    </>
  );
}

const styles = StyleSheet.create({
  Data:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#B45F04',
  },
  Dataempty:{
    flex: 0.4,
  },
  Datadescription:{
    flex: 1,
  },
  Dataval:{
    flex: 1,
  },
  Nav:{
    backgroundColor: '#B45F04',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.2,
    flexDirection: 'row',
  },
  Navbtn:{
    flex: 0.5,
  },
  Navlist:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  image: {
    width: 45,
    height: 45,
  },
  Navempty: {
    backgroundColor: '#B45F04',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Description;