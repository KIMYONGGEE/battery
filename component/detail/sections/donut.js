import React, { useState, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function donut({Charge}){

const [color, SetColor] = useState("");

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

  return (
    <AnimatedCircularProgress
        size={300}
        width={35}
        fill={Charge}
        rotation={0}
        tintColor={color}
        backgroundColor="#E6E7D9">
        {
            (fill) => (
            <Text style={{fontSize: 45,}}>
                {Charge}%
            </Text>
            )
        }
    </AnimatedCircularProgress>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
})