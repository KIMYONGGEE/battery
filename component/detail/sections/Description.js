import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity,
        Dimensions } from 'react-native';

function Description({ navigation, Battery, Data}) {

  const [color, SetColor] = useState('');

  var size = Dimensions.get('window').width/100;
  var voltage = (Data[2] + (Data[3]*256))/1000; // 단위 v
  var cyclecount = Data[4] + (Data[5]*256); // 회 
  var ttf = Data[6] + (Data[7]*256); // 분 
  var tte = Data[8] + (Data[9]*256); // 분 
  var temperature = (Data[10] + (Data[11]*256))/10 + 273.15  // 셀시어스   
  var soh = Data[12]; // %? hex? Ten?
  var SG = Data[13];
  var PF = Data[14];
  var CNR = Data[15];;
  var charging = Data[16];//0 or 1 

  var LEV2ERROR ="";
  var LEV1ERROR ="";
  var statu="NORMAL";
  

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
  console.log("충전" + SG);

  useEffect(()=> {
    if(statu =="NORMAL") SetColor('#088A29');
  
  });

  //Level 2 ERROR(SG) :
  if(SG!=0){ 
    statu = "ERROR!";
    if(SG==1) LEV2ERROR = "LOW BAT";
    else if(SG==2) LEV2ERROR = "O.T.D";
    else if(SG==3) LEV2ERROR = "O.T.C";
    else if(SG==4) LEV2ERROR = "U.T.C";
    else if(SG==5) LEV2ERROR = "O.V";
    else if(SG==6) LEV2ERROR = "O.C.D";
    else if(SG==7) LEV2ERROR = "O.C.C";
    else if(SG==8) LEV2ERROR = "O.T.I";
    else LEV2ERROR = ""
  }

  // Level 1 ERROR(PF) : 
  if(PF!=0){
    statu = "ERROR!";
    if(PF==1) LEV1ERROR = "PF STATUS VALUE";
    else if(PF==2) LEV1ERROR = "C.F";
    else if(PF==3) LEV1ERROR = "L.V";
    else LEV1ERROR = ""
  }

  return (
    <>
      <View style={styles.Data}>
        <View style={styles.Dataempty}></View>
        <View style={styles.DatadescriptionHead}></View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*6, fontWeight: 'bold', }}>INFROMATION</Text>
          </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5,}}></Text>
          <Text style={{fontSize: size*4.5,fontWeight: 'bold', color:'#424242'}}></Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5,fontWeight: 'bold', color:'#A4A4A4'}}>VOLTAGE</Text>
          <Text style={{fontSize: size*4.5,fontWeight: 'bold', color:'#424242'}}>{voltage} V</Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#A4A4A4'}}>CYCLE COUNT</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold',color:'#424242'}}>{cyclecount} Cycle</Text>
          </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#A4A4A4'}}>Time to Full</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold',color:'#424242'}}>{ttf} min</Text>
          </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#A4A4A4'}}>Time to Empty</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold',color:'#424242'}}>{tte} min</Text>
           </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5,fontWeight: 'bold', color:'#A4A4A4'}}>TEMP</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold',color:'#424242'}}>{temperature} °C</Text>
          </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5,fontWeight: 'bold' , color:'#A4A4A4'}}>SOH</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold',color:'#424242'}}>{soh} %</Text>
           </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold', color:'#A4A4A4'}}>STATUS</Text>
          <Text style={{fontSize: size*4.5, fontWeight: 'bold',color:'#424242'}}>{statu}</Text>
          </View>
        <View style={styles.Datadescription}>  
          <Text style={{fontSize: size*3.5, fontWeight: 'bold', color:'#A4A4A4'}}>LEVEL1 ERROR</Text>
          <Text style={{fontSize: size*3.5, fontWeight: 'bold', color:'red'}}>{LEV1ERROR}</Text>
          </View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*3.5, fontWeight: 'bold', color:'#A4A4A4'}}>LEVEL2 ERROR</Text>
          <Text style={{fontSize: size*3.5, fontWeight: 'bold', color:'red'}}>{LEV2ERROR}</Text>
          </View>
      </View>

      <View style={styles.Navempty}></View>
      <View style={styles.Nav}>
        <View style={styles.Navbtn}>
          <Button
            color="#DF7401"
            title="C h e c k"
            fontSize =""
            onPress={()=>Alert.alert('Send Data to Battery')}
          />
        </View>

      </View>
      <View style={styles.Navempty}></View>
    </>
  );
}

const styles = StyleSheet.create({
  Data:{

    flex: 1,
    backgroundColor: '#FBF5EF',
  },
  Dataempty:{
    flex: 0.5,
  },
  Datadescription:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  DatadescriptionHead:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4.8,
    flex: 1,
  },
  Dataval:{
    flex: 1,
  },
  Nav:{
    backgroundColor: '#FBF5EF',
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
    backgroundColor: '#FBF5EF',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Description;