import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Dimensions,Image, View } from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function donut({Charge, Chargestatus, Data}){

const [color, SetColor] = useState("");
const [chargestate, setChargestate] = useState("");

var charging = Charge +"%\n";
// console.log("Chargesstatus clear");
var soc = Data[4];
var SG = Data[15];
var PF = Data[17];
var ttf = Data[8] + (Data[9]*256); // 분 
var tte = Data[10] + (Data[11]*256); // 분 

// 테스트용
// var ttf = 30;
// var tte = 65535;
// Chargestatus = 0;
// PF = 1;
// Chargestatus = 1;
// tte = 30;

var size = Dimensions.get('window').width/100;


useEffect(()=> {
  // 충전, 방전, 대기상태 판단
  if(Chargestatus == 0){  // 충전
    setChargestate("Charging...");
    if(ttf>=65000){
      setChargestate(" ");
    }
  }
  else if(Chargestatus == 1){ // 방전
    setChargestate("Discharging...");
    if(tte>=65000){
      setChargestate(" ");
    }
  }
  else if(Chargestatus == 2 || (ttf > 65000 && tte > 65000)){ // 대기
    setChargestate(" ");
  }


  // 오류 레벨 판단
  if(SG == 0 && PF == 0){   // O.K
    SetColor('#57B75D');
  }
  else if(SG != 0){   // 2급 고장
    SetColor("#FF3322");
    if(SG != 1){
      setChargestate("ERROR!");
    }
    else if(SG == 1){
      SetColor("#FFB300");
    }
  }
  else if(PF != 0){  // 1급 고장
    SetColor("#FF3322");
    setChargestate("ERROR!");
  }




  console.log("chargeStatus = ", Chargestatus, "SG = ", SG, "PF = ", PF, "ttf = ", ttf, "tte = ", tte);
  // if(Charge <= 20) SetColor("#FFB300");
  // else SetColor("#57B75D");
  // // else if(Charge <= 30 )SetColor("#FF7300");
  // // else if(Charge <= 40 )SetColor("#FFB300");
  // // else if(Charge <= 50 )SetColor("#FFFF00");
  // // else if(Charge <= 60 )SetColor("#CCFF00");
  // // else if(Charge <= 70 )SetColor("#8CFF00");
  // // else if(Charge <= 80 )SetColor("#4CFF00");
  // // else if(Charge <= 90 )SetColor("#00FF1A");
  // // else if(Charge <= 100 )SetColor("#00FF73");

  // if(ttf > 65000 && tte > 65000){
  //   setChargestate(" ");
  //   // chargestate = "Discharging...";
  // }

  // else{
  //   if (Chargestatus==0){
  //     setChargestate("Charging...");
  //     // chargestate = "Charging...";
  //     if(ttf>=65000){
  //       setChargestate(" ");
  //       // chargestate = " ";
  //     }
  //   }
  //   else if(Chargestatus==1){
  //     setChargestate("Discharging...");
  //     // chargestate = "Discharging...";
  //     if(tte>=65000){
  //       setChargestate(" ");
  //       // chargestate = "Discharging...";
  //     }
  //   }
  // }

  // if(SG!=0){ 
  //   setChargestate("ERROR!");
  //   // chargestate = "ERROR!";
  //   // LOW BAT일때 ERROR문구 표시 안되게끔!
  // }

  // // Level 1 ERROR(PF) : 
  // if(PF!=0){
  //   setChargestate("ERROR!");
  //   // chargestate = "ERROR!";
  // }
  
});
  //setImagepath(require('../../../assets/main/e100.png'));

  return (
    <AnimatedCircularProgress
        size={size*70}
        width={size*8}
        fill={soc} 
        rotation={0}
        tintColor={color}
        backgroundColor="#e3e3e3">
        {
            (fill) => (
            <Text style={{fontSize: size*15,color:'#353535', textAlign: 'center'}}>
              <Text>{charging}</Text>
              {/* <Image style={{height:size*13,width:size*27.8}} source={imgpath}/> */}
              <Text style={{fontSize: size* 4}}>{chargestate}</Text>
            </Text>
            )
        }
    </AnimatedCircularProgress>
  )
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  image: {
    width:100,
    height:47,
  }
})