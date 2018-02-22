import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//muiTheme={getMuiTheme(darkBaseTheme)}
import Main from './Main'

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
