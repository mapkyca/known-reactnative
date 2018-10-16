import React from 'react';
import { StyleSheet, Text, View, AppRegistry, AsyncStorage, Image, TextInput, Button} from 'react-native';


import Status from "./Status"
import Home from "./Home"


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
                             
                             AsyncStorage.setItem('known-settings', JSON.stringify(data));

                             console.log('Saving and logging in....' + JSON.stringify(data));
                        }} 
                    />
                </View>
        );
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
  
  welcomeText: {
      color: '#fff',
      marginBottom: 5,
      fontSize: 30,
      height: 40,
  },
  
  welcomePic: {
      marginBottom: 5
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
