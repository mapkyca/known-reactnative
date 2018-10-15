import React from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, TextInput, Button} from 'react-native';


import Status from "./Status"
import Home from "./Home"


export default class App extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {
        site: '',
        username: '',
        apikey: '',
        welcomePic: require('./gfx/known.png'),
    };
  }
  
  render() {
    return (
            <View style={styles.container}>
                <Image source={this.state.welcomePic} style={styles.welcomePic} />
                <Text style={styles.welcomeText}>Sign in to Known</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your site url"
                    onChangeText={(site) => this.setState({site})}
                    value={this.state.site}
                    textContentType="URL"
                    keyboardType='url'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    textContentType="username"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="API Key"
                    onChangeText={(apikey) => this.setState({apikey})}
                    value={this.state.apikey}
                    textContentType="password"
                    secureTextEntry={true}
                />
                <Button
                    style={styles.buttonInput}
                    title="Log in..."
                    onPress={() => {
                            
                    }} 
                />
            </View>
    );
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
