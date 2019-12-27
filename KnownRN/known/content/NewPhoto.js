import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, CameraRoll} from 'react-native';
import CreateContent from './CreateContent';
import { showMessage, hideMessage } from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
//import { ImagePicker, Permissions } from 'expo';

export default class NewPhoto extends CreateContent {
        
        constructor(api, editUrl = '/photo/edit/') {
            super(api, editUrl);
            
            this.page = 'newPhoto';
        }
        
        displayPhoto() {
            if (typeof this.parent.photo !== 'undefined' && this.parent.photo !== null) {
                return (
                        <View>
                            <Image style={{height: 200, marginTop: 10, marginBottom: 10}} source={this.parent.photo} />
                        </View>
                        );
            } else {
                
            }
        }
                
        submitForm() {
            
            console.log("Before post");
            console.log(this.parent.formContents);
            
            this.buildSyndication(); 
            
            const { uri } = this.parent.photo;
            const uriParts = uri.split('.');
            const nameParts = uri.split('/');
            const fileType = uriParts[uriParts.length - 1];
            const name = nameParts[nameParts.length - 1];
            
            var formData = new FormData();
            
            for (var key in this.parent.formContents) {
                formData.append(key, this.parent.formContents[key]);
            }
            
            fileType2 = fileType.replace('jpg', 'jpeg');
            formData.append('photo[]', {
                uri,
                name: name,
                type: 'image/'+fileType2
            });
            
            this.api.call(this.editUrl, formData, 'POST', 'multipart/form-data').then(function(value) {
                                
                showMessage({
                    message: 'Your post was sent!',
                    type: 'success'
                });
                              
                this.parent.formContents = {};
                this.parent.photo = null;
                this.parent.updateFeed();
            }.bind(this));
            
            this.parent.setState({page: 'home'});
            
        }       
            
        //handlePhoto() {
        handlePhoto = () => {
            ImagePicker.showImagePicker({
                title: 'Select an image'
            }, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                    console.log('Loading image ' + response.uri);
                    
                  // You can also display the image using data:
                  // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.parent.photo = { uri: response.uri };//{ uri: 'data:image/jpeg;base64,' + response.data };//{ uri: response.uri };
                    this.parent.setState({page: this.page});
                  
                }
              });
        }
        
        renderForm() {
            /* todo: Rich text */
        
            return (
                    <View>
                    
                    <Text style={{fontSize: 18}}>New Post</Text>
                    <TextInput
                            style={styles.statusInput}
                            placeHolder="What are your up to?"
                            onChangeText={(title) => this.setForm({title: title})}
                        />
                        
                           <TextInput
                            style={styles.statusBody}
                            onChangeText={(body) => this.setForm({body: body})}
                                        multiline
                        />
                        <Text style={{fontSize: 10, marginTop: 5}}>HTML is ok</Text>
                              
                        {this.displayPhoto()}
                              
                        <Button
                            style={styles.buttonInput}
                            title="Select Image..."
                            onPress={this.handlePhoto} 
                        />
                        
                        </View>
                    );
        }
        
}



const styles = StyleSheet.create({
   
        statusInput: {
            alignSelf: 'stretch',
            borderColor: 'gray', 
            borderWidth: 1,
            marginTop: 10,
            padding: 5
        },
        statusBody: {
            alignSelf: 'stretch',
            borderColor: 'gray', 
            borderWidth: 1,
            marginTop: 10,
            padding: 5,
            height: 200
        },
        
        
        buttonInput: {
            height: 40, 
            padding: 10, 
            marginTop: 10,
        },
});