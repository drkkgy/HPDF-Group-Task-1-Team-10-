import React, { Component } from 'react';

import { StyleSheet, Text, View, TextInput } from 'react-native';

import { Container, Left, Right, Header, TouchableOpacity, Title, Form, Body, Input, Image, Button, Card, CardItem, source, uri, Label, Content, Item } from 'native-base';

import Login from './firebaseprojectfiles/Login';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './firebaseprojectfiles/HomeScreen';

import Router from './firebaseprojectfiles/Router';


export default class ScreenChange extends React.Component {
 
 
  render() {

 
   return (
  
  <Router />
 
   ); 
}}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});
