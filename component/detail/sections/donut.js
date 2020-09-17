import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Dimensions,Image, View } from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function donut({Charge, Chargestatus, Data}){

const [color, SetColor] = useState("");
const [imgpath, setImagepath] = useState('');

var charging = "\n"+Charge +"%\n";

var SG = Data[13];
var PF = Data[14];

var size = Dimensions.get('window').width/100;


useEffect(()=> {
  if(Charge <= 10)SetColor("#FF0000");
  else if(Charge <= 20 )SetColor("#FF3300");
  else if(Charge <= 30 )SetColor("#FF7300");
  else if(Charge <= 40 )SetColor("#FFB300");
  else if(Charge <= 50 )SetColor("#FFFF00");
  else if(Charge <= 60 )SetColor("#CCFF00");
  else if(Charge <= 70 )SetColor("#8CFF00");
  else if(Charge <= 80 )SetColor("#4CFF00");
  else if(Charge <= 90 )SetColor("#00FF1A");
  else if(Charge <= 100 )SetColor("#00FF73");
  
  if(SG==0 && PF==0) {
      setImagepath(require('../../../assets/main/null.png'));
      if(Chargestatus == 0) {
        setImagepath(require('../../../assets/main/c0.png'));
      }
  }
  if(SG!=0 || PF!=0) setImagepath(require('../../../assets/main/e100.png'));

});


console.log(Chargestatus);

  return (
    <AnimatedCircularProgress
        size={size*60}
        width={size*6}
        fill={Charge} 
        rotation={0}
        tintColor={color}
        backgroundColor="#f0f2f1">
        {
            (fill) => (
            <Text style={{fontSize: size*11,color:'#000000'}}>
              {/* <Image style={{height:size*13,width:size*27.8}} source={imgpath}/> */}
              {charging} 
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