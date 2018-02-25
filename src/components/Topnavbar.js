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

let wmsg="";
let url = "https://auth.dankness95.hasura-app.io/v1/user/logout";
let usr = "https://auth.dankness95.hasura-app.io/v1/user/info";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
let headers = { "Authorization" : "Bearer " + authToken }
let requestOptions = {
    "method": "POST",
    "headers": headers,
};
const requestOptusr = {
    "method": "GET",
    "headers": headers,
};

export default class Topnavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      usr_inf: "",
    };
  }

componentDidMount() {
  fetch(usr, requestOptusr)
  .then((response) => {
    return response.json();
  })
  .then((result) => { this.setState({usr_inf: result.username});
   })
  .catch((error) => {
  console.log('User info retrieval:' + error);
   });


}
  handleChange = (event, index, value) => this.setState({value});

  logout=()=>{
    if(authToken!=null){
    fetch(url, requestOptions)
    .then(function(response) {
    	return response.json();
    })
    .then(function(result) {
      if(result.message==="logged out")
      { authToken=null;
        window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
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
  }


  render() {

    wmsg="Welcome !!  "+this.state.usr_inf;
    return (
      <div>
      <Toolbar>
        <ToolbarGroup firstChild={false}>
        <Link to='/home'><RaisedButton label="HOME" primary={true} /></Link>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={wmsg} />
          <Avatar src="images/defaultUser.png" />
          </ToolbarGroup>
          <ToolbarGroup lastChild={false}>
          <RaisedButton onClick={()=>this.logout()} label="LOGOUT" secondary={true} />
        </ToolbarGroup>
      </Toolbar>
      <Paper style={style} zDepth={5} rounded={false} >
      <img src="images/splash.png" alt="logo" width="896" height="180"/>
      </Paper>
      </div>
    );
  }
}
