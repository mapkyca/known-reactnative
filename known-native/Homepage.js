import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';

import Status from './entities/Status';
import Post from './entities/Post';
import Photo from './entities/Photo';
import Place from './entities/Place';
import Generic from './entities/Generic';

export default class Homepage {
                
        constructor(items) {
            this.items = items;
        }
        
        renderFeed() {
            
            let feed = [];
            
            for (var i = 0; i < this.items.length; i++) {
                
                var item = null;
                
                switch (this.items[i].objectType) {
                    case 'note': 
                        item = new Status(this.items[i]);
                        break;
                    case 'article':
                        item = new Post(this.items[i]);
                        break;
                    case 'image':
                        item = new Photo(this.items[i]);
                        break;
                    case 'place':
                        item = new Place(this.items[i]);
                        break;
                    default:
                        item = new Generic(this.items[i]);
                }
                
                feed.push(item.render());
            }
            
            return feed;
        }
        
        render() {
            return (
                    <ScrollView style={styles.homepageContainer}>
                    {this.renderFeed()}
                    </ScrollView>
            );
        }
}

const styles = StyleSheet.create({
  
  homepageContainer : {
      padding: 10,
      backgroundColor: '#fff',
  },
  
  
  loggedinText: {
      color: '#333',
  },
  

});
