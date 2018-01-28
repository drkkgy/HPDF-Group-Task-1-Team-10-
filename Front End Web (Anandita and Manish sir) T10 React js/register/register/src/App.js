import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarExample from './AppBarExample';
import './App.css';
import Registration from './Registration'

class App extends Component {
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

export default App;
