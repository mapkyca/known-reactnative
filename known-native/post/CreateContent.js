import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Page from '../Page';

export default class CreateContent extends Page {
       
        constructor(api, editUrl) {
            super();
            
            this.api = api;
            this.formContents = {};
            this.editUrl = editUrl;
            
            
        
            this.api.call(this.editUrl).then(function(value) {
                    
               this.syndication = value.formFields.syndication;
               
               console.log("Syndication: " + JSON.stringify(this.syndication));
                
            }.bind(this));
            
        }
                
        submitForm() {
            console.log('Form is ' + this.editUrl + JSON.stringify(this.formContents) + '...posting');
            
            this.api.call(this.editUrl, this.formContents, 'POST').then(function(value) {
                                
                showMessage({
                    message: 'Your post was sent!',
                    type: 'success'
                });
                                
                this.parent.updateFeed();
            }.bind(this));
            
            this.parent.setState({page: 'home'});
            
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