import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

var size = Dimensions.get('window').width/100;
// var statuscolor = '#088A29';

function Description({ navigation, Battery, Chargestatus, Data}) {

  const [statuscolor, SetColor] = useState('#00FF73');
  var voltage = ((Data[2] + (Data[3]*256))/1000) ; // 단위 v
  var soc = Data[4];  //State of Charge 단위 %
  var cyclecount = Data[6] + (Data[7]*256); // 회 
  var ttf = Data[8] + (Data[9]*256); // 분 
  var tte = Data[10] + (Data[11]*256); // 분 
  var temperature = (Data[12] + (Data[13]*256))/10 - 273.15;  // 셀시어스   
  var soh = Data[14]; // %? hex? Ten?
  var SG = Data[15];
  var SGH = Data[16];
  var PF = Data[17];
  var CNR = Data[18];
  var CELLV = Data[19];
  var charging = Data[20];//0 or 1 or 2 (charging, discharging, 대기모드)

  var LEV2ERROR ="";
  var LEV1ERROR ="";
  var status="O.K";

  var Time ="";
  var ttstringh="";
  var ttstringm="";
  var ttstring="";
  var tap=" ";

  useEffect(()=> {
    console.log("Description Use");
    if(status =="O.K") SetColor('#57B75D');

    //Level 2 ERROR(SG) :
    if(SG!=0){ 
      SetColor("#FFB300");
      if(SG==1) status = "LOW BAT";
      else if(SG==2) status = "O.T.D";
      else if(SG==3) status = "O.T.C";
      else if(SG==4) status = "U.T.C";
      else if(SG==5) status = "O.V";
      else if(SG==6) status = "O.C.D";
      else if(SG==7) status = "O.C.C";
      else if(SG==8) status = "O.T.I";
      else if(SG==9) status = "ASCDL";
      else if(SG==10) status = "ASCCL";
      else if(SG==11) status = "AOLDL";
      else if(SG==12) status = "C.U.V";
      else status = "Level 2 Error";
    }

    // Level 1 ERROR(PF) : 
    if(PF!=0){
      SetColor("#FF3322");
      status = "FAULT(PF" + PF + ")";
    }

    if(SG == 0 && PF == 0){
      status = "O.K";
    }
  });

  if(ttf > 65000 && tte > 65000){
    Time="Time to Empty";
    ttstring='-';
  }

  else{
    if (charging==0){
      Time="Time to Full";
      ttstringh=ttf/60;
      ttstringm=ttf%60;
      ttstring = ttstringh.toFixed(0) + 'h ' + ttstringm +'min'
      if(ttf>=65000){
        ttstring='-'
      }
    }
    else if(charging==1){
      Time="Time to Empty";
      ttstringh=tte/60;
      ttstringm=tte%60;
      ttstring = ttstringh.toFixed(0) + 'h ' + ttstringm +'min'
      ttstring = ttstringh.toFixed(0) + 'h ' + ttstringm +'min'
      if(tte>=65000){
        ttstring='-'
      }
    }
  }
  
  return (
    <>
      <View style={styles.Data}>

        <View style={styles.voltempInfo}>
          <View style={styles.Datadescriptionvoltmp}>
            
            <Text style={styles.voltemp}>
              <Image style={styles.image}  source = {require('../../../assets/voltage.png')}  />
              {tap}
              {voltage.toFixed(2)}V
            </Text>

            <Text style={styles.voltemp}>
              <Image style={styles.image} source = {require('../../../assets/temp.png')} />
              {tap}
              {temperature.toFixed(0)}°C
            </Text>
          </View>
        </View>

         <View style={styles.BatteryInfo}>
          <View style={styles.Datadescription}>
            <Text style={styles.DataTitle}>CYCLE COUNT</Text>
            <Text style={styles.DataContents}>{cyclecount} Cycle</Text>
          </View>
          <View style={styles.DatadescriptionEnd}>
            <Text style={styles.DataTitle}>{Time}</Text>
            <Text style={styles.DataContents}>{ttstring}</Text>
          </View>
        </View>
        

        <View style={styles.BatteryData}>
          <View style={styles.Datadescription}>
            <Text style={styles.DataTitle}>SOH</Text>
            <Text style={styles.DataContents}>{soh} %</Text>
          </View>
          <View style={styles.DatadescriptionEnd}>
            <Text style={styles.DataTitle}>STATUS</Text>
            <Text style={{fontSize: size*4.5,fontWeight: 'bold', color:statuscolor}}>{status}</Text>
          </View>
        </View>

        

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Data:{
    width: "100%",
    height: '70%',
    backgroundColor: '#ffffff',
  },
  Datadescription:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: size * 5.5,
    paddingLeft: size * 10,
    paddingRight: size * 10,
    flex: 1,
    textAlign: 'center',
    borderBottomWidth: 0.9,
    borderBottomColor: "#ffffff",
    // marginTop: 50,
    // marginBottom: 50,
  },
  DatadescriptionEnd:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: size * 5.5,
    paddingLeft: size * 10,
    paddingRight: size * 10,
    flex: 1,
    textAlign: 'center',
  },
    Datadescriptionvoltmp:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: size * 7.5,
    paddingLeft: size * 10,
    paddingRight: size * 10,
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: 45,
    height: 45,
  },
  voltemp: {
    fontSize: size*6.5, 
    fontWeight: 'bold',
    color:'#585858',
  },
  DataTitle: {
    fontSize: size*4.5, 
    fontWeight: 'bold',
    color:'#353535',
  },
  DataContents: {
    fontSize: size*4.5, 
    color:'#353535',
  },
  DataStatus:{
    fontSize: size*4.5, 
    fontWeight: 'bold',
    // color: statuscolor,
  },
  StatusDescription:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: size * 5.5,
    paddingLeft: size * 10,
    paddingRight: size * 10,
    width: '100%',
    height: '14.2857%',
    textAlign: 'center',
    // marginTop: 50,
    // marginBottom: 50,
  },
   voltempInfo:{
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginLeft: size * 3,
    marginRight: size * 3,
  },
  BatteryInfo:{
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    marginTop: size * 2,
    marginLeft: size * 3,
    marginRight: size * 3,
  },
  BatteryData:{
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    marginTop: size * 2,
    marginLeft: size * 3,
    marginRight: size * 3,
  },
  image: {
    width:size*6,
    height:size*6,
  }
});

export default Description;