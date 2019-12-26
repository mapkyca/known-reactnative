import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, ActivityIndicator} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import CreateContent from './CreateContent';
import Geolocation from '@react-native-community/geolocation';

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
            
            
                Geolocation.getCurrentPosition((pos) => {
                    var crd = pos.coords;

                    this.setForm({lat: crd.latitude});
                    this.setForm({long: crd.longitude});
                    
                    query = {
                        method: 'GET'
                    };
                    
                    
                    fetch('https://nominatim.openstreetmap.org/reverse?lat=' + this.getForm('lat') + '&lon=' + this.getForm('long') + '&format=json&zoom=18', query)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        this.setForm({address: responseJson.display_name});
                        
                        if (typeof responseJson.name !== 'undefined') {
                            this.setForm({placename: responseJson.name});
                        }
                        
                        this.parent.setState({page: this.page});
                    })
                    .catch((error) => {
                        
                        console.error(error)
                    });
                    
                    console.log("Loaded location");
                });
            
        
                /* todo: Rich text */
        
                return (
                    <View style={{alignItems: 'center',justifyContent: 'center', flex: 1, marginTop: 50}}>
                        <ActivityIndicator size="large" color="gray" />
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
                    
                    <Text style={{fontSize: 15, marginTop: 5}}>Location</Text>
                    <TextInput
                            style={styles.statusInput}
                            placeHolder="What are your up to?"
                            onChangeText={(placename) => this.setForm({placename: placename})}
                            value={this.getForm('placename')}
                        />
                   
                    <Text style={{fontSize: 15, marginTop: 5}}>Address</Text>
                    <TextInput
                            style={styles.statusInput}
                            placeHolder="What are your up to?"
                            onChangeText={(address) => this.setForm({address: address})}
                            value={this.getForm('address')}
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