import React from 'react';
import { StyleSheet, Text, View, ScrollView, AppRegistry, AsyncStorage, Image, TextInput, Button, TouchableHighlight} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FontAwesome from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage from 'react-native-flash-message';

import API from './API';
import Homepage from './Homepage';
import NewStatus from './post/NewStatus';
import Profile from './Profile';


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
  
  updateFeed() {
      // Load homepage
            this.api.call('/')
              .then(function(value){

                  if (typeof value.items !== 'undefined') {
                      console.log('Found items');

                      this.setState({feed: value.items});
                  }
              }.bind(this));
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
            this.api = new API(this.state.site, this.state.username, this.state.apikey);

            // Load current user and log them in
            this.api.call('/currentUser/')
              .then(function(value){

                  if (typeof value.user !== 'undefined') {
                      console.log("User " + value.user.displayName + ' found, we are logged in');
                      
                      this.setState({welcomePic: {uri: value.user.image.url}});
                      this.setState({user: value.user});
                      this.setState({loggedin: true});
                  }
              }.bind(this));
              
              this.updateFeed();
          }
      }); 
      
      
  }
  
  switchPage(page) {
      this.setState({page: page});
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
                                 data.page = false;

                                 AsyncStorage.setItem('known-settings', JSON.stringify(data));

                                 console.log('Saving and logging in....' + JSON.stringify(data));
                                 
                                 
                                 
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
                
                case 'profile': page = new Profile();
                break;
            
                default: page = new Homepage(this.state.feed);
            }
            
            return (
                    <View style={styles.loggedinContainer}>
                                        {page.render()}
                                        <View style={styles.homepageButtonbar}>
                                            <TouchableHighlight onPress={() => this.setState({page: 'profile'})}> 
                                                <Image source={this.state.welcomePic} style={styles.buttonBarProfileImg} />
                                            </TouchableHighlight>
                                            
                                            <View style={styles.buttonCollection}>
                                                    <TouchableHighlight onPress={() => this.setState({page: 'home'})}>
                                                        <Text style={styles.button}>
                                                            <Icon name='home' size={35} color="#fff"/>
                                                        </Text>
                                                    </TouchableHighlight>
                                            </View>
                                            
                                            <View style={styles.buttonCollection}>
                                                    <TouchableHighlight onPress={() => this.setState({page: 'newStatus'})}>
                                                        <Text style={styles.button}>
                                                            <Icon name='comment' size={35} color="#fff"/>
                                                        </Text>
                                                    </TouchableHighlight>
                                            </View>
                                            
                                            <View style={styles.buttonCollection}>
                                                    <TouchableHighlight onPress={() => this.setState({page: 'newPost'})}>
                                                        <Text style={styles.button}>
                                                            <Icon name='align-left' size={35} color="#fff"/>
                                                        </Text>
                                                    </TouchableHighlight>
                                            </View>
                                            
                                            <View style={styles.buttonCollection}>
                                                    <TouchableHighlight onPress={() => this.setState({page: 'newPhoto'})}>
                                                        <Text style={styles.button}>
                                                            <Icon name='image' size={35} color="#fff"/>
                                                        </Text>
                                                    </TouchableHighlight>
                                            </View>
                                            
                                            <View style={styles.buttonCollection}>
                                                    <TouchableHighlight onPress={() => this.setState({page: 'newLocation'})}>
                                                        <Text style={styles.button}>
                                                            <Icon name='map-marker' size={35} color="#fff"/>
                                                        </Text>
                                                    </TouchableHighlight>
                                            </View>
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
