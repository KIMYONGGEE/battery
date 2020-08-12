import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { render } from 'react-dom';

function ChargingBar({Battery}){

  const [imgpath, setImagepath] = useState('');

  useEffect(()=>{
    if(Battery.FillingAmount == 100) setImagepath(require('../../../assets/main/100.png'));
    else if(Battery.FillingAmount >= 90 && Battery.FillingAmount < 100) setImagepath(require('../../../assets/main/90.png'));
    else if(Battery.FillingAmount >= 80 && Battery.FillingAmount < 90) setImagepath(require('../../../assets/main/80.png'));
    else if(Battery.FillingAmount >= 70 && Battery.FillingAmount < 80) setImagepath(require('../../../assets/main/70.png'));
    else if(Battery.FillingAmount >= 60 && Battery.FillingAmount < 70) setImagepath(require('../../../assets/main/60.png'));
    else if(Battery.FillingAmount >= 50 && Battery.FillingAmount < 60) setImagepath(require('../../../assets/main/50.png'));
    else if(Battery.FillingAmount >= 40 && Battery.FillingAmount < 50) setImagepath(require('../../../assets/main/40.png'));
    else if(Battery.FillingAmount >= 30 && Battery.FillingAmount < 40) setImagepath(require('../../../assets/main/30.png'));
    else if(Battery.FillingAmount >= 20 && Battery.FillingAmount < 30) setImagepath(require('../../../assets/main/20.png'));
    else if(Battery.FillingAmount >= 10 && Battery.FillingAmount < 20) setImagepath(require('../../../assets/main/10.png'));
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