import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';

//Page
import Chart from './sections/Donut';
import DesCription from './sections/Description';

export default function DetailPage({navigation, route }) {
  
  useEffect(() => {
    if(route.params.Battery[0]<10)
      navigation.setOptions({ title: "[ 000" + route.params.Battery[0] + " ] Description" });
    else
      navigation.setOptions({ title: "[ 00" + route.params.Battery[0] + " ] Description" });
    //3자리, 4자리도 더 만들기
  });
  return (
    <>
      <View style={styles.Top}/>
      <View style={styles.Header}>
        <Chart Charge={route.params.Battery[1]}></Chart>
      </View>
      <DesCription navigation={navigation} Battery={route.params.Battery}/>
    </>
  );
}


const styles = StyleSheet.create({
  Top: {
    flex: 0.3,
  },
  Header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5,
  },
});