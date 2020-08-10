import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

function ChargingBar({Battery}){
  if(Battery.FillingAmount == 100)
  {
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/100.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 90 && Battery.FillingAmount < 100){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/90.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 80 && Battery.FillingAmount < 90){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/80.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 70 && Battery.FillingAmount < 80){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/70.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 60 && Battery.FillingAmount < 70){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/60.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 50 && Battery.FillingAmount < 60){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/50.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 40 && Battery.FillingAmount < 50){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/40.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 30 && Battery.FillingAmount < 40){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/30.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 20 && Battery.FillingAmount < 30){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/20.png')} />
      </Text>
      );
  }else if(Battery.FillingAmount >= 10 && Battery.FillingAmount < 20){
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/10.png')} />
      </Text>
      );
  }else{
    return (
      <Text>
        <Image style={styles.image} source={require('../../../assets/main/0.png')} />
      </Text>
      );
  }
}

const styles = StyleSheet.create({
  image: {
    width:100,
    height:35,
  }
});

export default ChargingBar;