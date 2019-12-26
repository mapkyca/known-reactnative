import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, CameraRoll} from 'react-native';
import CreateContent from './CreateContent';
import { showMessage, hideMessage } from 'react-native-flash-message';
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
                            <Image style={{height: 200, marginTop: 10, marginBottom: 10}} source={{uri: this.parent.photo.uri}} />
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
            
            formData.append('photo[]', {
                uri,
                name: name,
                type: 'image/'+fileType
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
                
        handleButtonPress = () => {
            
            console.log("Camera roll filed...");
            
            
            Permissions.askAsync(Permissions.CAMERA)
                    .then(() => {
                        Permissions.askAsync(Permissions.CAMERA_ROLL).then(() => {
                           
                            ImagePicker.launchImageLibraryAsync({
                                allowsEditing: false,
                                base64: true,
                                exif: true
                            }).then((result) => {

                            console.log(result);

                            if (!result.cancelled) {
                                this.parent.photo = result;
                                this.parent.setState({page: this.page});
                                
                            } 
                        });
                    });
            
            }); 
            
            
            
            /*ImagePicker.showImagePicker({
                title: 'Select Photo',
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            }, (response) => {
                console.log('Response = ', response);
            });*/
            
            /*CameraRoll.getPhotos({
                first: 20,
                assetType: 'Photos',
            })
            .then(r => {
               this.setForm({ 'photo[]': r.edges })
            })
            .catch((err) => {
                                
                console.log(err)
                showMessage({
                    message: 'There was a problem loading images',
                    type: 'error'
                });
            });*/
        }
        
        handleButtonPressPhoto = () => {
            
                console.log("Camera roll filed...");


                Permissions.askAsync(Permissions.CAMERA)
                        .then(() => {
                            Permissions.askAsync(Permissions.CAMERA_ROLL).then(() => {

                                ImagePicker.launchCameraAsync({
                                    allowsEditing: false,
                                    base64: true,
                                    exif: true
                                }).then((result) => {

                                console.log(result);

                                if (!result.cancelled) {
                                    this.parent.photo = result;
                                    this.parent.setState({page: this.page});

                                } 
                            });
                        });
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
                            onPress={this.handleButtonPress} 
                        />
                        <Button
                            style={styles.buttonInput}
                            title="Take a photo..."
                            onPress={this.handleButtonPressPhoto} 
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