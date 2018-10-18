import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';

import Status from './entities/Status';

export default class Homepage {
                
        constructor(items) {
            this.items = items;
        }
        
        render() {
            return (
                    <ScrollView style={styles.homepageContainer}>
                    <Text>testtest</Text>
                    </ScrollView>
            )
        }
}

const styles = StyleSheet.create({
  
  homepageContainer : {
      padding: 5,
      backgroundColor: '#ccc',
  },
  
  homepageButtonbar: {
      height: 50,
      flexDirection: 'row',
      backgroundColor: '#aaa',
      padding: 2,
  },
  
  buttonBarProfileImg: {
      width: 45,
      height: 45,
      
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
  },
  
  loggedinText: {
      color: '#333',
  },
  

});
