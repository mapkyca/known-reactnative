import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, WebView} from 'react-native';
import HTML from 'react-native-render-html';

import Entity from './Entity';

export default class Photo extends Entity {
        
        renderPhotos() {
            let photos = [];
            
            if (this.item.attachments) {
                for (var i = 0; i < this.item.attachments.length; i++) {

                    photos.push(<Image key={this.item.attachments[i].url} source={{uri: this.item.attachments[i].url}} style={styles.photoImg} />);

                }
            }
            return photos;
        }
        
        renderComponent() { 
            
            var formattedContent = this.item.formattedContent;
            
            if (formattedContent == '')
                formattedContent = '<p></p>';
            
            return (
                    <View>
                    <View style={styles.postTitleView}><Text style={styles.postTitle}>{this.item.displayName}</Text></View>
                    
                    <View style={styles.photoContainer}>
                        {this.renderPhotos()}
                    </View>
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
  },
  
  photoContainer: {
      marginTop: 10,
  },
  
  photoImg: {
      margin: 5,
      
      alignSelf: 'stretch',
      height: 200
  },
});
