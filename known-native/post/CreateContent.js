import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';


export default class CreateContent {
       
        constructor(api, editUrl) {
            this.api = api;
            this.formContents = {};
            this.editUrl = editUrl;
        }
        
        submitForm() {
            console.log('Form is ' + this.editUrl + JSON.stringify(this.formContents) + '...posting');
            
            this.api.call(this.editUrl, this.formContents, 'POST').then(function(value) {
                alert('Posted');
            });
            
            // TODO: Reset form or reload main page
        }
        
        setForm(value) {
            
            for (var key in value) this.formContents[key] = value[key];
            
            console.log('Value is ' + JSON.stringify(this.formContents));
        }
        
        render() {
            return (
                    <ScrollView style={styles.createContentForm}>
                        <View style={styles.formContent}>
                            {this.renderForm()}
                        </View>
                        <Button title="Post..." onPress={() => this.submitForm()} />
                    </ScrollView>
            )
        }
        
}

const styles = StyleSheet.create({
   
        createContentForm: {
            padding: 20,
            paddingTop: 40
        },
        
        formContent: {
            marginBottom: 30
        }
});