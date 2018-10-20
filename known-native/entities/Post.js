import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, WebView} from 'react-native';
import HTML from 'react-native-render-html';

import Entity from './Entity';

export default class Post extends Entity {
        
        renderComponent() { console.log(this.item.title);
            return (
                    <View>
                    <View style={styles.postTitleView}><Text style={styles.postTitle}>{this.item.displayName}</Text></View>
                    <HTML html={this.item.formattedContent} />
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
