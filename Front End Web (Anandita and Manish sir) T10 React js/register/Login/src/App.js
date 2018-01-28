import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Login from './Login'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import Register from './Register'
import Home from './Home'


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
      <MuiThemeProvider>
        <div>
          <Switch>
          <Route exact path="/" component= {Login} />
          <Route exact path="/Register" component= {Register} />
          <Route exact path="/Home" component= {Home} />
          </Switch>
        </div>
      </MuiThemeProvider>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
