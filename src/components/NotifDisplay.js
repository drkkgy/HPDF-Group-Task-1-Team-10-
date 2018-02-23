import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import * as firebase from 'firebase';

const style = {
 textAlign: 'left',
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
  };
  }

  componentWillMount()
  {  const msg = firebase.messaging();

    msg.onTokenRefresh(()=> {
      window.localStorage.setItem('sentToServer',false);
      console.log('Token refreshed.');
      msg.getToken()
      .then((refreshedToken) => {
        this.props.sendfcmtoken(refreshedToken);   //send token to server
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
       this.props.sendfcmtoken(token);   //send token to server
       })
     .catch((error) => {
      console.log('Token Updation:' + error);
     });
       })
       .catch((err)=> {
         this.setState({ndata: err.message});
      });

  msg.onMessage(payload => {
      this.getNotifTime();
      this.setState({ notif: payload.notification.body, peer: payload.notification.title, snack: true });
    });  }

getNotifTime = () => {  
      let d =  Date().slice(0,25);
      this.setState({ntime: d});
  }
//Todo : include file id/link in request sent to server to display each users profile image

render() {
  return(
  <div>
  <Paper style={style} zDepth={3} >
  <Card>
    <CardHeader
      title={this.state.peer}
      subtitle={this.state.ntime}
      avatar="/images/defaultUser.png"
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
