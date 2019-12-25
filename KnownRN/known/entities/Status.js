import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, WebView} from 'react-native';
import HTML from 'react-native-render-html';

import Entity from './Entity';

export default class Status extends Entity {
        
        renderComponent() {
            return (
                    <HTML html={this.item.formattedContent} />
            );
        }
        
        constructor(item) {
            super(item);
        }
        
}

const styles = StyleSheet.create({
  
  
});
