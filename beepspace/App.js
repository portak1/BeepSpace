import React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
      title="go to second screen"
      onPress={()=> navigation.navigate('Second')}
      ></Button>
    </View>
  );
}


class cislo {
  promeny = {pocetKliknuti: 0};



  

}

function SecondScreen({navigation}){
  return (   
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text> 
      <Button
      title="go to Home screen"
      onPress={()=> navigation.navigate('Home')}
      ></Button>
      <cislo/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const beepspace = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default beepspace;

