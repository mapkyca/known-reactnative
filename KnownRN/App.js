/**
 * Known React Native IOS/Android client
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from './known/webservices/API.js';


export default class App extends React.Component {
        
  constructor(props) {
    super(props);
    
    this.state = {
        site: 'https://',
        username: null,
        apikey: null,
        password: null,
        twofactor: null,
        welcomePic: require('./assets/known.png'),
        loggedin: false,
        loaded: false
    };
    
    this.formContents = {};
    
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
          
          
          if ( (this.state.site !== 'https://') && (this.state.username !== '') && (this.state.password !== '') && (this.state.password !== null) ) {
              
              
            this.api = new API(this.state.site, this.state.username, this.state.apikey);
            
            // Log in and exchange password for apikey
            this.api.getAPIToken(this.state.username, this.state.password, this.state.twofactor)
                    .then(function(value) {

                        console.log('Got from server: ');
                        console.log(value);
                        
                        // See if this is a 2fa prompt? TODO
                        if (value.email!==null && value.email!=='' && value.password!==null && value.password!=='') {
                            
                            
                            this.setState({twofa: true});
                            this.setState({twofactor: ''})
                        } else {
                            this.setState({twofa: false});
                            this.setState({twofactor: ''})
                        }
                        
                        
                        
                        
                        
                        

                    }. bind(this));


            // Reset the state password so we can go on to the actual login
            this.setState({password: ''});
          }
          
          if ( (this.state.site !== 'https://') && (this.state.username !== '') && (this.state.apikey !== '') && (this.state.apikey !== null) ) {
              
            // See if we're logged in by attempting to load the current user
            this.api = new API(this.state.site, this.state.username, this.state.apikey);

            // Load current user and log them in
            this.api.call('/currentUser/')
              .then(function(value){

                  if (typeof value.user !== 'undefined') {
                      console.log("User " + value.user.displayName + ' found, we are logged in');
                      
                      this.setState({welcomePic: {uri: value.user.image.url}});
                      this.setState({user: value.user});
                      this.setState({loggedin: true});
                      this.setState({twofa: false});
                  }
              }.bind(this));
              
              //this.updateFeed(); 
          } 
      }); 
      
      
  }
  
  
  render() {
      
    if (!this.state.loaded) {
        return (
                <View style={styles.container}>
                    <Image source={require('./assets/known.png')} style={styles.welcomePic} />
                </View>
        );
    } else {
        if (!this.state.loggedin) {
            
            console.log(this.state.twofa );
            if (this.state.twofa == true) {
                var twofa = (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Two factor auth"
                            placeholderTextColor = "#cccccc"
                            onChangeText={(twofactor) => this.setState({twofactor})}
                            textContentType="password"
                            secureTextEntry={true}
                            autoCapitalize = 'none'
                        />
                )
            }
            
            return (
                    <View style={styles.container}>
                        <Image source={require('./assets/known.png')} style={styles.welcomePic} />
                        <Text style={styles.welcomeText}>Sign in to Known</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your site url"
                            placeholderTextColor = "#cccccc"
                            onChangeText={(site) => this.setState({site})}
                            value={this.state.site}
                            textContentType="URL"
                            keyboardType='url'
                            autoCapitalize = 'none'
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your username"
                            placeholderTextColor = "#cccccc"
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                            textContentType="username"
                            autoCapitalize = 'none'
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            placeholderTextColor = "#cccccc"
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            textContentType="password"
                            secureTextEntry={true}
                            autoCapitalize = 'none'
                        />
                        {twofa}
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
                                 data.page = false;
                                 data.contentTypes = false;
                                 data.twofa = false;
                                 

                                 AsyncStorage.setItem('known-settings', JSON.stringify(data));

                                 console.log('Saving and logging in....' + JSON.stringify(data));
                                 
                                 this.componentDidMount(); 
                                 
                            }} 
                        />
                    </View>
            );
        } else {
            // Logged in
            var page = null;
            var api = new API(this.state.site, this.state.username, this.state.apikey);
            
            switch (this.state.page) {
                case 'newStatus': 
                    page = new NewStatus(api);
                    page.setParent(this);
                break;
                case 'newPost': 
                    page = new NewPost(api);
                    page.setParent(this);
                break;
                
                case 'newPhoto': 
                    page = new NewPhoto(api);
                    page.setParent(this);
                break;
                
                case 'newLocation':
                    page = new NewLocation(api);
                    page.setParent(this);
                break;
                
                case 'profile': 
                    page = new Profile(api);
                    page.setParent(this);
                break;
            
                default: page = new Homepage(this.state.feed);
            }
            
            return (
                    <View style={styles.loggedinContainer}>
                                        {page.render()}
                                        <View style={styles.homepageButtonbar}>
                                            <TouchableHighlight onPress={() => this.switchPage({page: 'profile'})}> 
                                                <Image source={this.state.welcomePic} style={styles.buttonBarProfileImg} />
                                            </TouchableHighlight>
                                            
                                            <View style={styles.buttonCollection}>
                                                    <TouchableHighlight onPress={() => this.switchPage({page: 'home'})}>
                                                        <Text style={styles.button}>
                                                            <Icon name='home' size={35} color="#fff"/>
                                                        </Text>
                                                    </TouchableHighlight>
                                            </View>
                                            
                                            {this.drawButtons()}
                                            
                                        </View>
                                        <FlashMessage position="top" />
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
      backgroundColor: '#000',
      padding: 4,
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
  
  buttonCollection: {
      marginLeft: 15,
      paddingTop: 5,
  },
  
  button: {
      marginRight: 5,
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
