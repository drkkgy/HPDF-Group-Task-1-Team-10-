import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main'
import * as firebase from 'firebase';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcFCf97JEsGNmkrcRwWpH6QEh_2Vx7YpA",
  authDomain: "hasura-custom-notification.firebaseapp.com",
  databaseURL: "https://hasura-custom-notification.firebaseio.com/",
  projectId: "hasura-custom-notification",
  storageBucket: "hasura-custom-notification.appspot.com",
  messagingSenderId: "598821450820"
};
  firebase.initializeApp(config);


class Notifier extends Component {

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
        <Main />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Notifier;

/*
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
muiTheme={getMuiTheme(darkBaseTheme)}
*/
