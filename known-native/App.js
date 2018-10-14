import React from 'react';
import { StyleSheet, Text, View, HashRouter, NavLink, Route} from 'react-native';


import Status from "./Status"
import Home from "./Home"


export default class App extends React.Component {
  render() {
    return (
            <View><Text>Hello World</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
