import React from 'react';
import {Button, NativeModules, StyleSheet, View} from 'react-native';

const App = () => {
  const {CalendarModuleFoo} = NativeModules;
  const onPress = () => {
   CalendarModuleFoo.createCalendarEvent(' Muhammad Imran Shafqat', 'Pakistan');
  };

  return (
    <View style={styles.container}>
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  }
})