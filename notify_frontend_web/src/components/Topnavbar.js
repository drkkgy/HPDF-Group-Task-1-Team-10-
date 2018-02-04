import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'

const style = {
  height: 160,
  margin: 2,
  textAlign: 'center',
  display: 'inline-block',
};


var fetchAction =  require('node-fetch');

var url = "https://auth.dankness95.hasura-app.io/v1/user/logout";

var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
var headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "POST",
    "headers": headers,
};

export default class Topnavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  logout=()=>{
    if(authToken!=null){
    fetchAction(url, requestOptions)
    .then(function(response) {
    	return response.json();
    })
    .then(function(result) {
      if(result.message==="logged out")
      { authToken=null;
        window.location.href = '/';
        alert ("Logged out successfully !!");
      }
      else {
        window.location.href = '/';
        alert ("Not logged in !! Refresh page & login");}
    })
    .catch(function(error) {
    	console.log('Request Failed:' + error);
    });}
    else {}
  }

  render() {
    return (
      <div>
      <Toolbar>
        <ToolbarGroup firstChild={false}>
        <Link to='/home'><RaisedButton label="HOME" primary={true} /></Link>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Welcome Full Name !!" />
          <Avatar src="images/uxceo-128.jpg" />
          </ToolbarGroup>
          <ToolbarGroup lastChild={false}>
          <RaisedButton onClick={()=>this.logout()} label="LOGOUT" secondary={true} />
        </ToolbarGroup>
      </Toolbar>
      <Paper style={style} zDepth={5} rounded={false} >
      <img src="images/splash.png" alt="logo"/>
      </Paper>
      </div>
    );
  }
}

/*
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';


<IconMenu
  iconButtonElement={
    <IconButton touch={true}>
      <NavigationExpandMoreIcon />
    </IconButton>
  }
>
  <MenuItem primaryText="Profile" />
  <MenuItem primaryText="Logout" />
</IconMenu>

*/
