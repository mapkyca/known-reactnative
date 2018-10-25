import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import CreateContent from './CreateContent';

export default class NewStatus extends CreateContent {
        
        constructor(api, editUrl = '/status/edit/') {
            super(api, editUrl);
            
            this.page = 'newStatus';
        }
        
        renderForm() {
            return (
                    <View>
                    <Text style={{fontSize: 18}}>New Status</Text>
                    <TextInput
                            style={styles.statusInput}
                            placeHolder="What are your up to?"
                            multiline
                            onChangeText={(status) => this.setForm({body: status})}
                        />
                        </View>
                    );
        }
        
}



const styles = StyleSheet.create({
   
        statusInput: {
            alignSelf: 'stretch',
            height: 200,
            borderColor: 'gray', 
            borderWidth: 1,
            marginTop: 10,
            padding: 5
        },
});