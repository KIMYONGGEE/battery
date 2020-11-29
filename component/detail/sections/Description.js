import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

var size = Dimensions.get('window').width/100;
// var statuscolor = '#088A29';

function Description({ navigation, Data}) {

  const [statuscolor, SetColor] = useState('#00FF73');
  const [status, setStatus] = useState('');
  const [ttstring, setTTString] = useState('');
  const [timebtr, setTimebtr] = useState('');

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

  //테스트용
  // var ttf = 30;
  // var tte = 65535;
  // var charging = 0;
  // PF = 1;


  var ttstringh="";
  var ttstringm="";
  var tap=" ";

  useEffect(()=> {

    // 충전, 방전, 대기상태 판단
    if(charging == 0){  // 충전
      setTimebtr("Time to Full");
      ttstringh=ttf/60;
      ttstringm=ttf%60;
      setTTString(Math.floor(ttstringh) + 'h ' + ttstringm +'min');
      if(ttf>=65000){
        setTTString('-');
      }
    }
    else if(charging == 1){ // 방전
      setTimebtr("Time to Empty");
      ttstringh=tte/60;
      ttstringm=tte%60;
      setTTString(Math.floor(ttstringh) + 'h ' + ttstringm +'min');
      if(tte>=65000){
        setTTString('-');
      }
    }
    else if(charging == 2 || (ttf > 65000 && tte > 65000)){ // 대기
      setTimebtr("Time to Empty");
      setTTString('-');
    }


    // 오류 레벨 판단
    if(SG == 0 && PF == 0){   // O.K
      setStatus("O.K");
      SetColor('#57B75D');
    }
    else if(SG != 0){   // 2급 고장 !=0
      SetColor("#FFB300");
      if(SG==1) setStatus("LOW BAT");// ==1
      else if(SG==2) setStatus("O.T.D");
      else if(SG==3) setStatus("O.T.C");
      else if(SG==4) setStatus("U.T.C");
      else if(SG==5) setStatus("O.V");
      else if(SG==6) setStatus("O.C.D");
      else if(SG==7) setStatus("O.C.C");
      else if(SG==8) setStatus("O.T.I");
      else if(SG==9) setStatus("ASCDL");
      else if(SG==10) setStatus("ASCCL");
      else if(SG==11) setStatus("AOLDL");
      else if(SG==12) setStatus("C.U.V");
      else setStatus("Level 2 Error");
    }
    else if(PF != 0){  // 1급 고장
      SetColor("#FF3322");
      setStatus("FAULT(PF : " + PF + ")");
    }

    // console.log("Description Use");
    // if(status =="O.K") SetColor('#57B75D');

    // //Level 2 ERROR(SG) :
    // if(SG!=0){ 
    //   SetColor("#FFB300");
    //   if(SG==1) setStatus("LOW BAT");
    //   else if(SG==2) setStatus("O.T.D");
    //   else if(SG==3) setStatus("O.T.C");
    //   else if(SG==4) setStatus("U.T.C");
    //   else if(SG==5) setStatus("O.V");
    //   else if(SG==6) setStatus("O.C.D");
    //   else if(SG==7) setStatus("O.C.C");
    //   else if(SG==8) setStatus("O.T.I");
    //   else if(SG==9) setStatus("ASCDL");
    //   else if(SG==10) setStatus("ASCCL");
    //   else if(SG==11) setStatus("AOLDL");
    //   else if(SG==12) setStatus("C.U.V");
    //   else setStatus("Level 2 Error");
    // }

    // // Level 1 ERROR(PF) : 
    // if(PF!=0){
    //   SetColor("#FF3322");
    //   setStatus("FAULT(PF" + PF + ")");
    // }

    // if(SG == 0 && PF == 0){
    //   setStatus("O.K");
    //   SetColor('#57B75D');
    // }

    // if(ttf > 65000 && tte > 65000){
    //   Time="Time to Empty";
    //   setTTString('-');
    // }
  
    // else{
    //   if (charging==0){
    //     Time="Time to Full";
    //     ttstringh=ttf/60;
    //     ttstringm=ttf%60;
    //     setTTString(ttstringh.toFixed(0) + 'h ' + ttstringm +'min');
    //     if(ttf>=65000){
    //       setTTString('-');
    //     }
    //   }
    //   else if(charging==1){
    //     Time="Time to Empty";
    //     ttstringh=tte/60;
    //     ttstringm=tte%60;
    //     setTTString(ttstringh.toFixed(0) + 'h ' + ttstringm +'min');
    //     setTTString(ttstringh.toFixed(0) + 'h ' + ttstringm +'min');
    //     if(tte>=65000){
    //       setTTString('-');
    //     }
    //   }
    // }

  });
  
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
            <Text style={styles.DataTitle}>{timebtr}</Text>
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