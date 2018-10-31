import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Page from '../Page';
import Checkbox from '../components/Checkbox';

export default class CreateContent extends Page {
       
        constructor(api, editUrl) {
            super();
            
            this.api = api;
            //this.parent.formContents = {};
            this.editUrl = editUrl;
            
            
            
            
        }
                
        submitForm() {
            
            console.log("Before post");
            console.log(this.parent.formContents);
            
            if (typeof this.parent.syndicationSelected !== 'undefined' && this.parent.syndicationSelected !== null) {
                
                var syndication = [];
                
                for (var key in this.parent.syndicationSelected) {
                    
                    syndication.push(key);
                }
                
                this.setForm({'syndication[]': syndication});
            } 
            
            this.api.call(this.editUrl, this.parent.formContents, 'POST').then(function(value) {
                                
                showMessage({
                    message: 'Your post was sent!',
                    type: 'success'
                });
                                
                this.parent.updateFeed();
            }.bind(this));
            
            this.parent.setState({page: 'home'});
            
        }
        
        setForm(value) {
            
            //for (var key in value) this.parent.formContents[key] = value[key];
            this.parent.formContents = Object.assign(this.parent.formContents, value);
            
            console.log('Value is ' + JSON.stringify(this.parent.formContents));
        }
        
        getForm(name) {
            console.log("Retrieved form: " + this.parent.formContents[name]);
            return this.parent.formContents[name];
        }
        
        renderSyndication() {
            let items = [];
            console.log('rendersyndication');
            if (typeof this.parent.syndication !== 'undefined' && this.parent.syndication !== null) {
                for (var i = 0; i < this.parent.syndication.length; i++) {

                    var item = null;

                    var label = this.parent.syndication[i].name + ' (' + this.parent.syndication[i].service + ')';
                    
                    item = new Checkbox(this, this.parent.syndication[i].username, label, this.parent.syndication[i].service);

                    items.push(item.render());
                }
            } else {
                console.log('Loading synds');
                this.api.call(this.editUrl).then(function(value) {

                   this.parent.syndication = value.formFields['syndication[]'];
                   
                   if (typeof this.parent.syndication === 'undefined') {
                       this.parent.syndication = []; 
                   }
                   this.parent.syndicationSelected = {};

                    console.log(this.page);
                   this.parent.setState({page: this.page});
                }.bind(this));
            }
            
            return items;
        }
        
        render() {
            return (
                    <ScrollView style={styles.createContentForm}>
                        <View styl={styles.contentContainer} >
                            <View style={styles.formContent}>
                                {this.renderForm()}

                            </View>
                            <View style={styles.syndicationFeed}>
                                {this.renderSyndication()}
                            </View>
                            <Button style={styles.submitButton} title="Post..." onPress={() => this.submitForm()} />
                                
                        </View>
                    </ScrollView>
            )
        }
        
}

const styles = StyleSheet.create({
   
        createContentForm: {
            paddingTop: 20,
            paddingLeft:20,
            paddingRight:20,
            paddingBottom: 100
        },
        
        formContent: {
            marginBottom: 30
        },
                
        contentContainer: {
            paddingBottom: 100,
            marginBottom: 100
        }
});