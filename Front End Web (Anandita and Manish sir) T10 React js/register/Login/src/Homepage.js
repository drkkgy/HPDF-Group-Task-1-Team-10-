import React, { Component } from 'react';
import './Home.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DrawerExample from './DrawerExample';
import About from './About';
import Friends from './Friends';

class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div className="propic">
          <img src="adad.jpg" width="200px" height="200px" className="profile" />
          <About/>
          <br/>
          <Friends/>
          </div>
          <div className="middle">
          </div>
          <div className="right">
            <div className="draw">
          <DrawerExample/>
          </div>
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Homepage;
