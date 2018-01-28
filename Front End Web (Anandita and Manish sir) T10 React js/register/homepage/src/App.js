import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBarExample from './AppBarExample';
//import TabsExampleSimple from './TabsExampleSimple';
import ToolBarExample from './ToolBarExample';

import Home from './Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <ToolBarExample/>
          <Home/>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
