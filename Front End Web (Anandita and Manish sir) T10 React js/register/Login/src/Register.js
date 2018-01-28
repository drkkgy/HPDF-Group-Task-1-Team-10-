import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Register.css';
import Registration from './Registration'

class Register extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
        <Registration/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Register;
