import React, { Component } from 'react';
import { View, TextInput, Image, AsyncStorage, status } from 'react-native';
import { Container, Header, Title, Content, Form, Input, Item, Button, Text } from 'native-base';
import Expo, { Permissions, Notifications } from 'expo';
import {Actions} from 'react-native-router-flux';

export default class Main extends Component {

    state = {userID: "", message: ""};

    _onSendButtonPress = () => {

        var url = "https://api.dankness95.hasura-app.io/auth/Send_Notification";

// If you have the auth token saved in offline storage, obtain it in
var authToken = AsyncStorage.getItem('HASURA_AUTH_TOKEN');
// And use it in your headers
// headers = { "Authorization" : "Bearer " + authToken }

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
     "Authorization" : "Bearer " + authToken }
};

var body = {
    "to": this.state.userID,
    "title": "",
    "message": this.state.message,
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
})
.catch(function(error) {
	console.log('Request Failed  :' + error);
});

        };

        componentDidMount() {
         
            alert("Logged In Successfully to Notify!");
        };

    _handleButtonPressLogout = () => {
        var url = "https://api.dankness95.hasura-app.io/auth/Logout";
    
        var requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            }
            }

            var body = {
                "User_Name": this.state.userID
        }

        requestOptions.body = JSON.stringify(body);
        
        fetch(url, requestOptions)
        .then(function (response) {
            return Actions.HomeScreen();
        })
        .then(function(result) {
            console.log(result);
            // To save the auth token received to offline storage
            var authToken = result.auth_token
            AsyncStorage.setItem('HASURA_AUTH_TOKEN', authToken);
        })
        .catch(function(error) {
            console.log('Request Failed:' + error);
        });
      }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#3498db', padding: 20}}>
            <Image source={{uri: 'http://canacopegdl.com/images/notify/notify-18.jpg'}} style={{height: 110, width: 110, marginLeft: 110}}/>
                <Item textinput style={{marginTop: 20}}><Input placeholder="Username to notify" placeholderTextColor="#000000" style={{backgroundColor: '#80D8FF'}} /></Item>
                   <TextInput underlineColorAndroid='transparent' multiline={true} numberOfLines={4} placeholder=" Message" placeholderPosition='top' style={{ marginTop: 15, backgroundColor: 'white'}}/>
                   <Button block style={{backgroundColor: 'red', marginTop: 5}} onPress={this._onSendButtonPress()} >
                <Text style={{color: 'white'}}>Send</Text>
                </Button>
                <Button block style={{backgroundColor: '#3F51B5', marginTop: 5}} onPress={() => Actions.HomeScreen()} >
                <Text style={{color: 'white'}}>Logout</Text>
                </Button>
                </View>
        );
    
}
}