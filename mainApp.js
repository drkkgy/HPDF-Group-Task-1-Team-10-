import React, { Component } from 'react';
import { View, TextInput, Image } from 'react-native';
import { Container, Header, Title, Content, Form, Input, Item, Button, Text } from 'native-base';

export default class Main extends Component {

    componentDidMount() {
         
        alert("Logged In Successfully!");
    };


    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#3498db', padding: 20}}>
            <Image source={{uri: 'http://canacopegdl.com/images/notify/notify-18.jpg'}} style={{height: 110, width: 110, marginLeft: 110}}/>
                <Item textinput style={{marginTop: 20}}><Input placeholder="Username to notify" placeholderTextColor="#000000" style={{backgroundColor: '#80D8FF'}} /></Item>
                   <TextInput underlineColorAndroid='transparent' multiline={true} numberOfLines={4} placeholder=" Message" placeholderPosition='top' style={{ marginTop: 15, backgroundColor: 'white'}}/>
                   <Button block style={{backgroundColor: 'red', marginTop: 5}}>
                <Text style={{color: 'white'}}>Send</Text>
                </Button>
                <Button block style={{backgroundColor: '#3F51B5', marginTop: 5}}>
                <Text style={{color: 'white'}}>Logout</Text>
                </Button>
                </View>
        );
    
}
}