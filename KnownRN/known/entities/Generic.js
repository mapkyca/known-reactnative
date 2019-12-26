import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, WebView} from 'react-native';
import HTML from 'react-native-render-html';

import Entity from './Entity';

export default class Generic extends Entity {
        
        renderComponent() { 
            var formattedContent = this.item.formattedContent;
            
            if (formattedContent == '')
                formattedContent = '<p></p>';
            
            return (
                    <View>
                    <View style={styles.postTitleView}><Text style={styles.postTitle}>{this.item.displayName}</Text></View>
                    <HTML html={formattedContent} />
                    </View>
            );
        }
        
        constructor(item) {
            super(item);
        }
        
}

const styles = StyleSheet.create({
  
  postTitleView: {
      
  },
  postTitle: {
      fontSize: 18
  }
});