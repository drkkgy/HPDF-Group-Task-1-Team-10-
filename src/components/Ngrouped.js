import React, { Component }  from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Topnavbar from './Topnavbar';
import NotifDisplay from './NotifDisplay';
import ActionsBar from './ActionsBar';
import Ntable from './Ntable';
//import {post} from 'form-urlencoded-post';

const style = {
  height: 910,
  width: 1000,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block',
};

let url = ""; let username ="";
let requestOptions = {};
let body = {};
export default class Ngrouped extends Component {

    constructor(){
      super();
      this.state = {
        table:{
        limit:  "999",
        height:'355px',
        },
        Data : ['All Offline'],
        snack: false,
        snackmsg: "Message sending failed !"
      };

    }

  //  isTokenSentToServer =()=> {return window.localStorage.getItem('sentToServer');}

  //  setTokenSent =(sent)=> {window.localStorage.setItem('sentToServer', sent ? true : false);}

//      this.sendTokenToServer(currentToken);


componentDidMount() {

}

setUserInfo = (user) =>{username = user;}

sendTokenToServer  = (tokens) => {

  console.log(username,tokens);
  url = "https://api.astigmatic44.hasura-app.io/Users/Device_ID/Update";
  requestOptions = { "method": "POST",
      "headers": {"Content-Type": "application/x-www-form-urlencoded"}};
   body = {"User_Id": username,
      "Device_Id": tokens};

  requestOptions.body = JSON.stringify(body);
  console.log(requestOptions);
  fetch(url, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((result)=> {
    console.log(result);
  })
  .catch((error)=> {
    console.log('Request Failed:' + error);
  });

}


handlenotif=(user,title,message)=>  //get user to send notification
{
  this.sendNotif(username,user,title,message); //sending notification to end-user
}

sendNotif =(fromN,toN,titleN,messageN)=> {
  const url = "https://api.astigmatic44.hasura-app.io/auth/Send_Notification";
  requestOptions = {
      "method": "POST",
      "headers": {"Content-Type": "application/json"}};
  body = {
    "User_Name_Reciever": toN,
    "User_Name_Sender": fromN,
    "Title": titleN,
    "Notification_Message": messageN
  };
requestOptions.body = JSON.stringify(body);
console.log(url, requestOptions);
fetch(url, requestOptions)
.then((response)=> {
  return response.json();
})
.then((result)=> {
  this.setState({ snackmsg: result.message , snack: true });
})
.catch((error)=> {
  console.log('Request Failed:' + error);
  this.setState({ snackmsg: "Error! Failed to send" , snack: true });
});

}


checkLoggedIn=()=> {
  let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
    if(authToken===null){
      window.location.href = '/';
      alert ("Not logged in !! Please login first");}}

render(){
  this.checkLoggedIn();
return(
  <div>
    <Paper style={style} zDepth={5} rounded={true} >
    <Topnavbar getUserInfo={this.setUserInfo}/>
    <NotifDisplay/>
    <Snackbar
           open={this.state.snack}
           message={this.state.snackmsg}
           autoHideDuration={5000}
         />
    <ActionsBar passnotif={this.handlenotif}/>
    <Ntable data={this.state.table}/>

    </Paper>
  </div>
     );
   }
}
// sendfcmtoken={this.sendToken}
