import React, { Component } from 'react';
import './Home.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBarExample from './AppBarExample';
//import TabsExampleSimple from './TabsExampleSimple';
import ToolBarExample from './ToolBarExample';

import Homepage from './Homepage'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <ToolBarExample/>
          <Homepage/>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default Home;
