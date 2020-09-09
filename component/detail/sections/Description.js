import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity,
        Dimensions } from 'react-native';

function Description({ navigation, Battery }) {
  var size = Dimensions.get('window').width/100;
  
  return (
    <>
      <View style={styles.Data}>
        <View style={styles.Dataempty}></View>
        <View style={styles.Datadescription}>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ VOLTAGE</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ CYCLE COUNT</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ Time to Full</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ Time to Empty</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ TEMP</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ SOH</Text>
          <Text style={{fontSize: size*4, fontWeight: 'bold'}}>ㆍ STATUS</Text>
        </View>
        <View style={styles.Dataval}>
          <Text style={{fontSize: size*4}}>{Battery[3]}</Text>
          <Text style={{fontSize: size*4}}>{Battery[4]} Cycle</Text>
          <Text style={{fontSize: size*4}}>{Battery[5]} min</Text>
          <Text style={{fontSize: size*4}}>{Battery[6]} min</Text>
          <Text style={{fontSize: size*4}}>{Battery[7]} °C</Text>
          <Text style={{fontSize: size*4}}>{Battery[8]} %</Text>
          <Text style={{fontSize: size*4}}>{Battery[9]}</Text>
        </View>
      </View>

      <View style={styles.Navempty}></View>
      <View style={styles.Nav}>
        <View style={styles.Navbtn}>
          <Button
            title="Check"
            onPress={()=>Alert.alert('click')}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('List')}>
        <View style={styles.Navlist}>
          <Image
          style={styles.image}
          source={require('../../../assets/list.png')}
          />
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.Navempty}></View>
    </>
  );
}

const styles = StyleSheet.create({
  Data:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  Dataempty:{
    flex: 0.4,
  },
  Datadescription:{
    flex: 1,
  },
  Dataval:{
    flex: 1,
  },
  Nav:{
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.2,
    flexDirection: 'row',
  },
  Navbtn:{
    flex: 0.5,
  },
  Navlist:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  image: {
    width: 45,
    height: 45,
  },
  Navempty: {
    flex: 0.2,
  },
});

export default Description;