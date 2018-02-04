
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';

const style = {
  height: 280,
  width: 500,
  margin: 10,
  display: 'inline-block',
};

var fetchAction =  require('node-fetch');
var authToken = null;

var url = "https://auth.dankness95.hasura-app.io/v1/login";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

    export default class Login extends Component {
      state = {
        uname:'',
        pwd:'',
      }

   change = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     });
   };

   onSubmit=(e) =>{
     e.preventDefault();
     this.setState({
       uname:'',
       pwd:'',
     });
     this.login();
   }
login =()=> {
  var body = {
      "provider": "username",
      "data": {
          "username": this.state.uname,
          "password": this.state.pwd,
      }
  };

  requestOptions.body = JSON.stringify(body);

  fetchAction(url, requestOptions)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {

    authToken = result.auth_token
    if(authToken!=null)
        { window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
          window.location.href = '/home';         }
    else
    {   window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
        alert("Invalid credentials--Try Again !!"); }

  })
  .catch(function(error) {
    console.log('Request Failed:' + error);
  });

}


      render() {
        return(
          <div>

          <Paper style={style} zDepth={3} >
          <img src="images/logo.png" alt="logo" height="190" width="500"/>
          <Card>
          <LinearProgress mode="indeterminate" />
          <CardTitle
             title="Welcome to Notify app " subtitle="Enter your credentials " />
          <form>
          <TextField
              name="uname"
              hintText="Username"
              floatingLabelText="Your Username"
              value={this.state.uname}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="pwd" type="password"
                 hintText="Password"
                 floatingLabelText="Your Password"
                 value={this.state.pwd}
                 onChange={e =>this.change(e)}
          /><br/>

          <RaisedButton onClick={(e)=>this.onSubmit(e)} label="LOGIN" secondary="true" />
          </form>
            <LinearProgress mode="indeterminate" />
          </Card>
          </Paper>
          </div>
        );
      }

  }

  /*
  <Paper style={logostyle} zDepth={5} rounded={false} >
  <img src="images/splash.png" alt="logo"/>
  </Paper>
  */
