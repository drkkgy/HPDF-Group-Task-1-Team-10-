import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'

const style = {
  height: 160,
  width: 996,
  margin: 2,
  textAlign: 'center',
  display: 'inline-block',
};

let wmsg="";
let url = "https://auth.astigmatic44.hasura-app.io/v1/user/logout";
let usr = "https://auth.astigmatic44.hasura-app.io/v1/user/info";
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
      imgsrc:"images/defaultUser.png"
    };
  }

  sendSessionID = (sessionid,username) => {

  var urlq = "https://data.astigmatic44.hasura-app.io/v1/query";
  var requestOptions = {
     "method": "POST",
     "headers": {"Content-Type": "application/json",
                 "Authorization": "Bearer " + sessionid},};
       var body= {
     "type": "update",
     "args": {
         "table": "User_Details",
         "where": {
             "User_Name": {
                 "$eq": username }},
         "$set": { "Session_Id": sessionid }}};

       requestOptions.body = JSON.stringify(body);

       fetch(urlq, requestOptions)
       .then((response)=> {
         return response.json();
       })
       .then((result)=> {
  //       console.log("Token Update",result);
       })
       .catch((error)=> {
         console.log('Request Failed:' + error);
       }); }

componentDidMount() {
  fetch(usr, requestOptusr)
  .then((response) => {
    return response.json();
  })
  .then((result) => { this.props.getUserInfo(result.username); this.setState({usr_inf: result.username});
   this.sendSessionID(authToken,result.username); this.getUserPic(authToken,result.username);
   })
  .catch((error) => {
  console.log('User info retrieval:' + error);
   });
}
  handleChange = (event, index, value) => this.setState({value});

  deleteSessionID = (username) => {
    console.log(username);
  const urlq = "https://data.astigmatic44.hasura-app.io/v1/query";
  var requestOptions = {
     "method": "POST",
     "headers": {"Content-Type": "application/json"}};
       var body= {"type": "update",
          "args": {
         "table": "User_Details",
         "where": {"User_Name": { "$eq": username } },
         "$set": {"Session_Id": null}}};
       requestOptions.body = JSON.stringify(body);
      console.log(urlq, requestOptions)
       fetch(urlq, requestOptions)
       .then((response)=> {
         return response.json();
       })
       .then((result)=> {
        // console.log("Token Update",result);
       })
       .catch((error)=> {
         console.log('Request Failed:' + error);
       });
     }


  logout=()=>{
    if(authToken!=null){
    this.deleteSessionID(this.state.usr_inf);
    fetch(url, requestOptions)
    .then(function(response) {
    	return response.json();
    })
    .then(function(result) {
      if(result.message==="logged out")
      {
        authToken=null;
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


  getUserPic=(auth,username)=>{
const url = "https://data.astigmatic44.hasura-app.io/v1/query";
const requestOptions = {
    "method": "POST",
    "headers": {"Content-Type": "application/json",
    "Authorization": "Bearer " + auth},};
let body = {
    "type": "select",
    "args": { "table": "User_Details",
        "columns": ["Pic_Id"],
        "where": { "User_Name": { "$eq": username}}}};
requestOptions.body = JSON.stringify(body);
fetch(url, requestOptions)
.then((response)=> {
	return response.json();
})
.then((result)=> {
  this.setState({imgsrc:"https://filestore.astigmatic44.hasura-app.io/v1/file/"+result[0].Pic_Id});
})
.catch((error)=> {
  console.log('Request Failed:' + error);
  this.setState({imgsrc:"images/defaultUser.png"});
});
  }

  render() {

    wmsg="Welcome "+this.state.usr_inf+" !!  ";
    return (
      <div>
      <Toolbar>
        <ToolbarGroup firstChild={false}>
        <Link to='/home'><RaisedButton label="HOME" primary={true} /></Link>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={wmsg} />
          <Avatar src={this.state.imgsrc} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={false}>
          <RaisedButton onClick={()=>this.logout()} label="LOGOUT" secondary={true} />
        </ToolbarGroup>
      </Toolbar>
      <Paper style={style} zDepth={5} rounded={false} >
      <img src="images/splash.png" alt="logo" width="996" height="200"/>
      </Paper>
      </div>
    );
  }
}
