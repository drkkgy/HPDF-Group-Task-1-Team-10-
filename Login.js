import React, { Component } from 'react';
import { StyleSheet, View, TextInput, NavigatorIOS, Image } from 'react-native';
import { Container, Header, Item, Label, Input, Left, Button, TouchableOpacity, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';
import {Actions} from 'react-native-router-flux';

const fields = () => {
    if (this.state.firstname || this.state.lastname || this.state.username || this.state.password || this.state.email || this.state.mobile == undefined)
    alert('Please Fill All Fields');    
}

export default class LoginScreen extends Component {

    state={ firstname: '', lastname: '', username: '', password: '', email: '', mobile: ''};
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
        "firstname": this.state.firstname,
        "lastname": this.state.lastname,
        "username": this.state.username,
        "password": this.state.password,
        "email": this.state.email,
        "mobile": this.state.mobile,
    }
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
	return response.json();
},
  this.onLoginSuccess.bind(this))

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

  onLoginSuccess() {
      Actions.main();
  }
    render(){
      return (
               <View Scrollable style={{ backgroundColor: "#3498db" , flex: 1, padding: 20, justifyContent: 'center'}}>
                <TextInput value={this.state.firstname} onChangeText={text => this.setState({ firstname: text })} placeholder=" First Name" placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, marginTop: -75, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput value={this.state.lastname} onChangeText={text => this.setState({ lastname: text })} placeholder=" Last Name" placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput value={this.state.username} onChangeText={text => this.setState({ username: text })} placeholder=" Username" placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput value={this.state.password} onChangeText={text => this.setState({ password: text })} placeholder=" Password" secureTextEntry={true} placeholderTextColor="#000000" underlineColorAndroid='transparent' style={{height: 40, opacity: 0.5, borderColor: 'rgba(255,255,255,0.7)', marginTop: 8, backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder=" Email" placeholderTextColor="#000000" underlineColorAndroid='transparent' keyboardType='email-address' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <TextInput value={this.state.mobile} onChangeText={text => this.setState({ mobile: text })} placeholder=" Mobile No." placeholderTextColor="#000000" underlineColorAndroid='transparent' keyboardType='numeric' style={{height: 40, opacity: 0.5, marginTop: 8, borderColor: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.7)'}}/>
                <Button block style={{backgroundColor: 'violet', marginTop: 5}} onPress={() => this._handleButtonPress.bind(this)} onclick={() => fields()} >
                <Text style={{color: 'white'}}>Register</Text>
                </Button>
                <Button block style={{backgroundColor: 'blue', marginTop: 5}} onPress={() => Actions.HomeScreen()}>
                <Text style={{color: 'white'}}>Cancel</Text>
                </Button>
               </View>
        );
     }
   };