import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';

export default class CreateContent {
        
        constructor(editUrl) {
            this.editUrl = editUrl;
        }
        
        render() {
            return (
                    <View style={styles.createContentForm}>
                    
                    {this.renderForm()}
                            
                    </View>
            )
        }
        
}

const styles = StyleSheet.create({
   
        createContentForm: {
            
        },
});