import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, WebView} from 'react-native';
import HTML from 'react-native-render-html';
import MapView, { Marker } from 'react-native-maps';

import Entity from './Entity';

export default class Place extends Entity {
       
        coord() {
            return {
                                latitude: parseFloat(this.item.latitude),
                                longitude: parseFloat(this.item.longitude),
                        };
        }
        renderComponent() { 
            var formattedContent = this.item.formattedContent;
            
            if (formattedContent == '')
                formattedContent = '<p></p>';
            
            return (
                    <View>
                    <View style={styles.postTitleView}><Text style={styles.postTitle}>{this.item.displayName}</Text></View>
                    <MapView style={styles.map} initialRegion={{
                        latitude: parseFloat(this.item.latitude),
                        longitude: parseFloat(this.item.longitude),
                        latitudeDelta: 0.010,
                        longitudeDelta: 0.010,
                    }}>
                    
                        <Marker coordinate={this.coord()}  title={this.item.displayName} />
                    </MapView>
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
  map: {
    marginTop: 10,
    flex: 1,
    alignSelf: 'stretch',
    height: 200,
  },
});
