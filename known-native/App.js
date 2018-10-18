import React from 'react';
import { StyleSheet, Text, View, ScrollView, AppRegistry, AsyncStorage, Image, TextInput, Button} from 'react-native';

import API from './API';



export default class App extends React.Component {
        
  constructor(props) {
    super(props);console.log("props" + JSON.stringify(props));
    this.state = {
        site: 'https://',
        username: null,
        apikey: null,
        welcomePic: require('./gfx/known.png'),
        loggedin: false,
        loaded: false
    };
    
    console.log("State " + JSON.stringify(this.state));
  }
  
  componentDidMount() {
      console.log('Loading settings');
      
      AsyncStorage.getItem('known-settings').then((result) => {
          console.log('Loaded ' + result);
          //this.state = JSON.parse(result);
          
          this.setState(JSON.parse(result)); 
          this.setState({loaded: true}); 
          console.log('Settings loaded ' + JSON.stringify(this.state));
          
          if ( (this.state.site !== 'https://') && (this.state.username !== '') && (this.state.apikey !== '') ) {
              
            // See if we're logged in by attempting to load the current user
            var api = new API(this.state.site, this.state.username, this.state.apikey);

            // Load current user and log them in
            api.call('/currentUser/')
              .then(function(value){

                  if (typeof value.user !== 'undefined') {
                      console.log("User " + value.user.displayName + ' found, we are logged in');
                      
                      this.setState({welcomePic: {uri: value.user.image.url}});
                      this.setState({user: value.user});
                      this.setState({loggedin: true});
                  }
              }.bind(this));
              
            // Load homepage
            api.call('/')
              .then(function(value){

                  if (typeof value.items !== 'undefined') {
                      console.log('Found items');

                      this.setState({feed: value.items});
                  }
              }.bind(this));
          }
      }); 
      
      
  }
  
  
  render() {
      
    if (!this.state.loaded) {
        return (
                <View style={styles.container}>
                    <Image source={this.state.welcomePic} style={styles.welcomePic} />
                </View>
        );
    } else {
        if (!this.state.loggedin) {
            return (
                    <View style={styles.container}>
                        <Image source={this.state.welcomePic} style={styles.welcomePic} />
                        <Text style={styles.welcomeText}>Sign in to Known</Text>
                        <TextInput
                            style={styles.textInput}
                            placeHolder="Enter your site url"
                            onChangeText={(site) => this.setState({site})}
                            value={this.state.site}
                            textContentType="URL"
                            keyboardType='url'
                        />
                        <TextInput
                            style={styles.textInput}
                            placeHolder="Username"
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                            textContentType="username"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeHolder="API Key"
                            onChangeText={(apikey) => this.setState({apikey})}
                            value={this.state.apikey}
                            textContentType="password"
                            secureTextEntry={true}
                        />
                        <Button
                            style={styles.buttonInput}
                            title="Log in..."
                            onPress={() => {

                                 // Save and log on
                                 var data = this.state;
                                 data.loaded = false;
                                 data.user = false;
                                 data.feed = false;
                                 data.welcomePic = false;

                                 AsyncStorage.setItem('known-settings', JSON.stringify(data));

                                 console.log('Saving and logging in....' + JSON.stringify(data));
                                 
                                 
                                 
                            }} 
                        />
                    </View>
            );
        } else {
            // Logged in
            return (
                    <View style={styles.loggedinContainer}>
                                        <ScrollView style={styles.homepageContainer}>
                        
                                        </ScrollView>
                                        <View style={styles.homepageButtonbar}>
                                                <Image source={this.state.welcomePic} style={styles.buttonBarProfileImg} />
                                        </View>
                    </View>
            );
        }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loggedinContainer: {
      flex: 1,
      backgroundColor: '#fff',
  },
  
  homepageContainer : {
      
      backgroundColor: '#ccc',
  },
  
  homepageButtonbar: {
      height: 50,
      flexDirection: 'row',
      backgroundColor: '#aaa',
      padding: 2,
  },
  
  buttonBarProfileImg: {
      width: 45,
      height: 45,
      
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
  },
  
  loggedinText: {
      color: '#333',
  },
  
  welcomeText: {
      color: '#fff',
      marginBottom: 5,
      fontSize: 30,
      height: 40,
  },
  
  welcomePic: {
      marginBottom: 5,
      width: 100,
      height: 100,
  },
  
  buttonInput: {
      height: 40, 
      width: 250, 
      padding: 5, 
      margin: 5,
  },
  
  textInput: {
      height: 40, 
      width: 250, 
      padding: 5, 
      borderColor: 'gray', 
      borderWidth: 1,
      margin: 5,
      color: '#fff',
  },
  
  textWhite: {
      color: '#fff',
  }
});
