import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { CheckBox } from 'react-native-elements';
import Page from '../Page';

export default class CreateContent extends Page {
       
        constructor(api, editUrl) {
            super();
            
            this.api = api;
            this.formContents = {};
            this.editUrl = editUrl;
            
            
            
            
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
        
        renderSyndication() {
            let items = [];
            
            if (typeof this.parent.syndication !== 'undefined') {
                for (var i = 0; i < this.parent.syndication.length; i++) {

                    var item = null;

                    var service = this.parent.syndication[i].name;
                    
                    item = (<View><CheckBox title={service} /></View>);

                    items.push(item);
                }
            } else {
                this.api.call(this.editUrl).then(function(value) {

                   this.parent.syndication = value.formFields['syndication[]'];

                   this.parent.setState({page: this.page});
                }.bind(this));
            }
            
            return items;
        }
        
        render() {
            return (
                    <ScrollView style={styles.createContentForm}>
                        <View style={styles.formContent}>
                            {this.renderForm()}
                            
                            <View style={styles.syndicationFeed}>
                                {this.renderSyndication()}
                            </View>
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