import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import HTML from 'react-native-render-html';


import Page from './Page.js';

export default class Profile extends Page {
        
        constructor(api) {
            super();
            
            this.api = api;
            
        }
        render() {
             
            return (
                <ScrollView style={styles.container}>
                <View style={styles.containerInner}>

                    <View style={styles.photoContainer}>
                            <Image source={this.parent.state.welcomePic} style={styles.profileImg} />
                    </View>
                    
                    <Text style={{color: '#fff', marginTop: 5, marginBottom: 10, fontSize: 30,}}>{this.parent.state.user.displayName}</Text>
                    <HTML style={{color: '#fff', marginTop: 10, fontSize: 10}} html={this.parent.state.user.formattedContent} tagsStyles={{
                        p: {color: '#fff', textAlign: 'center', marginBottom: 5}
                    }} />
                </View>
                </ScrollView>
            );
        }
        
}


const styles = StyleSheet.create({
   
        container: {
            paddingTop: 20,
            paddingLeft:20,
            paddingRight:20,
            paddingBottom: 100,
            backgroundColor: '#000',
        },
        
        containerInner: {
            paddingBottom: 100,
            marginBottom: 100,
            
            
            
            alignItems: 'center',
            justifyContent: 'center',
        },
        
        photoContainer: {
            marginTop: 10,
        },
        
        profileImg: {

            width: 140,
            height: 140,
          
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 70,
            alignItems: 'center',
            justifyContent: 'center',
        },
        
});