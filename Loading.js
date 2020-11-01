import React, { Component } from 'react';
import { View, Text , StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';

var size = Dimensions.get('window').width/100;
 
export default class Loading extends Component {
  render() {
    return (
      <View style ={styles.container}>
        <View style={styles.titleContainer}>
            <Image style={styles.image}  source={require("./assets/splash.png")}  />
        </View>

        <View>
            <Text style={styles.subtitle}> Version 1.1.0 </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    
  container: { 
      // backgroundColor: 'red', 
      backgroundColor : '#ffffff',
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center"  
  },
  title : {
      color : 'white',
      fontSize: 35,
      fontWeight: 'bold'
  },
  subtitle : {
      color : 'black',
      fontWeight: '200'
  }, 
  titleContainer : {
      justifyContent : 'center',
      flex : 1
  },
  image: {
    width:size*100,
    height:size*60,
  }
});
