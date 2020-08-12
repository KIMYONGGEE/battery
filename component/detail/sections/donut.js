import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default () => {
    return (
        <AnimatedCircularProgress
            size={300}
            width={35}
            fill={20}
            rotation={0}
            tintColor="#ff0000"
            backgroundColor="#E6E7D9">
            {
                (fill) => (
                <Text style={{fontSize: 45,}}>
                    20%
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