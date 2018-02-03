import React, { Component } from 'react';
import { StyleSheet, View, TextInput, NavigatorIOS, Image } from 'react-native';
import { Container, Header, Item, Label, Input, Left, Button, TouchableOpacity, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { Router, Scene } from 'react-native-router-flux';
import HomeScreen from './HomeScreen';
import Login from './Login';
import MainApp from './mainApp';

const RouterComponent = () => {

return (
        <Router>
         <Scene key="root" hideNavBar>
         <Scene key="auth">
         <Scene key="HomeScreen" component={HomeScreen} hideNavBar initial />
         <Scene key="Login" component={Login} hideNavBar />
         </Scene>
         <Scene key="main">
         <Scene key="MainApp" component={MainApp} hideNavBar />
         </Scene>
         </Scene>
         </Router>

);

};

export default RouterComponent;
