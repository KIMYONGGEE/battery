import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';

function ChargingBar({Battery, Chargestate, Batteryerr}){

  const [imgpath, setImagepath] = useState('');

  useEffect(()=>{

    if(Chargestate==0){
      //console.log("no charging , code :", Chargestate);
      if(Batteryerr!=0){
        if(Battery  == 100) setImagepath(require('../../../assets/main/e100.png'));
        else if(Battery  >= 90 && Battery  < 100) setImagepath(require('../../../assets/main/e90.png'));
        else if(Battery  >= 80 && Battery  < 90) setImagepath(require('../../../assets/main/e80.png'));
        else if(Battery  >= 70 && Battery  < 80) setImagepath(require('../../../assets/main/e70.png'));
        else if(Battery  >= 60 && Battery  < 70) setImagepath(require('../../../assets/main/e60.png'));
        else if(Battery  >= 50 && Battery  < 60) setImagepath(require('../../../assets/main/e50.png'));
        else if(Battery  >= 40 && Battery  < 50) setImagepath(require('../../../assets/main/e40.png'));
        else if(Battery  >= 30 && Battery  < 40) setImagepath(require('../../../assets/main/e30.png'));
        else if(Battery  >= 20 && Battery  < 30) setImagepath(require('../../../assets/main/e20.png'));
        else if(Battery  >= 10 && Battery  < 20) setImagepath(require('../../../assets/main/e10.png'));
        else setImagepath(require('../../../assets/main/e0.png'));
      }
      else{
        if(Battery  == 100) setImagepath(require('../../../assets/main/100.png'));
        else if(Battery  >= 90 && Battery  < 100) setImagepath(require('../../../assets/main/90.png'));
        else if(Battery  >= 80 && Battery  < 90) setImagepath(require('../../../assets/main/80.png'));
        else if(Battery  >= 70 && Battery  < 80) setImagepath(require('../../../assets/main/70.png'));
        else if(Battery  >= 60 && Battery  < 70) setImagepath(require('../../../assets/main/60.png'));
        else if(Battery  >= 50 && Battery  < 60) setImagepath(require('../../../assets/main/50.png'));
        else if(Battery  >= 40 && Battery  < 50) setImagepath(require('../../../assets/main/40.png'));
        else if(Battery  >= 30 && Battery  < 40) setImagepath(require('../../../assets/main/30.png'));
        else if(Battery  >= 20 && Battery  < 30) setImagepath(require('../../../assets/main/20.png'));
        else if(Battery  >= 10 && Battery  < 20) setImagepath(require('../../../assets/main/10.png'));
        else setImagepath(require('../../../assets/main/0.png'));
      }
    }

    else if(Chargestate==1){
      //console.log("charging , code :", Chargestate);
      if(Batteryerr!=0){
        if(Battery  == 100) setImagepath(require('../../../assets/main/e100.png'));
        else if(Battery  >= 90 && Battery  < 100) setImagepath(require('../../../assets/main/e90.png'));
        else if(Battery  >= 80 && Battery  < 90) setImagepath(require('../../../assets/main/e80.png'));
        else if(Battery  >= 70 && Battery  < 80) setImagepath(require('../../../assets/main/e70.png'));
        else if(Battery  >= 60 && Battery  < 70) setImagepath(require('../../../assets/main/e60.png'));
        else if(Battery  >= 50 && Battery  < 60) setImagepath(require('../../../assets/main/e50.png'));
        else if(Battery  >= 40 && Battery  < 50) setImagepath(require('../../../assets/main/e40.png'));
        else if(Battery  >= 30 && Battery  < 40) setImagepath(require('../../../assets/main/e30.png'));
        else if(Battery  >= 20 && Battery  < 30) setImagepath(require('../../../assets/main/e20.png'));
        else if(Battery  >= 10 && Battery  < 20) setImagepath(require('../../../assets/main/e10.png'));
        else setImagepath(require('../../../assets/main/e0.png'));
      }
      else{
        if(Battery  == 100) setImagepath(require('../../../assets/main/c100.png'));
        else if(Battery  >= 90 && Battery  < 100) setImagepath(require('../../../assets/main/c90.png'));
        else if(Battery  >= 80 && Battery  < 90) setImagepath(require('../../../assets/main/c80.png'));
        else if(Battery  >= 70 && Battery  < 80) setImagepath(require('../../../assets/main/c70.png'));
        else if(Battery  >= 60 && Battery  < 70) setImagepath(require('../../../assets/main/c60.png'));
        else if(Battery  >= 50 && Battery  < 60) setImagepath(require('../../../assets/main/c50.png'));
        else if(Battery  >= 40 && Battery  < 50) setImagepath(require('../../../assets/main/c40.png'));
        else if(Battery  >= 30 && Battery  < 40) setImagepath(require('../../../assets/main/c30.png'));
        else if(Battery  >= 20 && Battery  < 30) setImagepath(require('../../../assets/main/c20.png'));
        else if(Battery  >= 10 && Battery  < 20) setImagepath(require('../../../assets/main/c10.png'));
        else setImagepath(require('../../../assets/main/c0.png'));
      }
    }

  });

  return(
    <Text>
      <Image style={styles.image} source={imgpath} />
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    width:100,
    height:47,
  }
});

export default ChargingBar;