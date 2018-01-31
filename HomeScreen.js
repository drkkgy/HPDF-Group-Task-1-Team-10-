import React, { Component } from 'react';
import { StyleSheet, View, TextInput, NavigatorIOS, Image, props } from 'react-native';
import { Container, Header, Item, Label, Input, Left, Button, TouchableOpacity, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';
import Expo from 'expo';
import Login from './Login';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {

  _handleButtonPressLogin = () => {
    var url = "https://api.dankness95.hasura-app.io/mobile_login/vaibhavk98/12345678";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    
    var body = {
        "provider": "username",
        "data": {
            "username": "",
            "password": ""
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
        //var authToken = result.auth_token
        //AsyncStorage.setItem('HASURA_AUTH_TOKEN', authToken);
    })
    .catch(function(error) {
        console.log('Request Failed:' + error);
    });
  }


    render(){
      return (
        <View style={{backgroundColor:"#3498db", flex:  1, padding: 20, justifyContent: 'center'}}>
        <Image source={{uri: 'http://canacopegdl.com/images/notify/notify-18.jpg'}} style={{height: 180, width: 180, marginLeft: 80, marginBottom: 60, marginTop: -70}}/>
         <TextInput placeholder=" Username/Email/Mobile No." placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
         <TextInput placeholder=" Password" secureTextEntry={true} placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, borderColor: 'rgba(255,255,255,0.7)', marginTop: 15, backgroundColor: 'rgba(255,255,255,0.7)'}}/>
         <Button block round style={{backgroundColor: 'orange', marginTop: 10}}
         onPress={()=> Actions.main()} onclick={() => this._handleButtonPressLogin}>
         <Text style={{color: 'white'}}>Login</Text>
         </Button>
         <Button block round style={{backgroundColor: 'violet', marginTop: 5}} onPress={()=> Actions.Login()} >
         <Text style={{color: 'white'}}>Register</Text>
         </Button>
         <Text style={{color: 'white', marginLeft: 100, marginTop: 10}}>Forgot  password ?</Text>
       </View>
      );
           }
};