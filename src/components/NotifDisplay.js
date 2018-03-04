import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import * as firebase from 'firebase';

const style = {
 textAlign: 'left',
};

let url = "https://auth.astigmatic44.hasura-app.io/v1/user/info";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
let headers = { "Authorization" : "Bearer " + authToken }
let requestOptions = {
    "method": "GET",
    "headers": headers,
};

export default class NotifDisplay extends React.Component {
  constructor(props)
  {
  super(props);
  this.state={
  ndata:"* Notification status appears here *",
  notif:"",
  peer:"",
  snack: false,
  ntime:"",
  username:"",
  usrimg : "/images/defaultUser.png"
  };
  }

  getUserInfo() {
    fetch(url,requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => { this.setState({username: result.username});
     })
    .catch((error) => {
    console.log('User info retrieval:' + error);
  });}


sendToken = (currentToken) => {
const urq = "https://data.astigmatic44.hasura-app.io/v1/query";
let requestOptionsQ = {  "method": "POST",
    "headers": {"Content-Type": "application/json",
                "Authorization": "Bearer " + authToken}};
      let body = {
          "type": "update",
          "args": {  "table": "User_Details",
        "where": { "User_Name": { "$eq": this.state.username }},
        "$set": { "Device_Id": currentToken }}};

      requestOptionsQ.body = JSON.stringify(body);
      fetch(urq, requestOptionsQ)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
      //  console.log(result);
      })
      .catch(function(error) {
        console.log('Request Failed:' + error);
      });
    }

  componentWillMount()
  {  this.getUserInfo();
    const msg = firebase.messaging();
    msg.onTokenRefresh(()=> {
      msg.getToken()
      .then((refreshedToken) => {
        this.sendToken(refreshedToken);   //send token to server
      })
      .catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });

     msg.requestPermission()
     .then(()=> {
       this.setState({ndata: "Push Notifications ENABLED !!"});
      msg.getToken()   //get user device token
       .then((token) => {
       this.sendToken(token);   //send token to server
       })
     .catch((error) => {
      console.log('Token Updation:' + error);
     });
       })
       .catch((err)=> {
         this.setState({ndata: err.message});
      });

  msg.onMessage(payload => {
      this.getNotifTime(); if(payload.notification)
      this.setState({
         notif: payload.notification.body,
         peer: payload.notification.title,
         usrimg: payload.notification.usrimg ? payload.notification.usrimg : "/images/defaultUser.png",
         snack: true });
    });  }

getNotifTime = () => {
      let d =  Date().slice(0,25);
      this.setState({ntime: d});
  }

render() {
  return(
  <div>
  <Paper style={style} zDepth={3} >
  <Card>
    <CardHeader
      title={this.state.peer}
      subtitle={this.state.ntime}
      avatar={this.state.usrimg}
    />
    <CardTitle title={this.state.notif} subtitle={this.state.ndata}/>
  </Card>
  </Paper>
  <Snackbar
         open={this.state.snack}
         message="New Notification for you !!"
         autoHideDuration={5000}
       />
  </div>
);

}

}
