import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default () => {
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
        size={200}
        width={20}
        fill={10}
        rotation={0}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#00ff00">
          {
            (fill) => (
              <Text>
                용ㅋ기ㅋ
              </Text>
            )
          }
       </AnimatedCircularProgress>    
      </View>
    )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
})