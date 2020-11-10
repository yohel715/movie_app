import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import Router from './Router';

const App = () => {
  return <View style={{flex: 1}}>
    <StatusBar barStyle={'light-content'}></StatusBar>
    <Router></Router>
  </View>
}

export default App;