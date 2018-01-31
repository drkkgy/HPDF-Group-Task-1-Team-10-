import React, { Component } from 'react';
import { StyleSheet, View, TextInput, NavigatorIOS, Image } from 'react-native';
import { Container, Header, Item, Label, Input, Left, Button, TouchableOpacity, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';

export default class LoginScreen extends Component {

  _handleButtonPress = () => {
    var url = "https://api.dankness95.hasura-app.io/register/Vaibhav/Kulkarni/vaibhavk98/12345678/kulkarniva98@gmail.com/9920463898";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "firstname": "",
        "lastname": "",
        "username": "",
        "password": "",
        "email": "",
        "mobile": "",
    }
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
	return response.json();
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
    render(){
      return (
               <View Scrollable style={{ backgroundColor: "#3498db" , flex: 1, padding: 20, justifyContent: 'center'}}>
                <TextInput placeholder=" First Name" placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, marginTop: -75, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput placeholder=" Last Name" placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput placeholder=" Username" placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput placeholder=" Password" secureTextEntry={true} placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, borderColor: 'rgba(255,255,255,0.7)', marginTop: 8, backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput placeholder=" Email" placeholderTextColor="#000000" underlineColorAndroid='transparent' keyboardType='email-address' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput placeholder=" Mobile No." placeholderTextColor="#000000" underlineColorAndroid='transparent' keyboardType='numeric' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <Button block round style={{backgroundColor: 'violet', marginTop: 5}} onPress={() => this._handleButtonPress} onclick={() => Action} >
                <Text style={{color: 'white'}}>Register</Text>
                </Button>
               </View>
        );
     }
   };