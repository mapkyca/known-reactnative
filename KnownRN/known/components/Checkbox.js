import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class Checkbox {
        
        constructor(screenObj, key, label, service) {
            this.screenObj = screenObj;
            this.key = key;
            this.label = label;
            this.service = service;
        }
        
        toggleSelection() {
            var key = this.service + '::' + this.key;
            this.screenObj.parent.syndicationSelected[key] = !this.screenObj.parent.syndicationSelected[key];
            this.screenObj.parent.setState({page: this.screenObj.page});
        }
        
        isSelected() {console.log("Key " + this.key);
            console.log(this.screenObj.parent.syndicationSelected);
            
            var key = this.service + '::' + this.key;
            
            return this.screenObj.parent.syndicationSelected[key];
        }
        
        render () {
            return ( 
                    <View key={this.key}>
                        <CheckBox title={this.label} onPress={() => this.toggleSelection()} checked={this.isSelected()} />
                    </View>
            );
        }
}