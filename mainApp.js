import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Container, Header, Title, Content, Form, Input, Item, Button, Text } from 'native-base';

export default class Main extends Component {

    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#3498db', padding: 20}}>
                <Item regular style={{height: 55, marginTop: 50}}><Input placeholder="Username to notify" style={{backgroundColor: 'white'}} /></Item>
                   <TextInput underlineColorAndroid='transparent' placeholder=" Message" placeholderPosition='top' style={{ marginTop: 15, backgroundColor: 'white', height: 200}}/>
                   <Button block style={{backgroundColor: 'red', marginTop: 5}}>
                <Text style={{color: 'white'}}>Send</Text>
                </Button>
                </View>
        );
    
}
}