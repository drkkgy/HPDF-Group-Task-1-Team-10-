import React, { Component }  from 'react';
import Paper from 'material-ui/Paper';
import Topnavbar from './Topnavbar';
import NotifDisplay from './NotifDisplay';
import ActionsBar from './ActionsBar';
import Ntable from './Ntable';
import * as firebase from 'firebase';

const style = {
  height: 800,
  width: 900,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block',
};

let url = "https://data.dankness95.hasura-app.io/v1/query";
let urlX = "https://auth.dankness95.hasura-app.io/v1/user/info";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
let requestOptionsX = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};

let requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
  }
let body = {}; let date = new Date();
export default class Ngrouped extends Component {

    constructor(){
      super();
      this.state = {
        table:{
        limit:  "5",
        height:'254px',
        },
        Data : ['All Offline'],
        username : "",
        hasura_id:"",
      };

    }

    isTokenSentToServer =()=> {return window.localStorage.getItem('sentToServer');}

    setTokenSent =(sent)=> {window.localStorage.setItem('sentToServer', sent ? true : false);}

    sendToken = (currentToken) => {
      if (this.isTokenSentToServer()) {
        this.sendTokenToServer(currentToken); //Send the current token to your server.
        this.setTokenSent(true);
      } else {
        console.log('Token already sent to server !!');
      }}

componentDidMount(){
  fetch(urlX, requestOptionsX)    //get user info
  .then((response) => {
    return response.json();
  })
  .then((result) => {
   this.setState({username : result.username, hasura_id: result.hasura_id});
  })
  .catch((error) => {
    console.log('User info retrieval:' + error);
  });
}


sendTokenToServer  = (tokens) => {

  body = {
    "type": "update",
    "args": {
        "table": "FCM_tokens",
        "where": {
            "hasura_id": {
                "$eq": this.state.hasura_id,
            }
        },
        "$set": {
            "fcm_tkn": tokens,
            "device": "Browser update"
        }
    }
};
  requestOptions.body = JSON.stringify(body);
  fetch(url, requestOptions)
  .then((response)=> {
    return response.json();
  })
  .then((result)=> {
    if(result.affected_rows < 1)
    this.insertTokenAtServer(tokens);
  })
  .catch((error)=> {
    console.log('Token Updation:' + error);
  });
}

insertTokenAtServer = (tokens) => {

  body = {
    "type": "insert",
    "args": {
        "table": "FCM_tokens",
        "objects": [
            {
                "fcm_tkn": tokens,
                "username": this.state.username,
                "hasura_id": this.state.hasura_id,
                "device": "Chrome/Firefox"
            }
        ]
    }
};
  requestOptions.body = JSON.stringify(body);
  fetch(url, requestOptions)                   
  .then((response)=> {
    return response.json();
  })
  .then((result)=> {
    console.log(result);
  })
  .catch((error)=> {
    console.log('Token Updation:' + error);
  });
}


handlenotif=(user,message)=>{

  body = {
    "type": "select",
    "args": {
        "table": "FCM_tokens",
        "columns": [
            "fcm_tkn"
        ],
        "where": {
            "username": {
                "$eq": user
            }
        }
    }
};
requestOptions.body = JSON.stringify(body);
fetch(url, requestOptions)                      //get fcm user token from server
.then((response)=> {
  return response.json();
})
.then((result)=> {
  this.sendDirectNotif(this.state.username,user,message,result[0].fcm_tkn); //sending notification to end-user
})
.catch((error)=> {
  console.log('Token Updation:' + error);
});

}
sendDirectNotif =(from,to,body,fcm_tkn)=> {
  const key = "AIzaSyA1ub-EQV6yv_klcPQmzjGSYMYG-SGAsYY";
  let notification = {
    'title': from,
    'body': body,
    'icon': '/images/notify.png',
    'click_action': 'https://ui.beneficence95.hasura-app.io/home'
  };

  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      'Authorization': 'key=' + key,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'notification': notification,
      'to': fcm_tkn,
    })
  }).then((response) => {
    console.log("SUCCESSFUL",response.ok);})
    .catch((error)=> {console.log(error)});

this.updateMessages(from,to,body);
  }

updateMessages = (from,to,message) =>{
  date = new Date();
  body = {
    "type": "insert",
    "args": {
        "table": "Messages",
        "objects": [
            {
                "From": from,
                "To": to,
                "Message": message,
                "time" : date,
            }
        ]
    }
};
requestOptions.body = JSON.stringify(body);
fetch(url, requestOptions)                      //get fcm user token from server
.then((response)=> {
  return response.json();
})
.then((result)=> {
  console.log(result);
})
.catch((error)=> {
  console.log('Token Updation:' + error);
});

}

render(){

return(
  <div>
    <Paper style={style} zDepth={5} rounded={true} >
    <Topnavbar /><br/>
    <NotifDisplay sendfcmtoken={this.sendToken}/><br/>
    <ActionsBar passnotif={this.handlenotif}/><br/>
    <Ntable data={this.state.table}/><br/>
    </Paper>
  </div>
     );
   }
}
