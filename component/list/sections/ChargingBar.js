import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { render } from 'react-dom';

function ChargingBar({Battery}){

  const [imgpath, setImagepath] = useState('');

  useEffect(()=>{
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