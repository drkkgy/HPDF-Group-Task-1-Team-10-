import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Allnotifs from './Allnotifs'
import Ngrouped from './Ngrouped';
import Profile from './Profile';

export default class Main extends Component {
  render(){

  return(
    <Switch>
        <Route exact path="/" component= {Login} />
        <Route exact path="/signup" component= {Signup} />
        <Route exact path="/home" component= {Ngrouped} />
        <Route exact path="/profile" component= {Profile} />
        <Route exact path='/viewall' component={Allnotifs}/>
    </Switch>
);
}
}
