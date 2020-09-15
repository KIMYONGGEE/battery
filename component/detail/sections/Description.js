import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity,
        Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';

var size = Dimensions.get('window').width/100;
// var statuscolor = '#088A29';

function Description({ navigation, Battery, Data}) {

  const [statuscolor, SetColor] = useState('#000000');

  var voltage = (Data[2] + (Data[3]*256))/1000; // 단위 v
  var cyclecount = Data[4] + (Data[5]*256); // 회 
  var ttf = Data[6] + (Data[7]*256); // 분 
  var tte = Data[8] + (Data[9]*256); // 분 
  var temperature = (Data[10] + (Data[11]*256))/10 + 273.15;  // 셀시어스   
  var soh = Data[12]; // %? hex? Ten?
  var SG = Data[13];
  var PF = Data[14];
  var CNR = Data[15];
  var charging = Data[16];//0 or 1 

  var LEV2ERROR ="";
  var LEV1ERROR ="";
  var status="O.K";
  console.log("충전" + SG);

  useEffect(()=> {
    if(status =="O.K") SetColor('#088A29');

    //Level 2 ERROR(SG) :
    if(SG!=0){ 
      if(SG==1) status = "LOW BAT";
      else if(SG==2) status = "O.T.D";
      else if(SG==3) status = "O.T.C";
      else if(SG==4) status = "U.T.C";
      else if(SG==5) status = "O.V";
      else if(SG==6) status = "O.C.D";
      else if(SG==7) status = "O.C.C";
      else if(SG==8) status = "O.T.I";
      else status = "Level 2 Error";
    }

    // Level 1 ERROR(PF) : 
    if(PF!=0){
      if(PF==1) status = "PF STATUS VALUE";
      else if(PF==2) status = "C.F";
      else if(PF==3) status = "L.V";
      else status = "Level 1 error";
    }

    if(SG == 0 && PF == 0){
      status = "O.K";
    }
  });

  return (
    <>
      <View style={styles.Data}>
        <View style={styles.Datadescription}>
          <Text style={styles.DataTitle}>VOLTAGE</Text>
          <Text style={styles.DataContents}>{voltage} V</Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={styles.DataTitle}>CYCLE COUNT</Text>
          <Text style={styles.DataContents}>{cyclecount} Cycle</Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={styles.DataTitle}>Time to Full</Text>
          <Text style={styles.DataContents}>{ttf} min</Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={styles.DataTitle}>Time to Empty</Text>
          <Text style={styles.DataContents}>{tte} min</Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={styles.DataTitle}>TEMP</Text>
          <Text style={styles.DataContents}>{temperature} °C</Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={styles.DataTitle}>SOH</Text>
          <Text style={styles.DataContents}>{soh} %</Text>
        </View>
        <View style={styles.Datadescription}>
          <Text style={styles.DataTitle}>STATUS</Text>
          <Text style={{fontSize: size*4.5,fontWeight: 'bold', color:statuscolor}}>{status}</Text>
        </View>
      </View>

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

      
    </>
  );
}

const styles = StyleSheet.create({
  Data:{
    borderTopWidth: 10,
    borderTopColor: '#e4e6e5',
    width: "100%",
    height: '80%',
    backgroundColor: '#ffffff',
  },
  Datadescription:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: size * 5.5,
    paddingLeft: size * 10,
    paddingRight: size * 10,
    width: '100%',
    height: '14.2857%',
    borderBottomWidth: 0.2,
    textAlign: 'center',
    // marginTop: 50,
    // marginBottom: 50,
  },
  Nav:{
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '20%',
    width: '100%',
    flexDirection: 'row',
  },
  Navbtn:{
    width: '60%',
    height: '50%',
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
    backgroundColor: '#ffffff',
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DataTitle: {
    fontSize: size*4.5, 
    fontWeight: 'bold',
    color:'#A4A4A4',
  },
  DataContents: {
    fontSize: size*4.5, 
    fontWeight: 'bold',
    color:'#424242',
  },
  DataStatus:{
    fontSize: size*4.5, 
    fontWeight: 'bold',
    // color: statuscolor,
  }
});

export default Description;