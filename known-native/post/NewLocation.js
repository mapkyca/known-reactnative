import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import CreateContent from './CreateContent';

export default class NewLocation extends CreateContent {
        
        constructor(api, editUrl = '/checkin/edit/') {
            super(api, editUrl);
            
            this.page = 'newLocation';
            
        }
        
        coord() {
            return {
                                latitude: parseFloat(this.getForm('lat')),
                                longitude: parseFloat(this.getForm('long')),
                        };
        }
        
        renderForm() {
            
            var lat = this.getForm('lat');
            var long = this.getForm('long');
            
            if ((typeof lat === 'undefined') && (typeof long === 'undefined')) { 
            
            
                navigator.geolocation.getCurrentPosition((pos) => {
                    var crd = pos.coords;

                    this.setForm({lat: crd.latitude});
                    this.setForm({long: crd.longitude});
                    
                    console.log("Loaded location");
                });
            
        
            /* todo: Rich text */
        
                return (
                    <View>
                    <Text style={{fontSize: 18}}>Checkin to a location</Text>
                                      
                    <Text style={{fontSize: 15, marginTop: 5}}>Address</Text>
                    <TextInput
                            style={styles.statusInput}
                            placeHolder="What are your up to?"
                            onChangeText={(address) => this.setForm({address: address})}
                        />
                        
                    <Text style={{fontSize: 15, marginTop: 5}}>Description</Text>
                           <TextInput
                            style={styles.statusBody}
                            onChangeText={(body) => this.setForm({body: body})}
                                        multiline
                        />
                        <Text style={{fontSize: 10, marginTop: 5}}>HTML is ok</Text>
                        </View>
                    );
            }
            
            return (
                    <View>
                    <Text style={{fontSize: 18}}>Checkin to a location</Text>
                   
                    <MapView style={styles.map} initialRegion={{
                        latitude: parseFloat(this.getForm('lat')),
                        longitude: parseFloat(this.getForm('long')),
                        latitudeDelta: 0.010,
                        longitudeDelta: 0.010,
                    }}>
                    
                        <Marker coordinate={this.coord()}  title="You are here..." />
                    </MapView>
                   
                    <Text style={{fontSize: 15, marginTop: 5}}>Address</Text>
                    <TextInput
                            style={styles.statusInput}
                            placeHolder="What are your up to?"
                            onChangeText={(address) => this.setForm({address: address})}
                        />
                        
                    <Text style={{fontSize: 15, marginTop: 5}}>Description</Text>
                           <TextInput
                            style={styles.statusBody}
                            onChangeText={(body) => this.setForm({body: body})}
                                        multiline
                        />
                        <Text style={{fontSize: 10, marginTop: 5}}>HTML is ok</Text>
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
         map: {
            marginTop: 10,
            flex: 1,
            alignSelf: 'stretch',
            height: 200,
          },
});