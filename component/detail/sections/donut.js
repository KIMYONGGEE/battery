import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Dimensions,Image } from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function donut({Charge, Chargestatus}){

const [imgpath, setImagepath] = useState('');

const [color, SetColor] = useState("");

var charging = "";

if(Chargestatus == 0) {
//setImagepath(require('../../../assets/main/100.png'));
charging="Charging..."
}
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
});

var size = Dimensions.get('window').width/100;


  return (
    <AnimatedCircularProgress
        size={size*70}
        width={size*8}
        fill={Charge} 
        rotation={0}
        tintColor={color}
        backgroundColor="#E6E7D9">
        {
            (fill) => (
            <Text style={{fontSize: size*10,}}>
                {Charge}%
            </Text>
            )
        }
    </AnimatedCircularProgress>
  )
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center',},
})