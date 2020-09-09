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

  return (
    <>
      <View style={styles.Data}>
        <View style={styles.Dataempty}></View>
        <View style={styles.Datadescription}>

          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ VOLTAGE</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ CYCLE COUNT</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ Time to Full</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ Time to Empty</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ TEMP</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ SOH</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ STATUS</Text>
        </View>
        <View style={styles.Dataval}>
          <Text style={{fontSize: size*4}}>{voltage} V</Text>
          <Text style={{fontSize: size*4}}>{cyclecount} Cycle</Text>
          <Text style={{fontSize: size*4}}>{ttf} min</Text>
          <Text style={{fontSize: size*4}}>{tte} min</Text>
          <Text style={{fontSize: size*4}}>{temperature} °C</Text>
          <Text style={{fontSize: size*4}}>{soh} %</Text>
          <Text style={{fontSize: size*4}}>{Battery[9]}</Text>
        </View>
      </View>

      <View style={styles.Navempty}></View>
      <View style={styles.Nav}>
        <View style={styles.Navbtn}>
          <Button
            title="Check"
            onPress={()=>Alert.alert('click')}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('List')}>
        <View style={styles.Navlist}>
          <Image
          style={styles.image}
          source={require('../../../assets/list.png')}
          />
        </View>
        </TouchableOpacity>
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
    flex: 0.2,
  },
});

export default Description;