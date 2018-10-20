import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import TimeAgo from 'react-native-timeago';

export default class Entity {
        
    constructor(item) {
        this.item = item;
        
    }
        
    render () {
            console.log(this.item.actor.image.url);
        return (
        <View key={this.item.id} style={styles.entityContainer}>
                   
            <View style={styles.entityBody}>
                <View style={styles.entityImage}>
                    <Image source={{uri: this.item.actor.image.url}} style={styles.entityImageImg} />
                </View>
                <View style={styles.entityText}>
                    {this.renderComponent()}
                </View>
            </View>
    
            <View style={styles.entityInfo}>
                <TimeAgo time={this.item.published} style={styles.entityTime} />
            </View>
        </View>
                );
    }
}

const styles = StyleSheet.create({
  entityContainer: {
      
      padding: 5,
      marginTop: 20,
      borderColor: '#aaa',
      borderWidth: 1,
  },
  
  entityBody: {
      flexDirection: 'row',
  },
  
  entityImage: {
     width: 40,
     height: 40,  
     margin: 5
  },
  
  entityImageImg: {
      width: 40,
      height: 40, 
      borderColor: '#888',
      borderWidth: 2,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
  },
  
  entityText: {
      marginLeft: 10,
      flex: 1,
  
      flexWrap: 'wrap'
  },
  
  entityInfo: {
  },

  entityTime: {
      textAlign: 'right'
  }
});
