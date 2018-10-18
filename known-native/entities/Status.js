import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';

import Entity from './Entity';

export default class Status extends Entity {
        
        renderComponent() {
            
        }
        
        render () {
            
            return (
                    <View style={styles.entityContainer}>
                    
                    {this.renderComponent()}
                    
                    </View>
                    );
        }
}

const styles = StyleSheet.create({
  
});
