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
  
  
  loggedinText: {
      color: '#333',
  },
  

});
