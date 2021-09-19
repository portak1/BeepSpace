import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    marginTop: 50
  }
})

const Greeting = (props) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
}

const beepspace = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name='Rexxar' />
      <Greeting name='Jaina' />
      <Greeting name='Valeera' />
    </View>
  );
}

export default beepspace;